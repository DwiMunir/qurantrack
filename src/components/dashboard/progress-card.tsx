import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  icon: React.ReactNode;
  title: string;
  percentage: number;
  subtitle: string;
  color: 'green' | 'blue' | 'orange';
}

export function ProgressCard({ icon, title, percentage, subtitle, color }: ProgressCardProps) {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col h-full dark:bg-gray-800 dark:text-gray-500">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-gray-700 font-medium dark:text-gray-500">{title}</h3>
      </div>
      <div className="flex items-end justify-between mt-1">
        <div className="text-3xl font-bold">{percentage}%</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>
      </div>
      <div className="mt-3 w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={cn("h-2.5 rounded-full", colorClasses[color])} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
