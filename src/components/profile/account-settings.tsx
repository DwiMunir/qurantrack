'use client';

import { Button } from '@/components/ui/button';

export function AccountSettings() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Pengaturan Akun</h3>
      
      {/* Danger Zone */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hapus Akun</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tindakan ini tidak dapat dibatalkan</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-600 hover:bg-red-50 border-red-200 dark:text-red-400 dark:hover:bg-red-900/10 dark:border-red-800"
          >
            Hapus Akun
          </Button>
        </div>
      </div>
    </div>
  );
}
