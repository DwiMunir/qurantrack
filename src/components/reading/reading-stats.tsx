import React from 'react';

interface ReadingStatsProps {
  totalRead: number;
  totalSurahs: number;
  lastReadDate: string;
  streak: number;
  totalPages: number;
}

export function ReadingStats({ totalRead, totalSurahs, lastReadDate, streak, totalPages }: ReadingStatsProps) {
  const progressPercentage = Math.round((totalRead / totalSurahs) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 dark:bg-gray-800 dark:text-gray-500">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-500">Statistik Bacaan</h2>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progres Keseluruhan</span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-400" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 dark:bg-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalRead}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Surah Dibaca</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 dark:bg-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{streak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Hari Berturut-turut</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 dark:bg-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalPages}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Halaman Dibaca</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4 dark:bg-gray-700">
          <div className="text-sm font-medium text-orange-600 dark:text-orange-400">Terakhir Dibaca</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{lastReadDate}</div>
        </div>
      </div>
    </div>
  );
}
