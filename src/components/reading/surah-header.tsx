import React from 'react';
import Link from 'next/link';
import { Surah } from './surah-list';

interface SurahHeaderProps {
  surah: Surah;
  onMarkAsRead?: () => void;
  onDownloadAudio?: () => void;
}

export function SurahHeader({ surah, onMarkAsRead, onDownloadAudio }: SurahHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 dark:bg-gray-800 dark:text-gray-500">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 dark:from-gray-800 dark:to-gray-900 dark:text-gray-500">
        <div className="flex items-center justify-between">
          <Link 
            href="/reading" 
            className="flex items-center text-white hover:text-blue-100 transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Kembali</span>
          </Link>
          
          <div className="flex gap-2">
            {onMarkAsRead && (
              <button 
                onClick={onMarkAsRead}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Tandai Selesai</span>
              </button>
            )}
            
            {onDownloadAudio && (
              <button 
                onClick={onDownloadAudio}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Audio</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold mb-1">{surah.name}</h1>
          <p className="text-blue-100 mb-2 dark:text-gray-500">{surah.englishName} - {surah.englishNameTranslation}</p>
          <div className="flex justify-center items-center gap-3 text-sm text-blue-100 dark:text-gray-500">
            <span>{surah.numberOfAyahs} Ayat</span>
            <span className="w-1 h-1 rounded-full bg-blue-100"></span>
            <span>{surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</span>
          </div>
        </div>
      </div>
      
      {/* Bismillah */}
      <div className="p-6 text-center border-b dark:border-gray-700">
        <p className="text-2xl font-arabic text-gray-800 dark:text-gray-500">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
          Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
        </p>
      </div>
    </div>
  );
}
