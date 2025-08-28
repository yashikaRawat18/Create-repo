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
    username: 'nature_lover',
    avatar: 'https://placehold.co/512x512/4CAF50/FFFFFF?text=N',
    description:
      "Spent the weekend hiking up to this incredible spot. The air was so fresh and the silence was magical. It's moments like these that remind you of the beauty of the world. Highly recommend this trail for anyone looking for a peaceful escape.",
    timestamp: '2 hours ago',
    postUrl: '#',
    likes: 234,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    username: 'city_explorer',
    avatar: 'https://placehold.co/512x512/00BCD4/FFFFFF?text=C',
    description:
      'There is a unique energy to the city after dark. The way the lights reflect off the streets after a little rain is just mesmerizing. This was taken from the rooftop of our building, overlooking the downtown area. #cityscape #urban #nightlife',
    timestamp: '5 hours ago',
    postUrl: '#',
    likes: 156,
    comments: 8,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 3,
    username: 'art_creator',
    avatar: 'https://placehold.co/512x512/E91E63/FFFFFF?text=A',
    description:
      'Just finished this new digital painting, spent about 20 hours on it. I tried a new technique with the brushes to get this texture. Let me know what you think!',
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