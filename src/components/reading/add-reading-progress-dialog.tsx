"use client";

import { useState, useEffect } from 'react';
import { useAllSurahs } from '@/hooks/use-quran-queries';
import { cn } from '@/lib/utils';
import { Check, X, Calendar, ChevronDown, BookOpen, BookMarked } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddReadingProgressDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddReadingProgressDialog({ isOpen, onClose }: AddReadingProgressDialogProps) {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [lastAyah, setLastAyah] = useState<number>(1);
  const [maxAyahs, setMaxAyahs] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [trackingMode, setTrackingMode] = useState<'reading' | 'memorization'>('reading');
  
  // Fetch all surahs with React Query
  const { data: surahs, isLoading } = useAllSurahs();
  
  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSurah(null);
      setLastAyah(1);
      setSearchTerm('');
      setSuccessMessage(false);
      setTrackingMode('reading'); // Reset to reading mode by default
    }
  }, [isOpen]);
  
  // Update max ayahs when surah changes
  useEffect(() => {
    if (selectedSurah && surahs) {
      const surah = surahs.find(s => s.number === selectedSurah);
      if (surah) {
        setMaxAyahs(surah.numberOfAyahs);
        setLastAyah(1); // Reset to first ayah when changing surah
      }
    }
  }, [selectedSurah, surahs]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.surah-dropdown') && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSurah) {
      return;
    }
    
    // In a real app, this would save the reading or memorization progress to a database
    console.log(`${trackingMode === 'reading' ? 'Reading' : 'Memorization'} progress saved:`, {
      type: trackingMode,
      date: new Date().toISOString(),
      surahNumber: selectedSurah,
      lastAyah: lastAyah
    });
    
    // Show success message with appropriate message based on tracking mode
    setSuccessMessage(true);
    
    // Close the dialog after short delay
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // Filter surahs based on search term
  const filteredSurahs = surahs?.filter(surah => 
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    surah.number.toString().includes(searchTerm)
  );

  // Get selected surah details
  const selectedSurahDetails = surahs?.find(s => s.number === selectedSurah);
  
  if (!isOpen) return null;

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={modalVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {successMessage ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Progress Disimpan!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {trackingMode === 'reading' ? (
                <>{selectedSurahDetails?.englishName} sampai ayat {lastAyah} telah dicatat</>
              ) : (
                <>{selectedSurahDetails?.englishName} sampai ayat {lastAyah} telah dihafal</>
              )}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-5 relative dark:from-gray-800 dark:to-gray-900">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center mb-1">
                {trackingMode === 'reading' ? (
                  <BookOpen className="w-5 h-5 mr-2 opacity-90" />
                ) : (
                  <BookMarked className="w-5 h-5 mr-2 opacity-90" />
                )}
                <h3 className="text-lg font-medium">
                  {trackingMode === 'reading' ? 'Tambah Progress Bacaan' : 'Tambah Progress Hafalan'}
                </h3>
              </div>
              <p className="text-blue-100 text-sm">Simpan pencapaian Al-Quran Anda hari ini</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Toggle between reading and memorization */}
              <div className="mb-5">
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-full">
                  <button
                    type="button"
                    onClick={() => setTrackingMode('reading')}
                    className={cn(
                      "flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all",
                      trackingMode === 'reading' 
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Bacaan
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackingMode('memorization')}
                    className={cn(
                      "flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all",
                      trackingMode === 'memorization' 
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <BookMarked className="w-4 h-4 mr-2" />
                    Hafalan
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {/* Surah Selection - Custom Dropdown */}
                  <div className="mb-5 surah-dropdown relative">
                    <label htmlFor="surah" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Pilih Surah
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={cn(
                          "w-full px-4 py-2.5 border rounded-lg shadow-sm text-left flex items-center justify-between",
                          selectedSurah ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800" : 
                          "border-gray-300 dark:border-gray-600 dark:bg-gray-700",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        )}
                      >
                        {selectedSurah ? (
                          <span className="flex items-center">
                            <span className="w-7 h-7 flex items-center justify-center bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium mr-2">
                              {selectedSurah}
                            </span>
                            <span className="dark:text-white">{selectedSurahDetails?.englishName}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              ({selectedSurahDetails?.numberOfAyahs} ayat)
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">-- Pilih Surah --</span>
                        )}
                        <ChevronDown className={cn(
                          "w-5 h-5 text-gray-400 transition-transform",
                          dropdownOpen && "transform rotate-180"
                        )} />
                      </button>
                      
                      {dropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-auto">
                          <div className="sticky top-0 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
                            <input
                              type="text"
                              placeholder="Cari surah..."
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          
                          <div className="py-1">
                            {filteredSurahs?.length === 0 ? (
                              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                                Tidak ditemukan
                              </div>
                            ) : (
                              filteredSurahs?.map((surah) => (
                                <button
                                  key={surah.number}
                                  type="button"
                                  className={cn(
                                    "w-full px-4 py-2.5 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-700",
                                    selectedSurah === surah.number && "bg-blue-50 dark:bg-blue-900/20"
                                  )}
                                  onClick={() => {
                                    setSelectedSurah(surah.number);
                                    setDropdownOpen(false);
                                  }}
                                >
                                  <span className="w-7 h-7 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium mr-2">
                                    {surah.number}
                                  </span>
                                  <span className="flex-1 dark:text-white">{surah.englishName}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {surah.numberOfAyahs} ayat
                                  </span>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Last Ayah Read */}
                  <div className="mb-6">
                    <label htmlFor="lastAyah" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Ayat Terakhir Dibaca
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-300 text-3xl font-medium">
                          {lastAyah}
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">dari {maxAyahs || '-'} ayat</div>
                          <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-300 ease-out",
                                trackingMode === 'reading' ? "bg-blue-500" : "bg-green-500"
                              )}
                              style={{ width: `${maxAyahs ? (lastAyah / maxAyahs) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <input
                            type="range"
                            id="lastAyah"
                            min="1"
                            max={maxAyahs || 1}
                            value={lastAyah}
                            onChange={(e) => setLastAyah(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            disabled={!selectedSurah}
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            min="1"
                            max={maxAyahs || 1}
                            value={lastAyah}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value >= 1 && value <= (maxAyahs || 1)) {
                                setLastAyah(value);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
                            disabled={!selectedSurah}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Current Date (Read-only) */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Tanggal
                    </label>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
                      {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </>
              )}
              
              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={cn(
                    "px-4 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
                    trackingMode === 'reading' ? "focus:ring-blue-500" : "focus:ring-green-500",
                    selectedSurah 
                      ? trackingMode === 'reading'
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700"
                        : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 active:from-green-800 active:to-green-700"
                      : "bg-gray-400 dark:bg-gray-500/50 opacity-70 cursor-not-allowed"
                  )}
                  disabled={!selectedSurah}
                >
                  {trackingMode === 'reading' ? 'Simpan Progress Bacaan' : 'Simpan Progress Hafalan'}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}