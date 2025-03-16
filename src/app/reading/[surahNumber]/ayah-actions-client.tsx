"use client";

import { useState } from 'react';
import { AyahView } from '@/components/reading/ayah-view';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  audio?: string;
}

interface AyahActionsClientProps {
  ayah: Ayah;
  isBookmarked: boolean;
}

export function AyahActionsClient({ ayah, isBookmarked: initialBookmarked }: AyahActionsClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  const handleBookmark = (ayahNumber: number) => {
    // Toggle bookmark state
    setIsBookmarked(!isBookmarked);
    
    // In a real app, this would save the bookmark to a database
    console.log(`${isBookmarked ? 'Unbookmarked' : 'Bookmarked'} ayah ${ayahNumber}`);
  };
  
  const handlePlay = (audioUrl: string) => {
    if (isPlaying && audioElement) {
      audioElement.pause();
      setIsPlaying(false);
      return;
    }
    
    // Create a new audio element if one doesn't exist
    const audio = audioElement || new Audio(audioUrl);
    
    // Set up event listeners
    audio.onended = () => {
      setIsPlaying(false);
    };
    
    audio.onpause = () => {
      setIsPlaying(false);
    };
    
    audio.onplay = () => {
      setIsPlaying(true);
    };
    
    // Play the audio
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    });
    
    // Save the audio element for future use
    setAudioElement(audio);
  };
  
  return (
    <AyahView 
      ayah={ayah}
      isBookmarked={isBookmarked}
      onBookmark={handleBookmark}
      onPlay={ayah.audio ? handlePlay : undefined}
    />
  );
}
