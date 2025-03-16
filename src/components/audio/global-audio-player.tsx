"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudio } from '@/context/audio-context';
import { cn } from '@/lib/utils';

export function GlobalAudioPlayer() {
  const {
    playingAyahNumber,
    playingSurah,
    isPlaying,
    isAutoPlayEnabled,
    handleTogglePlayPause,
    handleStop,
    handleToggleAutoPlay
  } = useAudio();
  
  const [isMinimized, setIsMinimized] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // For handling manual drag functionality
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Handle mouse/touch down event to start dragging
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  }, [position]);
  
  // Handle mouse/touch move event for dragging
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    // Apply boundaries to keep the element within the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementWidth = dragRef.current?.offsetWidth || 50;
    const elementHeight = dragRef.current?.offsetHeight || 50;
    
    const boundedX = Math.max(0, Math.min(newX, viewportWidth - elementWidth));
    const boundedY = Math.max(0, Math.min(newY, viewportHeight - elementHeight));
    
    setPosition({ x: boundedX, y: boundedY });
  }, [isDragging, dragStart, dragRef]);
  
  // Handle mouse/touch up event to stop dragging
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Add and remove event listeners for drag
  useEffect(() => {
    if (isMinimized) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isMinimized, isDragging, dragStart, handleDragMove, handleDragEnd]);
  
  // Reset position when minimized state changes
  useEffect(() => {
    if (!isMinimized) {
      setPosition({ x: 0, y: 0 });
    } else {
      // Set initial position at bottom right when minimized
      setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
    }
  }, [isMinimized]);

  if (!playingAyahNumber || !playingSurah) return null;

  // Render minimized version
  if (isMinimized) {
    return (
      <div 
        ref={dragRef}
        className="fixed z-50 cursor-move" 
        style={{ 
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          touchAction: 'none'
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={() => setIsMinimized(false)}
      >
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md p-2 rounded-full flex items-center justify-center relative group">
            <div className="absolute -top-10 right-0 bg-white dark:bg-gray-800 shadow-md rounded-md py-1 px-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {playingSurah.name} - Ayat {playingAyahNumber}
            </div>
            
            {/* Expand button */}
            {/* <button
              onClick={() => setIsMinimized(false)}
              className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
              aria-label="Expand player"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
              </svg>
            </button> */}
            
            {/* Audio icon with playing indicator */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </div>
              
              {/* Pulsing animation for playing state */}
              {isPlaying && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </div>
          </div>
      </div>
    );
  }
  
  // Render full player
  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 mx-auto max-w-md px-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative">
        {/* Minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute -top-3 -right-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full p-1 w-6 h-6 flex items-center justify-center"
          aria-label="Minimize player"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Handle for dragging - visual indicator only */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Sedang diputar</div>
            <div className="font-medium">
              {playingSurah.name} - Ayat {playingAyahNumber}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          <button 
            onClick={handleToggleAutoPlay}
            className={cn(
              "p-2 rounded-full transition-colors flex items-center gap-1.5",
              isAutoPlayEnabled 
                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30" 
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            )}
            aria-label={isAutoPlayEnabled ? "Disable auto-play" : "Enable auto-play"}
            title={isAutoPlayEnabled ? "Auto-play enabled" : "Auto-play disabled"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium hidden sm:inline">
              {isAutoPlayEnabled ? "Auto" : "Manual"}
            </span>
          </button>
          
          <button 
            onClick={handleTogglePlayPause}
            className={cn(
              "p-2 rounded-full transition-colors flex items-center gap-1.5",
              "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50"
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium hidden sm:inline">Play</span>
              </>
            )}
          </button>
          
          <button 
            onClick={handleStop}
            className={cn(
              "p-2 rounded-full transition-colors flex items-center gap-1.5",
              "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            )}
            aria-label="Stop"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium hidden sm:inline">Stop</span>
          </button>
        </div>
      </div>
    </div>
  );
}
