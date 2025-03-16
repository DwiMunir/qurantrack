'use client';

import { cn } from '@/lib/utils';

interface ReadingStreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

export function ReadingStreakCard({ currentStreak, longestStreak }: ReadingStreakCardProps) {
  // Calculate percentage for the progress circle
  const percentage = Math.min(100, Math.round((currentStreak / longestStreak) * 100)) || 0;
  
  // Sample data for streak calendar (in a real app, this would come from a database)
  const streakData = [
    { day: 'Sen', completed: true },
    { day: 'Sel', completed: true },
    { day: 'Rab', completed: true },
    { day: 'Kam', completed: true },
    { day: 'Jum', completed: true },
    { day: 'Sab', completed: false },
    { day: 'Min', completed: false },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Streak Bacaan</h3>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Progress Circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            {/* Progress Circle */}
            <circle
              className="text-blue-600 dark:text-blue-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">{currentStreak}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">hari</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Streak Saat Ini</p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{currentStreak}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Streak Terpanjang</p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{longestStreak}</p>
        </div>
      </div>
      
      {/* Weekly Streak Calendar */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minggu Ini</p>
        <div className="flex justify-between">
          {streakData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                  day.completed 
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                )}
              >
                {day.completed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : null}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
