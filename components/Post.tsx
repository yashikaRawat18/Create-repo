'use client';

import React, { useState } from 'react';
import {
  MoreHorizontal,
  Link,
  MessageCircle,
  Bookmark,
  Share,
  Heart,
} from 'lucide-react';

interface PostProps {
  post: {
    id: number;
    username: string;
    avatar: string;
    description: string;
    timestamp: string;
    postUrl: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    isBookmarked: boolean;
  };
}

const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log('Adding comment:', comment);
      setComment('');
    }
  };

  const handleShare = () => {
    console.log('Sharing post:', post.id);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-0.5">
          <img
            src={post.avatar}
            alt={post.username}
            className="w-full h-full rounded-full border-2 border-white dark:border-gray-900"
          />
        </div>
        <div className="ml-3">
          <p className="font-semibold text-sm text-gray-800 dark:text-white hover:text-green-500 cursor-pointer transition-colors">
            {post.username}
          </p>
          <p className="text-xs text-gray-400 mt-1">{post.timestamp}</p>
        </div>
        <button className="ml-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="px-4 pb-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {post.description}
        </p>
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-xs text-blue-500 hover:text-blue-600 font-semibold transition-colors"
        >
          <Link size={14} className="mr-1" />
          Read More
        </a>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-colors ${
              isLiked
                ? 'text-red-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
          >
            <MessageCircle size={24} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button
            onClick={handleShare}
            className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors"
          >
            <Share size={24} />
          </button>
        </div>
        <button
          onClick={handleBookmark}
          className={`transition-colors ${isBookmarked ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-400 hover:text-yellow-500'}`}
        >
          <Bookmark size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <form onSubmit={handleComment} className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="text-blue-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-600 transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;