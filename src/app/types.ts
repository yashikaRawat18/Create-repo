
export interface FeedPost {
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
}
// src/types/auth.ts

export interface RegisterInput {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    username: string;
    phone: string;
  };
}

// src/types.ts
export interface Post {
  id: string;
  image: string;
  caption: string;
  createdAt: string;
}
// src/types.ts
// Profile post type
export interface ProfilePost {
  id: string;
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
}

// User Profile type
export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  website?: string;
  posts: ProfilePost[];
  followers?: { id: string; username: string }[];
  following?: { id: string; username: string }[];
}
 



 
