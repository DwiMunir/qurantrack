import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Bookmark,
  ChevronRight,
} from "lucide-react";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahListProps {
  surahs: Surah[];
  recentlyRead?: number[];
}

export function SurahList({ surahs, recentlyRead = [] }: SurahListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(surahs);
  const [activeTab, setActiveTab] = useState<"all" | "recent">("all");

  // Filter surahs based on search query and active tab
  useEffect(() => {
    let filtered = surahs;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (surah) =>
          surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          surah.englishNameTranslation
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          surah.number.toString().includes(searchQuery)
      );
    }

    // Apply tab filter
    if (activeTab === "recent") {
      filtered = filtered.filter((surah) =>
        recentlyRead.includes(surah.number)
      );
    }

    setFilteredSurahs(filtered);
  }, [searchQuery, activeTab, surahs, recentlyRead]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-500">
              Daftar Surah Al-Quran
            </h2>
          </div>
          <div className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
            {surahs.length} Surah
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari surah..."
            className="block w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "all"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Semua Surah
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "recent"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Bookmark className="w-4 h-4" />
            <span>Terakhir Dibaca</span>
            {recentlyRead.length > 0 && (
              <span className="ml-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 text-xs px-1.5 py-0.5 rounded-full">
                {recentlyRead.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Empty state */}
      {filteredSurahs.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white mb-1">
            Tidak ditemukan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tidak ada surah yang sesuai dengan pencarian Anda
          </p>
        </div>
      )}

      {/* Surah list */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {/* {activeTab === "all" && makkiSurahs.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 sticky top-0 z-10">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Surah Makkiyah
            </h3>
          </div>
        )} */}

        {filteredSurahs.map((surah) => (
          <SurahItem
            key={`surah-${surah.number}`}
            surah={surah}
            isRecent={recentlyRead.includes(surah.number)}
          />
        ))}
{/* 
        {activeTab === "all" && madaniSurahs.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 sticky top-0 z-10">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Surah Madaniyah
            </h3>
          </div>
        )}

        {madaniSurahs.map((surah) => (
          <SurahItem
            key={`madani-${surah.number}`}
            surah={surah}
            isRecent={recentlyRead.includes(surah.number)}
          />
        ))} */}
      </div>
    </div>
  );
}

// Surah list item component
function SurahItem({ surah, isRecent }: { surah: Surah; isRecent: boolean }) {
  return (
    <Link
      href={`/reading/${surah.number}`}
      className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
        isRecent ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center text-sm font-medium ${
            isRecent
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {surah.number}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-gray-800 dark:text-gray-300">
              {surah.name}
            </h3>
            {isRecent && (
              <Bookmark className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{surah.englishName}</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span>{surah.numberOfAyahs} Ayat</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {surah.revelationType}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isRecent && (
          <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full hidden sm:block">
            Terakhir Dibaca
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
      </div>
    </Link>
  );
}
