'use client';

import React, { useState } from 'react';
import Link from 'next/link'; 
const mockSuggestions = [
  {
    id: 1,
    username: 'tech_guru',
    avatar: 'https://placehold.co/40x40/8BC34A/FFFFFF?text=T',
    reason: 'Followed by user1',
    isFollowing: false,
  },
  {
    id: 2,
    username: 'design_daily',
    avatar: 'https://placehold.co/40x40/3F51B5/FFFFFF?text=D',
    reason: 'New to Create',
    isFollowing: false,
  },
  {
    id: 3,
    username: 'fit_fam',
    avatar: 'https://placehold.co/40x40/03A9F4/FFFFFF?text=F',
    reason: 'Suggested for you',
    isFollowing: false,
  },
];

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState(mockSuggestions);

  const handleFollow = (userId: number) => {
    setSuggestions(
      suggestions.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const handleDismiss = (userId: number) => {
    setSuggestions(suggestions.filter((user) => user.id !== userId));
  };

  return (
    <div className="hidden lg:block w-80 ml-8">
      <div className="fixed p-4 max-h-screen overflow-y-auto">
        <div className="flex items-center mb-5 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-0.5">
            <img
              src="https://placehold.co/56x56/FFFFFF/000000?text=U"
              alt="User Avatar"
              className="w-full h-full rounded-full border-2 border-white dark:border-gray-900"
            />
          </div>
          <div className="ml-4">
            <p className="font-semibold text-sm text-gray-800 dark:text-white">
             <a href="/profilepage">Current_user</a>
            </p>
          <p className="text-gray-500 text-sm">Your Name</p>
          </div>
          <button className="ml-auto text-blue-500 font-semibold text-xs hover:text-blue-600 transition-colors">
            Switch
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-gray-500 text-sm">Suggestions For You</p>
          <button className="text-xs font-semibold text-gray-800 dark:text-white hover:text-green-500 transition-colors">
            See All
          </button>
        </div>

        <div>
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="flex items-center my-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 flex-grow">
                <p className="font-semibold text-sm text-gray-800 dark:text-white group-hover:text-green-500 transition-colors cursor-pointer">
                  {user.username}
                </p>
                <p className="text-gray-400 text-xs">{user.reason}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`font-semibold text-xs px-3 py-1 rounded-md transition-colors ${
                    user.isFollowing
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
                <button
                  onClick={() => handleDismiss(user.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-300 dark:text-gray-600 mt-8 text-center">
          © 2024 CREATE FROM GEMINI
        </div>
      </div>
    </div>
  );
};

export default Suggestions;