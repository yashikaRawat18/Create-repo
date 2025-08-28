'use client';

import React, { useState } from 'react';
import { MessageCircle, Bookmark, Share, Heart } from 'lucide-react';
import { Post as PostType } from '../src/app/types';

/**
 * A single post component for the linear feed.
 */
interface PostProps {
  post: PostType;
  onPostClick: (post: PostType) => void;
}

export const Post: React.FC<PostProps> = ({ post, onPostClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onPostClick
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onPostClick
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 transition-colors duration-200 cursor-pointer" 
      onClick={() => onPostClick(post)}
    >
      <div className="relative">
        <img
          src={post.imageUrl}
          alt={post.description}
          className="w-full h-auto rounded-md object-cover mb-4"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            onClick={handleActionClick}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <Bookmark size={24} />
          </button>
          <button 
            onClick={handleActionClick}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <Share size={24} />
          </button>
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-2">
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
      </div>
      
      {/* Post Description */}
      <p className="text-gray-800 dark:text-gray-200 font-normal">{post.description}</p>
    </div>
  );
};