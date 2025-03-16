import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { BottomNavigation } from '@/components/dashboard/bottom-navigation';
import { EnhancedHeader } from '@/components/dashboard/enhanced-header';
import { 
  ReadingStatsOverview,
  MonthlyProgressChart,
  ReadingStreakCard,
  SurahCompletionStats
} from '@/components/statistics';

export default async function StatisticsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  // Sample data - in a real app, this would come from a database
  const readingStats = {
    totalPages: 604,
    pagesThisMonth: 42,
    pagesLastMonth: 38,
    averageDailyPages: 1.4,
    currentStreak: 5,
    longestStreak: 12,
  };

  const monthlyData = [
    { month: 'Jan', pages: 28 },
    { month: 'Feb', pages: 32 },
    { month: 'Mar', pages: 38 },
    { month: 'Apr', pages: 42 },
    { month: 'May', pages: 35 },
    { month: 'Jun', pages: 40 },
    { month: 'Jul', pages: 45 },
    { month: 'Aug', pages: 0 },
    { month: 'Sep', pages: 0 },
    { month: 'Oct', pages: 0 },
    { month: 'Nov', pages: 0 },
    { month: 'Dec', pages: 0 },
  ];

  const surahCompletionData = [
    { name: 'Al-Baqarah', totalAyat: 286, readCount: 3, lastRead: '2 hari lalu' },
    { name: 'Ali Imran', totalAyat: 200, readCount: 2, lastRead: '1 minggu lalu' },
    { name: 'An-Nisa', totalAyat: 176, readCount: 1, lastRead: '2 minggu lalu' },
    { name: 'Al-Maidah', totalAyat: 120, readCount: 4, lastRead: '3 hari lalu' },
    { name: 'Al-Anam', totalAyat: 165, readCount: 0, lastRead: 'Belum dibaca' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader session={session} />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-6">
          Statistik Bacaan
        </h2>

        {/* Stats Overview Cards */}
        <ReadingStatsOverview stats={readingStats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Monthly Progress Chart */}
          <div className="lg:col-span-2">
            <MonthlyProgressChart monthlyData={monthlyData} />
          </div>

          {/* Reading Streak */}
          <div>
            <ReadingStreakCard 
              currentStreak={readingStats.currentStreak} 
              longestStreak={readingStats.longestStreak} 
            />
          </div>
        </div>

        {/* Surah Completion Stats */}
        <div className="mt-6">
          <SurahCompletionStats surahData={surahCompletionData} />
        </div>
      </main>
      
      {/* Fixed Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add padding to the bottom on mobile to account for the navigation bar */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
