'use client';

import { ProfilePost as ProfilePostType } from "@/app/types";


interface ProfilePostProps {
  post: ProfilePostType;
  onPostClick?: (post: ProfilePostType) => void; // optional click handler
}

export default function ProfilePost({ post, onPostClick }: ProfilePostProps) {
  return (
    <div
      className="cursor-pointer border rounded-lg bg-white dark:bg-gray-900 shadow p-2 mb-2"
      onClick={() => onPostClick?.(post)}
    >
      <img
        src={post.imageUrl}
        alt={post.description}
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-2 px-1">
        <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-1 truncate">{post.description}</div>
        <div className="flex items-center gap-4 mt-1">
          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
            <span className="text-xs">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2" /><path d="M15 3h-6a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
            <span className="text-xs">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-green-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" /></svg>
            <span className="text-xs">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
