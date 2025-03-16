"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SurahData {
  name: string;
  totalAyat: number;
  readCount: number;
  lastRead: string;
}

interface SurahCompletionStatsProps {
  surahData: SurahData[];
}

export function SurahCompletionStats({ surahData }: SurahCompletionStatsProps) {
  const [sortBy, setSortBy] = useState<'name' | 'readCount' | 'lastRead'>('readCount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: 'name' | 'readCount' | 'lastRead') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...surahData].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'readCount') {
      return sortOrder === 'asc' 
        ? a.readCount - b.readCount 
        : b.readCount - a.readCount;
    } else {
      // For lastRead, we'll need special handling since it's a string description
      // This is simplified - in a real app you'd use actual dates
      if (a.lastRead === 'Belum dibaca') return sortOrder === 'asc' ? -1 : 1;
      if (b.lastRead === 'Belum dibaca') return sortOrder === 'asc' ? 1 : -1;
      return sortOrder === 'asc' 
        ? a.lastRead.localeCompare(b.lastRead) 
        : b.lastRead.localeCompare(a.lastRead);
    }
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Statistik Surah</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Rekam jejak bacaan per surah
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
              <th 
                className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Nama Surah
                  {sortBy === 'name' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Jumlah Ayat
              </th>
              <th 
                className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('readCount')}
              >
                <div className="flex items-center">
                  Jumlah Dibaca
                  {sortBy === 'readCount' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('lastRead')}
              >
                <div className="flex items-center">
                  Terakhir Dibaca
                  {sortBy === 'lastRead' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((surah, index) => (
              <tr 
                key={index} 
                className={cn(
                  "border-t border-gray-100 dark:border-gray-700",
                  index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'
                )}
              >
                <td className="px-5 py-4 text-sm text-gray-800 dark:text-gray-200">
                  {surah.name}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {surah.totalAyat}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 dark:bg-blue-600 rounded-full" 
                        style={{ width: `${Math.min(100, (surah.readCount / 5) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{surah.readCount}x</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {surah.lastRead}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        Menampilkan {surahData.length} dari 114 surah
      </div>
    </div>
  );
}
