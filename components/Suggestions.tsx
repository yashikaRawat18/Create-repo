"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";


const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let excludeId = "";
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username);
        setCurrentUserId(parsedUser.id);
        excludeId = parsedUser.id;
      } catch (err) {
        console.error("Error parsing stored user", err);
      }
    }
    fetch(`/api/users?excludeId=${excludeId}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data.users || []);
      });
  }, []);

  const handleFollow = async (userId: string) => {
    if (!currentUserId) return;
    const res = await fetch("/api/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUserId, followingId: userId }),
    });
    if (res.ok) {
      setSuggestions(
        suggestions.map((user) =>
          user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
        )
      );
      // Notify profile page to refresh followers/following
      window.dispatchEvent(new Event("refresh-profile-follow"));
    }
  };

  const handleDismiss = (userId: string) => {
    setSuggestions(suggestions.filter((user) => user.id !== userId));
  };

  return (
    <div className="hidden lg:block w-80 ml-8">
      <div className="fixed p-4 max-h-screen overflow-y-auto">
        {/* ✅ Current logged in user block */}
        <div className="flex items-center mb-5 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-0.5">
            <div className="w-full h-full flex items-center justify-center bg-white rounded-full text-lg font-bold text-black">
              {username ? username[0].toUpperCase() : "U"}
            </div>
          </div>
          <div className="ml-4">
            <p className="font-semibold text-sm text-gray-800 dark:text-white">
              <Link href="/profilepage">{username || "Guest"}</Link>
            </p>
            <p className="text-gray-500 text-sm">Welcome back</p>
          </div>
          {/* <button className="ml-auto text-blue-500 font-semibold text-xs hover:text-blue-600 transition-colors">
            Go on Profile
          </button> */}
        </div>

        {/* Suggestions */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-gray-500 text-sm">
            Suggestions For You
          </p>
          <button className="text-xs font-semibold text-gray-800 dark:text-white hover:text-green-500 transition-colors">
            See All
          </button>
        </div>

        <div>
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="flex items-center my-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 flex-grow">
                <p className="font-semibold text-sm text-gray-800 dark:text-white group-hover:text-green-500 transition-colors cursor-pointer">
                  {user.username}
                </p>
                {/* Optionally show user bio or nothing */}
                {user.bio && <p className="text-gray-400 text-xs">{user.bio}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`font-semibold text-xs px-3 py-1 rounded-md transition-colors ${
                    user.isFollowing
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>
                <button
                  onClick={() => handleDismiss(user.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-300 dark:text-gray-600 mt-8 text-center">
          © 2024 CREATE FROM GEMINI
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
