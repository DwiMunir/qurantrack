import { QuranIcon } from '@/components/icons/quran-icon';
import { SignOutButton } from '@/components/dashboard/signout-button';
import { Session } from 'next-auth';
import Link from 'next/link';

interface EnhancedHeaderProps {
  session: Session | null;
}

export function EnhancedHeader({ session }: EnhancedHeaderProps) {
  return (
    <header className="py-3 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-10 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and App Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-2 rounded-full shadow-md transform transition-transform group-hover:scale-105 dark:bg-gray-800 dark:text-gray-500">
            <QuranIcon className="h-8 w-8 text-blue-600 dark:text-gray-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white dark:text-gray-500">QuranTrack</h1>
            <p className="text-xs text-blue-100 hidden md:block dark:text-gray-500">Track your Quran journey</p>
          </div>
        </Link>

        {/* User Profile and Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 bg-blue-700/50 py-2 px-4 rounded-full">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-medium text-lg shadow-md dark:bg-gray-800 dark:text-gray-500">
              {session?.user?.name?.[0]}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-white dark:text-gray-500">
                {session?.user?.name}
              </span>
              <span className="text-xs text-blue-200 dark:text-gray-500">
                {session?.user?.email}
              </span>
            </div>
          </div>
          <SignOutButton className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-full shadow-md transition duration-200 dark:bg-gray-800 dark:text-gray-500" />
        </div>
      </div>
    </header>
  );
}
