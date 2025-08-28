// app/types.ts

export interface Post {
  id: number;
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
}

export interface UserProfile {
  username: string;
  avatar: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  website: string;
}