"use client";

import { SearchBar } from '@/components/reading/search-bar';

export function SearchBarClient() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // In a real app, this would update the displayed surahs
    // This could use React state or a more sophisticated state management solution
  };

  return <SearchBar onSearch={handleSearch} />;
}
