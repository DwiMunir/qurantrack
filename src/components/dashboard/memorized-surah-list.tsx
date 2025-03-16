import React from 'react';

interface SurahItem {
  name: string;
  ayatCount: number;
  isMemorized: boolean;
}

interface MemorizedSurahListProps {
  surahs: SurahItem[];
  totalMemorized: number;
  totalSurahs: number;
}

export function MemorizedSurahList({ surahs, totalMemorized, totalSurahs }: MemorizedSurahListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full dark:bg-gray-800 dark:text-gray-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Hafalan</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">{totalMemorized} dari {totalSurahs}</div>
      </div>
      <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">Progres hafalan surah Al-Quran</p>
      
      <div className="space-y-4">
        {surahs.map((surah, index) => (
          <div key={index} className="border-b pb-3 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{surah.name}</span>
                  <span className="text-sm text-gray-500">{surah.ayatCount} ayat</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
