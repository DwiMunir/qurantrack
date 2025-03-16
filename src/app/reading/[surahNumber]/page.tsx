import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { EnhancedHeader } from '@/components/dashboard/enhanced-header';
import { BottomNavigation } from '@/components/dashboard/bottom-navigation';
import { SurahPageContent } from './surah-page-content';

interface SurahPageProps {
  params: {
    surahNumber: string;
  };
}

export default async function SurahPage({ params }: SurahPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  // Ensure params is properly awaited
  const { surahNumber: surahNumberStr } = params;
  const surahNumber = parseInt(surahNumberStr);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-500">
      <EnhancedHeader session={session} />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <SurahPageContent surahNumber={surahNumber} />
      </main>
      
      {/* Fixed Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add padding to the bottom on mobile to account for the navigation bar */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
