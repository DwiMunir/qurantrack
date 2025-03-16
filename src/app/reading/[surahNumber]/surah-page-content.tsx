"use client";

import { useState } from 'react';
import { SurahHeader } from '@/components/reading/surah-header';
import { AyahView } from '@/components/reading/ayah-view';
import { useSurahByNumber, useAyahsForSurah } from '@/hooks/use-quran-queries';
import { useAudio } from '@/context/audio-context';

interface SurahPageContentProps {
  surahNumber: number;
}

export function SurahPageContent({ surahNumber }: SurahPageContentProps) {
  // State for bookmarked ayahs
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<number[]>([1, 5, 10]); // Mock data
  
  // Use the global audio context
  const { 
    playingAyahNumber, 
    isPlaying, 
    handlePlay
  } = useAudio();
  
  // Fetch surah data with React Query
  const { 
    data: surah, 
    isLoading: isSurahLoading, 
    error: surahError 
  } = useSurahByNumber(surahNumber);
  
  // Fetch ayahs for this surah with React Query
  const { 
    data: ayahs, 
    isLoading: isAyahsLoading, 
    error: ayahsError 
  } = useAyahsForSurah(surahNumber);
  
  // Loading state
  if (isSurahLoading || isAyahsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Error state
  if (surahError || ayahsError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>Gagal memuat data surah. Silakan coba lagi nanti.</p>
        <p className="text-sm mt-1">{((surahError || ayahsError) as Error).message}</p>
      </div>
    );
  }
  
  // If no data
  if (!surah || !ayahs) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <p>Data surah tidak ditemukan.</p>
      </div>
    );
  }
  
  // Handle bookmark toggle
  const handleBookmark = (ayahNumber: number) => {
    setBookmarkedAyahs(prev => {
      if (prev.includes(ayahNumber)) {
        return prev.filter(num => num !== ayahNumber);
      } else {
        return [...prev, ayahNumber];
      }
    });
  };
  
  // Handle ayah play button click
  const handleAyahPlay = (audioUrl: string, ayahNumber: number) => {
    if (!surah || !ayahs) return;
    handlePlay(audioUrl, ayahNumber, surah, ayahs);
  };
  
  // Handle mark as read
  const handleMarkAsRead = () => {
    // In a real app, this would mark the surah as read in a database
    console.log('Marked surah as read:', surah.number);
  };
  
  // Handle download audio
  const handleDownloadAudio = () => {
    // In a real app, this would download the audio files
    console.log('Downloading audio for surah:', surah.number);
  };
  

  
  return (
    <>
      <SurahHeader 
        surah={surah} 
        onMarkAsRead={handleMarkAsRead} 
        onDownloadAudio={handleDownloadAudio} 
      />
      <div className="mb-6">
        {ayahs.map((ayah) => (
          <AyahView 
            key={ayah.number}
            ayah={ayah}
            isBookmarked={bookmarkedAyahs.includes(ayah.numberInSurah)}
            onBookmark={handleBookmark}
            onPlay={(audioUrl) => handleAyahPlay(audioUrl, ayah.numberInSurah)}
            isPlaying={playingAyahNumber === ayah.numberInSurah && isPlaying}
          />
        ))}
      </div>
    </>
  );
}
