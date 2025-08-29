'use client';

import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Post, UserProfile } from '../src/app/types';

interface ProfilePostProps {
  post: Post;
  onPostClick: (post: Post) => void;
  user: UserProfile;
}

export const ProfilePost: React.FC<ProfilePostProps> = ({ post, onPostClick, user }) => {
  // Mock data for the collage
  const collageImages = [
    'https://placehold.co/100x100/A855F7/FFFFFF?text=1',
    'https://placehold.co/100x100/3B82F6/FFFFFF?text=2',
    'https://placehold.co/100x100/EC4899/FFFFFF?text=3',
    'https://placehold.co/100x100/10B981/FFFFFF?text=4',
  ];

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 transition-colors duration-200 cursor-pointer"
      onClick={() => onPostClick(post)}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-lg dark:text-gray-100">{user.username}</p>
          <div className="grid grid-cols-2 gap-1 mt-1 w-20">
            {collageImages.slice(0, 4).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Collage image ${index + 1}`}
                className="w-full h-auto object-cover rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 font-normal">{post.description}</p>
      
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mt-4">
        <div className="flex items-center space-x-1">
          <Heart size={20} />
          <span className="text-sm font-semibold">{post.likes.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle size={20} />
          <span className="text-sm font-semibold">{post.comments}</span>
        </div>
      </div>
    </div>
  );
};
