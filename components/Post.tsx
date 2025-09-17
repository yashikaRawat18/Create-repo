'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { FeedPost } from '@/app/types';

interface PostProps {
  post: FeedPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
      {/* Header */}
      <div className="flex items-center px-4 py-2">
        <img
          src={post.avatar}
          alt={post.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold">{post.username}</span>
      </div>

      {/* Image */}
      <img src={post.postUrl} alt="Post" className="w-full max-h-[500px] object-cover" />

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-4">
          <Heart
            className={`cursor-pointer hover:scale-110 transition-transform ${isLiked ? 'text-red-500' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          />
          <MessageCircle className="cursor-pointer hover:scale-110 transition-transform" />
          <Send className="cursor-pointer hover:scale-110 transition-transform" />
        </div>
        <Bookmark
          className={`cursor-pointer hover:scale-110 transition-transform ${isBookmarked ? 'text-yellow-500' : ''}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        />
      </div>

      {/* Stats */}
      <div className="px-4 pb-2">
        <p className="font-semibold">{isLiked ? post.likes + 1 : post.likes} likes</p>
        <p className="text-sm"><span className="font-semibold">{post.username}</span> {post.description}</p>
        <p className="text-gray-500 text-xs">{post.timestamp}</p>
      </div>
    </div>
  );
};

export default Post;
