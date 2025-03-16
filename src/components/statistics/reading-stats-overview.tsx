'use client';

import { cn } from '@/lib/utils';

interface ReadingStatsProps {
  stats: {
    totalPages: number;
    pagesThisMonth: number;
    pagesLastMonth: number;
    averageDailyPages: number;
    currentStreak: number;
    longestStreak: number;
  };
}

export function ReadingStatsOverview({ stats }: ReadingStatsProps) {
  const monthlyChange = stats.pagesThisMonth - stats.pagesLastMonth;
  const monthlyChangePercent = stats.pagesLastMonth > 0 
    ? Math.round((monthlyChange / stats.pagesLastMonth) * 100) 
    : 0;
  
  const isPositiveChange = monthlyChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Total Pages Read */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Halaman Dibaca</h3>
          <span className="text-lg">📚</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-200">{stats.totalPages}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dari 604 halaman Al-Quran</p>
      </div>

      {/* This Month's Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bulan Ini</h3>
          <span className="text-lg">📅</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-200">{stats.pagesThisMonth}</p>
        <div className="flex items-center mt-1">
          <span 
            className={cn(
              "text-sm font-medium flex items-center",
              isPositiveChange ? "text-green-600" : "text-red-600"
            )}
          >
            {isPositiveChange ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
              </svg>
            )}
            {Math.abs(monthlyChangePercent)}% dari bulan lalu
          </span>
        </div>
      </div>

      {/* Average Daily Pages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rata-rata Harian</h3>
          <span className="text-lg">📊</span>
        </div>
        <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-200">{stats.averageDailyPages}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Halaman per hari</p>
      </div>
    </div>
  );
}
