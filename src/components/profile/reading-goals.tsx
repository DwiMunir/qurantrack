'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReadingGoalsProps {
  dailyPages: number;
  weeklyPages: number;
  memorizationTarget: number;
}

export function ReadingGoals({ dailyPages, weeklyPages, memorizationTarget }: ReadingGoalsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [goals, setGoals] = useState({
    dailyPages,
    weeklyPages,
    memorizationTarget
  });
  
  const handleSave = () => {
    // In a real app, this would save to a database
    setIsEditing(false);
    // Show success message or notification
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Target Bacaan</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Batal' : 'Edit'}
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Daily Pages Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Harian</p>
            {isEditing ? (
              <div className="flex items-center">
                <input 
                  type="number" 
                  className="w-16 h-8 rounded-md border border-gray-300 dark:border-gray-600 px-2 text-sm dark:bg-gray-700 dark:text-gray-200" 
                  value={goals.dailyPages}
                  onChange={(e) => setGoals({...goals, dailyPages: parseInt(e.target.value) || 0})}
                  min="1"
                  max="30"
                />
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">halaman</span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{goals.dailyPages} halaman</p>
            )}
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full dark:bg-gray-700">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{ width: `${Math.min(100, (goals.dailyPages / 10) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rekomendasi: 5 halaman</p>
        </div>
        
        {/* Weekly Pages Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Mingguan</p>
            {isEditing ? (
              <div className="flex items-center">
                <input 
                  type="number" 
                  className="w-16 h-8 rounded-md border border-gray-300 dark:border-gray-600 px-2 text-sm dark:bg-gray-700 dark:text-gray-200" 
                  value={goals.weeklyPages}
                  onChange={(e) => setGoals({...goals, weeklyPages: parseInt(e.target.value) || 0})}
                  min="1"
                  max="100"
                />
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">halaman</span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{goals.weeklyPages} halaman</p>
            )}
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full dark:bg-gray-700">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ width: `${Math.min(100, (goals.weeklyPages / 50) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rekomendasi: 30 halaman</p>
        </div>
        
        {/* Memorization Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Hafalan</p>
            {isEditing ? (
              <div className="flex items-center">
                <input 
                  type="number" 
                  className="w-16 h-8 rounded-md border border-gray-300 dark:border-gray-600 px-2 text-sm dark:bg-gray-700 dark:text-gray-200" 
                  value={goals.memorizationTarget}
                  onChange={(e) => setGoals({...goals, memorizationTarget: parseInt(e.target.value) || 0})}
                  min="1"
                  max="30"
                />
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">juz</span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{goals.memorizationTarget} juz</p>
            )}
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full dark:bg-gray-700">
            <div 
              className="h-2 bg-orange-500 rounded-full" 
              style={{ width: `${Math.min(100, (goals.memorizationTarget / 30) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total: 30 juz</p>
        </div>
      </div>
      
      {isEditing && (
        <div className="mt-6">
          <Button 
            className="w-full" 
            onClick={handleSave}
          >
            Simpan Perubahan
          </Button>
        </div>
      )}
    </div>
  );
}
