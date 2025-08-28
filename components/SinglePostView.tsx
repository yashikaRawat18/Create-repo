'use client';

import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Heart, MessageCircle, Bookmark, Share } from 'lucide-react';
import { Post as PostType } from '../src/app/types';

/**
 * The single-post view component.
 */
interface SinglePostViewProps {
  post: PostType;
  onBack: () => void;
  username: string;
}

export const SinglePostView: React.FC<SinglePostViewProps> = ({ post, onBack, username }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-2xl mx-auto transition-colors duration-200">
      <div className="w-full flex justify-between items-center mb-4">
        <button 
          onClick={onBack} 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="text-lg font-semibold dark:text-gray-100">{username}</span>
        <MoreHorizontal size={24} className="text-gray-500 dark:text-gray-400" />
      </div>

      <img
        src={post.imageUrl}
        alt={post.description}
        className="w-full h-auto rounded-md object-cover mb-4"
      />
      
      {/* Post Actions */}
      <div className="w-full flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-4">
        <button 
          onClick={handleLikeClick} 
          className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <Heart 
            size={20} 
            fill={isLiked ? 'red' : 'none'} 
            color={isLiked ? 'red' : 'currentColor'} 
          />
          <span className="text-sm font-semibold">{likesCount.toLocaleString()}</span>
        </button>
        <div className="flex items-center space-x-1">
          <MessageCircle size={20} />
          <span className="text-sm font-semibold">{post.comments}</span>
        </div>
        <div className="flex-grow flex justify-end space-x-4">
          <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
            <Bookmark size={20} />
          </button>
          <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
            <Share size={20} />
          </button>
        </div>
      </div>

      {/* Post Description */}
      <div className="w-full">
        <p className="text-gray-800 dark:text-gray-200 font-normal">{post.description}</p>
      </div>
    </div>
  );
};