import { Surah } from '@/components/reading/surah-list';

// Base URL for the Quran API
const API_BASE_URL = 'https://api.alquran.cloud/v1';

/**
 * Fetch all surahs from the Quran API
 */
export async function getAllSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/surah`);
    
    if (!response.ok) {
      throw new Error(`Error fetching surahs: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch surahs:', error);
    return [];
  }
}

/**
 * Fetch a specific surah by number
 */
export async function getSurahByNumber(number: number): Promise<Surah | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${number}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching surah: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch surah ${number}:`, error);
    return null;
  }
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  audio: string;
}

/**
 * Fetch ayahs for a specific surah
 */
export async function getAyahsForSurah(surahNumber: number): Promise<Ayah[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/ar.alafasy`);
    
    if (!response.ok) {
      throw new Error(`Error fetching ayahs: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.ayahs;
  } catch (error) {
    console.error(`Failed to fetch ayahs for surah ${surahNumber}:`, error);
    return [];
  }
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
export function sortSurahs(surahs: Surah[], sortBy: string): Surah[] {
  const sortedSurahs = [...surahs];
  
  switch (sortBy) {
    case 'number':
      return sortedSurahs.sort((a, b) => a.number - b.number);
    case 'name':
      return sortedSurahs.sort((a, b) => a.englishName.localeCompare(b.englishName));
    case 'ayahs':
      return sortedSurahs.sort((a, b) => b.numberOfAyahs - a.numberOfAyahs);
    default:
      return sortedSurahs;
  }
}
