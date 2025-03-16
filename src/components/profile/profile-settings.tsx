'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProfileSettingsProps {
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
    translation: boolean;
    transliteration: boolean;
  };
}

export function ProfileSettings({ preferences }: ProfileSettingsProps) {
  const [settings, setSettings] = useState(preferences);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    // In a real app, this would save to a database
    setIsEditing(false);
    // Show success message or notification
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Pengaturan Aplikasi</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Batal' : 'Edit'}
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Theme Setting */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pilih tema tampilan aplikasi</p>
          </div>
          {isEditing ? (
            <select 
              className="h-10 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-200" 
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
            >
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
              <option value="system">Sistem</option>
            </select>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {settings.theme === 'light' ? 'Terang' : 
               settings.theme === 'dark' ? 'Gelap' : 'Sistem'}
            </p>
          )}
        </div>
        
        {/* Notifications Setting */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifikasi</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Aktifkan pengingat bacaan harian</p>
          </div>
          {isEditing ? (
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.notifications}
                onChange={() => setSettings({...settings, notifications: !settings.notifications})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {settings.notifications ? 'Aktif' : 'Nonaktif'}
            </p>
          )}
        </div>
        
        {/* Language Setting */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Bahasa</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pilih bahasa antarmuka aplikasi</p>
          </div>
          {isEditing ? (
            <select 
              className="h-10 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-200" 
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {settings.language === 'id' ? 'Indonesia' : 
               settings.language === 'en' ? 'English' : 'العربية'}
            </p>
          )}
        </div>
        
        {/* Translation Setting */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Terjemahan</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tampilkan terjemahan ayat</p>
          </div>
          {isEditing ? (
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.translation}
                onChange={() => setSettings({...settings, translation: !settings.translation})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {settings.translation ? 'Aktif' : 'Nonaktif'}
            </p>
          )}
        </div>
        
        {/* Transliteration Setting */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Transliterasi</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tampilkan transliterasi latin</p>
          </div>
          {isEditing ? (
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.transliteration}
                onChange={() => setSettings({...settings, transliteration: !settings.transliteration})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {settings.transliteration ? 'Aktif' : 'Nonaktif'}
            </p>
          )}
        </div>
      </div>
      
      {isEditing && (
        <div className="mt-6">
          <Button 
            className="w-full" 
            onClick={handleSave}
          >
            Simpan Pengaturan
          </Button>
        </div>
      )}
    </div>
  );
}
