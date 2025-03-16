import React from 'react';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  audio?: string;
}

interface AyahViewProps {
  ayah: Ayah;
  isBookmarked?: boolean;
  isPlaying?: boolean;
  onBookmark?: (ayahNumber: number) => void;
  onPlay?: (audioUrl: string) => void;
}

export function AyahView({ ayah, isBookmarked = false, isPlaying = false, onBookmark, onPlay }: AyahViewProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-blue-500 dark:bg-gray-800 dark:text-gray-500">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm dark:bg-gray-500 dark:text-gray-100">
            {ayah.numberInSurah}
          </div>
          <div className="text-xs text-gray-500">
            <span>Juz {ayah.juz}</span> • <span>Halaman {ayah.page}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {ayah.audio && onPlay && (
            <button 
              onClick={() => onPlay(ayah.audio || '')}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isPlaying ? 'bg-blue-100' : ''}`}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
          
          {onBookmark && (
            <button 
              onClick={() => onBookmark(ayah.number)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="text-right text-xl leading-loose font-arabic mb-2 dark:text-gray-500">
        {ayah.text}
      </div>
      
      {/* Here you would add translation if available */}
      <div className="text-sm text-gray-700 leading-relaxed">
        {/* Translation would go here */}
      </div>
    </div>
  );
}
