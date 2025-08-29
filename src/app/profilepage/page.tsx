'use client';

const userPostsData: Post[] = [
  { id: 1, imageUrl: 'https://placehold.co/600x600/FF5733/FFFFFF?text=Post+1', description: 'Just finished rereading \'Harry Potter and the Sorcerer\'s Stone\'. The magic of the first book never gets old. What\'s your favorite part of Harry\'s journey into the wizarding world?', likes: 234, comments: 12 },
  { id: 2, imageUrl: 'https://placehold.co/600x600/33C7FF/FFFFFF?text=Post+2', description: 'Rereading \'The Prisoner of Azkaban\' for the fifth time. The introduction of the Marauder\'s Map and the time-turner is brilliant. It\'s a masterpiece of plotting.', likes: 156, comments: 8 },
  { id: 3, imageUrl: 'https://placehold.co/600x600/33FF57/FFFFFF?text=Post+3', description: '\'The Chamber of Secrets\' is so underrated! The flying car, the spiders... it\'s just pure adventure. I always feel like I\'m right there with Harry and Ron.', likes: 89, comments: 15 },
  { id: 4, imageUrl: 'https://placehold.co/600x600/E533FF/FFFFFF?text=Post+4', description: "Diving deep into 'Goblet of Fire'. The Triwizard Tournament and the mystery around Voldemort's return make it so intense.", likes: 301, comments: 20 },
  { id: 5, imageUrl: 'https://placehold.co/600x600/FFBD33/FFFFFF?text=Post+5', description: "'Order of the Phoenix' feels so different with the Ministry's influence. Dolores Umbridge is a character you love to hate.", likes: 45, comments: 5 },
  { id: 6, imageUrl: 'https://placehold.co/600x600/FF33A8/FFFFFF?text=Post+6', description: "The emotional rollercoaster of 'Half-Blood Prince' is something else. The reveal of the Horcruxes and Snape's true loyalties are incredible.", likes: 512, comments: 34 },
];

import React, { useState } from 'react';
import { ProfileHeader } from '../../../components/profileheader';
import { SinglePostView } from '../../../components/SinglePostView';
import { Post, UserProfile } from '../types';
import { ProfilePost } from '../../../components/ProfilePost';

// Mock data for the user and their posts
const userProfileData = {
  username: 'travel_adventures',
  avatar: 'https://placehold.co/512x512/3498db/FFFFFF?text=TA',
  bio: 'Exploring the world one photo at a time. 🌍📍 Photographer & Storyteller.',
  postsCount: 154,
  followersCount: 15289,
  followingCount: 356,
  website: 'www.traveladventures.com',
};

/**
 * The main App component that combines all profile elements.
 * Uses a simple state-based router to switch between views.
 * @returns {JSX.Element} The complete profile page component.
 */
export default function ProfileApp() {
  const [currentPage, setCurrentPage] = useState<'profile' | 'post'>('profile');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Handler to navigate to a specific post
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage('post');
  };

  // Handler to navigate back to the profile page
  const handleBackClick = () => {
    setCurrentPage('profile');
    setSelectedPost(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans antialiased text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
        {currentPage === 'profile' ? (
          <>
            <ProfileHeader user={userProfileData} />
            <div className="mt-8">
              {userPostsData.map(post => (
                <ProfilePost 
                  key={post.id} 
                  post={post} 
                  onPostClick={handlePostClick}
                  user={userProfileData}
                />
              ))}
            </div>
          </>
        ) : (
          selectedPost && (
            <SinglePostView 
              post={selectedPost} 
              onBack={handleBackClick} 
              username={userProfileData.username}
            />
          )
        )}
      </div>
    </div>
  );
}
