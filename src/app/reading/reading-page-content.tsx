"use client";

import { useState } from 'react';
import { SurahList } from '@/components/reading/surah-list';
import { ReadingStats } from '@/components/reading/reading-stats';
import { SearchBar } from '@/components/reading/search-bar';
import { FilterOptions } from '@/components/reading/filter-options';
import { useAllSurahs, searchSurahs, filterSurahsByRevelationType, sortSurahs } from '@/hooks/use-quran-queries';

type RevelationType = 'all' | 'Meccan' | 'Medinan';
type SortOption = 'number' | 'name' | 'ayahs';

export function ReadingPageContent() {
  // State for search, filter, and sort
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<RevelationType>('all');
  const [sortOption, setSortOption] = useState<SortOption>('number');
  const [isAscending, setIsAscending] = useState<boolean>(true);  
  // Fetch surahs with React Query
  const { data: surahs, isLoading, error } = useAllSurahs();
  
  // Mock data for reading stats
  const readingStats = {
    totalRead: 24,
    totalSurahs: 114,
    lastReadDate: '16 Maret 2025',
    streak: 7,
    totalPages: 124
  };
  
  // Mock data for recently read surahs
  const recentlyRead = [1, 36, 67, 78];
  
  // Apply search, filter, and sort
  const processedSurahs = () => {
    if (!surahs) return [];
    
    let result = [...surahs];
    
    // Apply search
    if (searchQuery) {
      result = searchSurahs(result, searchQuery);
    }
    
    // Apply filter
    result = filterSurahsByRevelationType(result, filterType);
    
    // Apply sort
    result = sortSurahs(result, sortOption, isAscending);
    
    return result;
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle filter change
  const handleFilterChange = (filter: RevelationType) => {
    setFilterType(filter);
  };
  
  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  // Handle order change
  const handleOrderChange = (ascending: boolean) => {
    setIsAscending(ascending);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>Gagal memuat data surah. Silakan coba lagi nanti.</p>
        <p className="text-sm mt-1">{(error as Error).message}</p>
      </div>
    );
  }
  
  return (
    <>
      {/* Client Components for Search and Filter */}
      {/* <div className="lg:hidden mb-6">
        <SearchBar onSearch={handleSearch} />
      </div> */}
      
      <div className="lg:hidden mb-6">
        <FilterOptions 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Surah List - Takes 2/3 of the screen on desktop */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <SurahList surahs={processedSurahs()} recentlyRead={recentlyRead} />
        </div>
        
        {/* Sidebar with Stats and Filters - Takes 1/3 of the screen on desktop */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="hidden lg:block">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <ReadingStats {...readingStats} />
          
          <div className="hidden lg:block">
            <FilterOptions 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onOrderChange={handleOrderChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
