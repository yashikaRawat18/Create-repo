"use client";

import { useEffect, useState } from "react";

interface ProfileHeaderProps {
  user?: { 
    username?: string; 
    avatar?: string; 
    bio?: string; 
    website?: string;
    posts?: any[];
    followers?: { id: string; username: string }[];
    following?: { id: string; username: string }[];
  };
  onShowFollowers?: () => void;
  onShowFollowing?: () => void;
}

export default function ProfileHeader({ user, onShowFollowers, onShowFollowing }: ProfileHeaderProps) {
  const [username, setUsername] = useState<string | null>(user?.username || null);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [bio, setBio] = useState<string | null>(user?.bio || null);
  const [website, setWebsite] = useState<string | null>(user?.website || null);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username || parsedUser.email);
        setAvatar(parsedUser.avatar || null);
        setBio(parsedUser.bio || null);
        setWebsite(parsedUser.website || null);
      }
    } else {
      setUsername(user.username || null);
      setAvatar(user.avatar || null);
      setBio(user.bio || null);
      setWebsite(user.website || null);
    }
  }, [user]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
      <div className="flex items-center space-x-3">
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-black">
            {username ? username[0].toUpperCase() : "U"}
          </div>
        )}
        <div>
          <p className="font-semibold text-lg">{username || "Guest"}</p>
          {bio && <p className="text-sm text-gray-500">{bio}</p>}
          {website && <a href={website} className="text-xs text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{website}</a>}
        </div>
      </div>
      <div className="flex gap-6 mt-4 sm:mt-0 sm:ml-8">
        <div className="text-center">
          <span className="font-bold">{user?.posts?.length ?? 0}</span>
          <div className="text-xs text-gray-400">posts</div>
        </div>
        <button className="text-center focus:outline-none" onClick={onShowFollowers}>
          <span className="font-bold">{user?.followers?.length ?? 0}</span>
          <div className="text-xs text-gray-400">followers</div>
        </button>
        <button className="text-center focus:outline-none" onClick={onShowFollowing}>
          <span className="font-bold">{user?.following?.length ?? 0}</span>
          <div className="text-xs text-gray-400">following</div>
        </button>
      </div>
    </div>
  );
}
