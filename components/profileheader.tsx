'use client';

import React from 'react';
import { MoreHorizontal, Link as LinkIcon } from 'lucide-react';
import { UserProfile } from '../src/app/types';

/**
 * A reusable component to display a number with a label.
 */
interface ProfileStatProps {
  label: string;
  value: string | number;
}

const ProfileStat: React.FC<ProfileStatProps> = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="font-semibold text-lg dark:text-gray-100">{value}</span>
    <span className="text-gray-600 dark:text-gray-400 text-sm">{label}</span>
  </div>
);

/**
 * The main profile header component.
 * Displays user info, stats, and a bio.
 */
interface ProfileHeaderProps {
  user: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-12 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 transition-colors duration-200">
    {/* Avatar */}
    <div className="flex-shrink-0">
      <img
        className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
        src={user.avatar}
        alt={`${user.username}'s avatar`}
      />
    </div>

    {/* Profile Details */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full">
      {/* Username and Actions */}
      <div className="flex items-center space-x-4">
        <h2 className="text-3xl font-light dark:text-gray-100">{user.username}</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200">
          stick
        </button>
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Stats */}
      <div className="flex space-x-8">
        <ProfileStat label="Posts" value={user.postsCount.toLocaleString()} />
        <ProfileStat label="Followers" value={user.followersCount.toLocaleString()} />
        <ProfileStat label="Following" value={user.followingCount.toLocaleString()} />
      </div>

      {/* Bio and Website */}
      <div className="flex flex-col items-center md:items-start text-sm">
        <p className="font-semibold dark:text-gray-100">{user.bio}</p>
        <a 
          href={`https://${user.website}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 mt-1 flex items-center space-x-1 transition-colors duration-200"
        >
          <LinkIcon size={16} />
          <span>{user.website}</span>
        </a>
      </div>
    </div>
  </div>
);