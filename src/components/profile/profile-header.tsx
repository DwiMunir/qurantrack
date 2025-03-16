'use client';

interface ProfileHeaderProps {
  name: string;
  email: string;
  joinDate: string;
}

export function ProfileHeader({ name, email, joinDate }: ProfileHeaderProps) {
  // Get the first letter of the name for the avatar
  const initial = name.charAt(0).toUpperCase();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* User Avatar */}
        <div className="relative w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-4xl font-bold shadow-md">
          {initial}
        </div>
        
        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{name}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Bergabung sejak {joinDate}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Halaman</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">604</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Streak Saat Ini</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">5 hari</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Surah Dibaca</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">24/114</p>
            </div>
          </div>
        </div>
        
        {/* Edit Profile Button - Desktop */}
        <div className="hidden md:block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Edit Profil
          </button>
        </div>
      </div>
      
      {/* Edit Profile Button - Mobile */}
      <div className="mt-6 md:hidden">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          Edit Profil
        </button>
      </div>
    </div>
  );
}
