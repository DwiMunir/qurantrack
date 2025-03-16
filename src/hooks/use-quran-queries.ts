"use client";

import { useQuery } from "@tanstack/react-query";
import { Surah } from "@/components/reading/surah-list";

// Base URL for the Quran API
const API_BASE_URL = 'https://api.alquran.cloud/v1';

// Interface for Ayah
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  audio?: string;
}

/**
 * Fetch all surahs from the Quran API
 */
async function fetchAllSurahs(): Promise<Surah[]> {
  const response = await fetch(`${API_BASE_URL}/surah`);
  
  if (!response.ok) {
    throw new Error(`Error fetching surahs: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data;
}

/**
 * Fetch a specific surah by number
 */
async function fetchSurahByNumber(number: number): Promise<Surah> {
  const response = await fetch(`${API_BASE_URL}/surah/${number}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching surah: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data;
}

/**
 * Fetch ayahs for a specific surah
 */
async function fetchAyahsForSurah(surahNumber: number): Promise<Ayah[]> {
  const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/ar.alafasy`);
  
  if (!response.ok) {
    throw new Error(`Error fetching ayahs: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Add audio URLs to each ayah
  return data.data.ayahs.map((ayah: { number: number; text: string; numberInSurah: number; juz: number; page: number }) => ({
    ...ayah,
    audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`
  }));
}

/**
 * Hook to fetch all surahs
 */
export function useAllSurahs() {
  return useQuery({
    queryKey: ['surahs'],
    queryFn: fetchAllSurahs,
  });
}

/**
 * Hook to fetch a specific surah by number
 */
export function useSurahByNumber(number: number) {
  return useQuery({
    queryKey: ['surah', number],
    queryFn: () => fetchSurahByNumber(number),
    enabled: !!number,
  });
}

/**
 * Hook to fetch ayahs for a specific surah
 */
export function useAyahsForSurah(surahNumber: number) {
  return useQuery({
    queryKey: ['ayahs', surahNumber],
    queryFn: () => fetchAyahsForSurah(surahNumber),
    enabled: !!surahNumber,
  });
}

/**
 * Search surahs by name or content
 */
export function searchSurahs(surahs: Surah[], query: string): Surah[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  return surahs.filter(surah => {
    return (
      surah.name.toLowerCase().includes(normalizedQuery) ||
      surah.englishName.toLowerCase().includes(normalizedQuery) ||
      surah.englishNameTranslation.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Filter surahs by revelation type
 */
export function filterSurahsByRevelationType(surahs: Surah[], revelationType: string): Surah[] {
  if (revelationType === 'all') {
    return surahs;
  }
  
  return surahs.filter(surah => surah.revelationType === revelationType);
}

/**
 * Sort surahs by different criteria
 */
export function sortSurahs(surahs: Surah[], sortBy: string, isAscending: boolean): Surah[] {
  const sortedSurahs = [...surahs];
  
  switch (sortBy) {
    case 'number':
      return sortedSurahs.sort((a, b) => isAscending ? a.number - b.number : b.number - a.number);
    case 'name':
      return sortedSurahs.sort((a, b) => isAscending ? a.englishName.localeCompare(b.englishName) : b.englishName.localeCompare(a.englishName));
    case 'ayahs':
      return sortedSurahs.sort((a, b) => isAscending ? a.numberOfAyahs - b.numberOfAyahs : b.numberOfAyahs - a.numberOfAyahs);
    default:
      return sortedSurahs;
  }
}
