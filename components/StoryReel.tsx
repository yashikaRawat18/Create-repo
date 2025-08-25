'use client';

import React, { useState } from 'react';

const mockStories = [
  {
    id: 1,
    username: 'your_story',
    avatar: 'https://placehold.co/56x56/FFFFFF/000000?text=+',
    isCurrentUser: true,
    hasNewStory: false,
  },
  {
    id: 2,
    username: 'traveler',
    avatar: 'https://placehold.co/56x56/2196F3/FFFFFF?text=T',
    hasNewStory: true,
  },
  {
    id: 3,
    username: 'foodie',
    avatar: 'https://placehold.co/56x56/4CAF50/FFFFFF?text=F',
    hasNewStory: true,
  },
  {
    id: 4,
    username: 'artist',
    avatar: 'https://placehold.co/56x56/00BCD4/FFFFFF?text=A',
    hasNewStory: false,
  },
  {
    id: 5,
    username: 'gamer',
    avatar: 'https://placehold.co/56x56/8BC34A/FFFFFF?text=G',
    hasNewStory: true,
  },
  {
    id: 6,
    username: 'musician',
    avatar: 'https://placehold.co/56x56/3F51B5/FFFFFF?text=M',
    hasNewStory: false,
  },
  {
    id: 7,
    username: 'designer',
    avatar: 'https://placehold.co/56x56/03A9F4/FFFFFF?text=D',
    hasNewStory: true,
  },
  {
    id: 8,
    username: 'writer',
    avatar: 'https://placehold.co/56x56/009688/FFFFFF?text=W',
    hasNewStory: false,
  },
];

const StoryReel = () => {
  const [viewedStories, setViewedStories] = useState<number[]>([]);

  const handleStoryClick = (storyId: number) => {
    if (!viewedStories.includes(storyId)) {
      setViewedStories([...viewedStories, storyId]);
    }
    console.log('Viewing story:', storyId);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
        {mockStories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 text-center cursor-pointer group"
            onClick={() => handleStoryClick(story.id)}
          >
            <div
              className={`w-16 h-16 rounded-full p-0.5 ${
                !story.isCurrentUser
                  ? viewedStories.includes(story.id)
                    ? 'bg-gray-300'
                    : 'bg-gradient-to-tr from-green-400 to-blue-500'
                  : 'bg-gray-200'
              } flex items-center justify-center hover:scale-105 transition-transform`}
            >
              <img
                src={story.avatar}
                alt={story.username}
                className="w-full h-full rounded-full border-2 border-white dark:border-gray-900"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/56x56/CCCCCC/FFFFFF?text=Err';
                }}
              />
            </div>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate w-16">
              {story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryReel;