"use client";

import { FilterOptions } from '@/components/reading/filter-options';

export function FilterOptionsClient() {
  const handleFilterChange = (filter: 'all' | 'Meccan' | 'Medinan') => {
    console.log('Filter changed:', filter);
    // In a real app, this would filter the displayed surahs
  };

  const handleSortChange = (sort: 'number' | 'name' | 'ayahs') => {
    console.log('Sort changed:', sort);
    // In a real app, this would sort the displayed surahs
  };

  return (
    <FilterOptions 
      onFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
    />
  );
}
