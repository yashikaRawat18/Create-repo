'use client';

import React from 'react';
import { Grid } from 'lucide-react';
import { Post } from './postComponents';
import { Post as PostType } from '../src/app/types';

/**
 * The post list component.
 * Displays a linear list of user's posts.
 */
interface PostListProps {
  posts: PostType[];
  onPostClick: (post: PostType) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => (
  <div className="mt-8">
    <div className="flex justify-center border-t border-gray-300 dark:border-gray-600 pt-4">
      <span className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 font-semibold border-t-2 border-blue-500 pt-2 -mt-4">
        <Grid size={16} />
        <span>POSTS</span>
      </span>
    </div>
    <div className="mt-6">
      {posts.map(post => (
        <Post key={post.id} post={post} onPostClick={onPostClick} />
      ))}
    </div>
  </div>
);