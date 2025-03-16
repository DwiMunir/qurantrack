import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { BottomNavigation } from '@/components/dashboard/bottom-navigation';
import { EnhancedHeader } from '@/components/dashboard/enhanced-header';
import { AccountSettings, ProfileHeader, ProfileSettings, ReadingGoals } from '@/components/profile';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  // Sample data - in a real app, this would come from a database
  const userProfile = {
    name: session.user?.name || 'User',
    email: session.user?.email || 'user@example.com',
    joinDate: '15 Februari 2025',
    readingGoal: {
      daily: 5, // pages per day
      weekly: 30, // pages per week
      memorization: 10, // juz target
    },
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'id',
      translation: true,
      transliteration: true,
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader session={session} />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <ProfileHeader 
          name={userProfile.name} 
          email={userProfile.email} 
          joinDate={userProfile.joinDate}
        />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reading Goals */}
          <div className="lg:col-span-1">
            <ReadingGoals 
              dailyPages={userProfile.readingGoal.daily}
              weeklyPages={userProfile.readingGoal.weekly}
              memorizationTarget={userProfile.readingGoal.memorization}
            />
          </div>
          
          {/* Settings */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <ProfileSettings preferences={userProfile.preferences} />
              <AccountSettings />
            </div>
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
