import React from 'react';
import { Button } from '@/components/ui/button';

interface DayProgress {
  day: string;
  pages: number;
}

interface ReadingProgressProps {
  weeklyData: DayProgress[];
  weekTotal: number;
  dailyAverage: number;
}

export function ReadingProgress({ weeklyData, weekTotal, dailyAverage }: ReadingProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full dark:bg-gray-800 dark:text-gray-500">
      <h3 className="text-lg font-semibold mb-2">Progres Bacaan</h3>
      <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">Pantau progres bacaan Al-Quran Anda</p>
      
      <div className="flex gap-2 mb-6">
        <Button variant="default" size="sm" className="rounded-full bg-blue-500 hover:bg-blue-600">Mingguan</Button>
        <Button variant="ghost" size="sm" className="rounded-full text-gray-500">Bulanan</Button>
        <Button variant="ghost" size="sm" className="rounded-full text-gray-500">Tahunan</Button>
      </div>
      
      <div className="h-40 flex items-end justify-between gap-2 mb-2 px-2">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1 w-full">
            <div 
              className="w-full bg-blue-100 rounded-t-sm dark:bg-gray-700" 
              style={{ height: `${(day.pages / 5) * 100}px` }}
            ></div>
            <span className="text-xs text-gray-500">{day.day}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Minggu Ini</div>
            <div className="font-semibold">{weekTotal} halaman</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Rata-rata Harian</div>
            <div className="font-semibold">{dailyAverage} halaman</div>
          </div>
        </div>
      </div>
    </div>
  );
}
