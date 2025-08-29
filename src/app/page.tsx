'use client';

import {
  MoreHorizontal,
  Link,
  MessageCircle,
  Bookmark,
  Share,
} from 'lucide-react';


import Header from '@/../components/Header';
import StoryReel from '@/../components/StoryReel';
import Post from '@/../components/Post';
import Suggestions from '@/../components/Suggestions';

// Mock Data for the feed
const mockPosts = [
  {
    id: 1,
    username: 'harrypotter_fan',
    avatar: 'https://placehold.co/512x512/7f1d1d/FFFFFF?text=HP',
    description:
      "Just finished rereading 'Harry Potter and the Sorcerer's Stone'. The magic of the first book never gets old. What's your favorite part of Harry's journey into the wizarding world?",
    timestamp: '2 hours ago',
    postUrl: '#',
    likes: 234,
    comments: 12,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 2,
    username: 'hermione_granger',
    avatar: 'https://placehold.co/512x512/059669/FFFFFF?text=HG',
    description:
      "Rereading 'The Prisoner of Azkaban' for the fifth time. The introduction of the Marauder's Map and the time-turner is brilliant. It's a masterpiece of plotting.",
    timestamp: '5 hours ago',
    postUrl: '#',
    likes: 156,
    comments: 8,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 3,
    username: 'ron_weasley',
    avatar: 'https://placehold.co/512x512/4338ca/FFFFFF?text=RW',
    description:
      "'The Chamber of Secrets' is so underrated! The flying car, the spiders... it's just pure adventure. I always feel like I'm right there with Harry and Ron.",
    timestamp: '8 hours ago',
    postUrl: '#',
    likes: 89,
    comments: 15,
    isLiked: false,
    isBookmarked: true,
  },
];

export default function Page() {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Header, StoryReel, and Suggestions are client components that handle interactivity */}
      <Header />
      <main className="container mx-auto pt-20 px-4">
        <div className="flex justify-center">
          {/* Feed is a client component that wraps Post components */}
          <div className="w-full max-w-lg mx-auto">
            <StoryReel />
            {mockPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          
          <Suggestions />
        </div>
      </main>
    </div>
  );
  
}
