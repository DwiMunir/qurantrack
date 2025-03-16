import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { ReadingProgress } from '@/components/dashboard/reading-progress';
import { MemorizedSurahList } from '@/components/dashboard/memorized-surah-list';
import { BottomNavigation } from '@/components/dashboard/bottom-navigation';
import { EnhancedHeader } from '@/components/dashboard/enhanced-header';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  // Sample data - in a real app, this would come from a database
  const readingProgress = 65;
  const memorizationProgress = 30;
  const dailyTargetProgress = 80;
  
  const weeklyReadingData = [
    { day: 'Sen', pages: 3 },
    { day: 'Sel', pages: 4 },
    { day: 'Rab', pages: 2 },
    { day: 'Kam', pages: 5 },
    { day: 'Jum', pages: 3 },
    { day: 'Sab', pages: 0 },
    { day: 'Min', pages: 2 },
  ];
  
  const memorizedSurahs = [
    { name: 'Al-Fatihah', ayatCount: 7, isMemorized: true },
    { name: 'Al-Ikhlas', ayatCount: 4, isMemorized: true },
    { name: 'Al-Falaq', ayatCount: 5, isMemorized: true },
    { name: 'An-Nas', ayatCount: 6, isMemorized: true },
    { name: 'Al-Kauthar', ayatCount: 3, isMemorized: true },
    { name: 'Al-Asr', ayatCount: 3, isMemorized: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader session={session} />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-6">
          Assalamu&apos;alaikum, {session.user?.name?.split(" ")[0]}
        </h2>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <ProgressCard
            icon={<span className="text-lg">📖</span>}
            title="Bacaan Al-Quran"
            percentage={readingProgress}
            subtitle={`Juz 17 dari 30`}
            color="green"
          />

          <ProgressCard
            icon={<span className="text-lg">🔖</span>}
            title="Hafalan"
            percentage={memorizationProgress}
            subtitle={`3 Juz dari 10 target`}
            color="blue"
          />

          <ProgressCard
            icon={<span className="text-lg">🎯</span>}
            title="Target Harian"
            percentage={dailyTargetProgress}
            subtitle={`4 dari 5 halaman`}
            color="orange"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reading Progress Chart */}
          <div className="lg:col-span-2">
            <ReadingProgress
              weeklyData={weeklyReadingData}
              weekTotal={19}
              dailyAverage={2.7}
            />
          </div>

          {/* Memorized Surahs */}
          <div>
            <MemorizedSurahList
              surahs={memorizedSurahs}
              totalMemorized={6}
              totalSurahs={114}
            />
          </div>
        </div>
      </main>
      
      {/* Fixed Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add padding to the bottom on mobile to account for the navigation bar */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
