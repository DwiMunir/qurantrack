"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  audio?: string;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface AudioContextType {
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
  playingAyahNumber: number | null;
  setPlayingAyahNumber: (ayahNumber: number | null) => void;
  playingSurah: Surah | null;
  setPlayingSurah: (surah: Surah | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isAutoPlayEnabled: boolean;
  setIsAutoPlayEnabled: (isAutoPlayEnabled: boolean) => void;
  ayahs: Ayah[] | null;
  setAyahs: (ayahs: Ayah[] | null) => void;
  handlePlay: (audioUrl: string, ayahNumber: number, surah: Surah, ayahs: Ayah[]) => void;
  handleTogglePlayPause: () => void;
  handleStop: () => void;
  handleToggleAutoPlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [playingSurah, setPlayingSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState<boolean>(true);
  const [ayahs, setAyahs] = useState<Ayah[] | null>(null);

  // Handle audio playback
  const handlePlay = (audioUrl: string, ayahNumber: number, surah: Surah, currentAyahs: Ayah[]) => {
    // If there's already audio playing, stop it first
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      
      // If the same ayah is clicked, just toggle playback and reset state
      if (playingAyahNumber === ayahNumber && playingSurah?.number === surah.number) {
        setCurrentAudio(null);
        setPlayingAyahNumber(null);
        setIsPlaying(false);
        return;
      }
    }
    
    // Create and play new audio
    const audio = new Audio(audioUrl);
    
    // Add event listener for when audio ends
    audio.addEventListener('ended', () => {
      // If auto-play is enabled and there are more ayahs, play the next one
      if (isAutoPlayEnabled && currentAyahs) {
        const currentIndex = currentAyahs.findIndex(a => a.numberInSurah === ayahNumber);
        if (currentIndex < currentAyahs.length - 1) {
          // Play the next ayah
          const nextAyah = currentAyahs[currentIndex + 1];
          handlePlay(nextAyah.audio || '', nextAyah.numberInSurah, surah, currentAyahs);
          return;
        }
      }
      
      // If we reach here, either auto-play is disabled or we're at the last ayah
      setCurrentAudio(null);
      setPlayingAyahNumber(null);
      setIsPlaying(false);
    });
    
    // Add event listeners for tracking play state
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      setCurrentAudio(null);
      setPlayingAyahNumber(null);
      setIsPlaying(false);
    });
    
    setCurrentAudio(audio);
    setPlayingAyahNumber(ayahNumber);
    setPlayingSurah(surah);
    setAyahs(currentAyahs);
    setIsPlaying(true);
  };

  // Handle global audio controls
  const handleTogglePlayPause = () => {
    if (!currentAudio || !playingAyahNumber) return;
    
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play().catch(console.error);
    }
  };
  
  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
      setPlayingAyahNumber(null);
      setIsPlaying(false);
    }
  };
  
  const handleToggleAutoPlay = () => {
    setIsAutoPlayEnabled(!isAutoPlayEnabled);
  };

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  const value = {
    currentAudio,
    setCurrentAudio,
    playingAyahNumber,
    setPlayingAyahNumber,
    playingSurah,
    setPlayingSurah,
    isPlaying,
    setIsPlaying,
    isAutoPlayEnabled,
    setIsAutoPlayEnabled,
    ayahs,
    setAyahs,
    handlePlay,
    handleTogglePlayPause,
    handleStop,
    handleToggleAutoPlay
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
