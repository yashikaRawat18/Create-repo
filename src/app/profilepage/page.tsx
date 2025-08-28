'use client';

const userPostsData: Post[] = [
  { id: 1, imageUrl: 'https://placehold.co/600x600/FF5733/FFFFFF?text=Post+1', description: 'A breathtaking sunset view from the mountains. This hike was tough but so worth it!', likes: 234, comments: 12 },
  { id: 2, imageUrl: 'https://placehold.co/600x600/33C7FF/FFFFFF?text=Post+2', description: 'Hidden streets in a historic city. Love finding these quiet, charming corners.', likes: 156, comments: 8 },
  { id: 3, imageUrl: 'https://placehold.co/600x600/33FF57/FFFFFF?text=Post+3', description: 'Mountain trekking adventure. The air is so crisp up here. #adventure #mountains', likes: 89, comments: 15 },
  { id: 4, imageUrl: 'https://placehold.co/600x600/E533FF/FFFFFF?text=Post+4', description: 'Local market vibes. The colors and smells here are incredible!', likes: 301, comments: 20 },
  { id: 5, imageUrl: 'https://placehold.co/600x600/FFBD33/FFFFFF?text=Post+5', description: 'Desert landscape, feeling small and inspired by this vastness.', likes: 45, comments: 5 },
  { id: 6, imageUrl: 'https://placehold.co/600x600/FF33A8/FFFFFF?text=Post+6', description: 'Sunrise over the ocean. Early mornings are my favorite.', likes: 512, comments: 34 },
];

import React, { useState } from 'react';
import { ProfileHeader } from '../../../components/profileheader';
import { PostList } from '../../../components/postList';
import { SinglePostView } from '../../../components/SinglePostView';
import { Post, UserProfile } from '../types';

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
            <PostList posts={userPostsData} onPostClick={handlePostClick} />
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