import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { EnhancedHeader } from '@/components/dashboard/enhanced-header';
import { BottomNavigation } from '@/components/dashboard/bottom-navigation';
import { ReadingPageContent } from './reading-page-content';

export default async function ReadingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-500">
      <EnhancedHeader session={session} />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-500">
          Bacaan Al-Quran
        </h2>

        <ReadingPageContent />
      </main>
      
      {/* Fixed Bottom Navigation for Mobile */}
      <BottomNavigation />
      
      {/* Add padding to the bottom on mobile to account for the navigation bar */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
