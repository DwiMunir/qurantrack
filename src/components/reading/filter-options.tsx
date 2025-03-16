"use client";

import { useState } from "react";
import {
  Filter,
  SortAsc,
  BookOpen,
  AlignJustify,
  ArrowDownAZ,
  CheckCircle2,
} from "lucide-react";

type RevelationType = "all" | "Meccan" | "Medinan";
type SortOption = "number" | "name" | "ayahs";

interface FilterOptionsProps {
  onFilterChange?: (revelationType: RevelationType) => void;
  onSortChange?: (sortOption: SortOption) => void;
  onOrderChange?: (ascending: boolean) => void;
}

export function FilterOptions({
  onFilterChange,
  onSortChange,
  onOrderChange,
}: FilterOptionsProps) {
  const [activeFilter, setActiveFilter] = useState<RevelationType>("all");
  const [activeSort, setActiveSort] = useState<SortOption>("number");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleFilterChange = (filter: RevelationType) => {
    setActiveFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    if (onSortChange) onSortChange(sort);
  };

  const toggleOrder = () => {
    setIsAscending(!isAscending);
    if (onOrderChange) onOrderChange(!isAscending);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
      {/* Filter Bar - Always visible */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter & Urutan
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort direction toggle */}
          <button
            onClick={toggleOrder}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={isAscending ? "Sort Descending" : "Sort Ascending"}
          >
            {isAscending ? (
              <SortAsc className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <ArrowDownAZ className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Expand/collapse button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
          >
            <AlignJustify className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Expanded filter options */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-5">
          {/* Filter options */}
          <div>
            <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <BookOpen className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400" />
              Jenis Surah
            </h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                isActive={activeFilter === "all"}
                onClick={() => handleFilterChange("all")}
                label="Semua"
                count={114}
              />
              <FilterButton
                isActive={activeFilter === "Meccan"}
                onClick={() => handleFilterChange("Meccan")}
                label="Makkiyah"
                count={86}
              />
              <FilterButton
                isActive={activeFilter === "Medinan"}
                onClick={() => handleFilterChange("Medinan")}
                label="Madaniyah"
                count={28}
              />
            </div>
          </div>

          {/* Sort options */}
          <div>
            <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <SortAsc className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400" />
              Urutkan Berdasarkan
            </h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                isActive={activeSort === "number"}
                onClick={() => handleSortChange("number")}
                label="Nomor Surah"
              />
              <FilterButton
                isActive={activeSort === "name"}
                onClick={() => handleSortChange("name")}
                label="Nama Surah"
              />
              <FilterButton
                isActive={activeSort === "ayahs"}
                onClick={() => handleSortChange("ayahs")}
                label="Jumlah Ayat"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active filters summary - visible when collapsed */}
      <div
        className={`px-4 py-2 bg-gray-50 dark:bg-gray-700/30 text-xs transition-all duration-300 ${
          isExpanded ? "hidden" : "block"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <span className="font-medium mr-1">Jenis:</span>
            {activeFilter === "all"
              ? "Semua"
              : activeFilter === "Meccan"
              ? "Makkiyah"
              : "Madaniyah"}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span className="flex items-center">
            <span className="font-medium mr-1">Urutan:</span>
            {activeSort === "number"
              ? "Nomor"
              : activeSort === "name"
              ? "Nama"
              : "Jumlah Ayat"}{" "}
            {isAscending ? "(A-Z)" : "(Z-A)"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Reusable filter button component
function FilterButton({
  isActive,
  onClick,
  label,
  count,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
        isActive
          ? "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/60"
          : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
      }`}
    >
      {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
      {label}
      {count !== undefined && (
        <span
          className={`text-xs rounded-full px-1.5 py-0.5 ${
            isActive
              ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
              : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
