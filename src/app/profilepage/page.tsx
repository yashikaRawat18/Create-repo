// src/app/profilepage/page.tsx
"use client";

import ProfileHeader from "../../../components/profileheader";
import UserListModal from "../../../components/UserListModal";
import ProfilePost from "../../../components/ProfilePost";
import SettingsModal from "../../../components/SettingsModal";
import { UserProfile, ProfilePost as ProfilePostType } from "../types";




import { useEffect, useState, useRef } from "react";

export default function ProfilePage() {
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  // Mock saved posts
  const [savedPosts] = useState<ProfilePostType[]>([
    {
      id: 's1',
      imageUrl: 'https://via.placeholder.com/300/00ff00',
      description: 'Saved post example',
      likes: 0,
      comments: 0,
    },
  ]);

  // Add Post Modal state
  const [addPostOpen, setAddPostOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [newPostCaption, setNewPostCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Helper to fetch and set user profile
  const fetchUserProfile = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const parsedUser = JSON.parse(storedUser);
    const username = parsedUser.username;
    if (!username) return;
    fetch(`/api/profile/get?username=${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserProfile({
            id: data.user.id,
            username: data.user.username,
            avatar: data.user.avatar || `https://ui-avatars.com/api/?name=${data.user.username}`,
            bio: data.user.bio || "",
            website: data.user.website || "",
            posts: data.user.posts || [],
            followers: data.user.followedBy ? data.user.followedBy.map((f: any) => f.follower) : [],
            following: data.user.following ? data.user.following.map((f: any) => f.following) : [],
          });
        }
      });
  };

  useEffect(() => {
    fetchUserProfile();
    // Listen for follow/unfollow event to refresh profile
    const handler = () => {
      fetchUserProfile();
    };
    window.addEventListener('refresh-profile-follow', handler);
    return () => {
      window.removeEventListener('refresh-profile-follow', handler);
    };
  }, []);

  const handlePostClick = (post: ProfilePostType) => {
    alert(`Clicked on post: ${post.description}`);
  };

  if (!userProfile) {
    return <div className="max-w-2xl mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-2">
        <ProfileHeader
          user={userProfile}
          onShowFollowers={() => setFollowersOpen(true)}
          onShowFollowing={() => setFollowingOpen(true)}
        />
      <UserListModal
        isOpen={followersOpen}
        onClose={() => setFollowersOpen(false)}
        title="Followers"
        users={userProfile.followers || []}
      />
      <UserListModal
        isOpen={followingOpen}
        onClose={() => setFollowingOpen(false)}
        title="Following"
        users={userProfile.following || []}
      />
        <button
          className="ml-2 p-2 rounded-full hover:bg-gray-200"
          title="Settings"
          onClick={() => setSettingsOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.01c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.01 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.01 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.01c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.01c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.01-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.01-2.572c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.01z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="flex justify-around border-b border-gray-700 mt-4 mb-2">
        <button
          className={`flex-1 py-2 ${activeTab === 'posts' ? 'border-b-2 border-white font-bold' : 'text-gray-400'}`}
          onClick={() => setActiveTab('posts')}
        >
          <svg className="inline w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 'saved' ? 'border-b-2 border-white font-bold' : 'text-gray-400'}`}
          onClick={() => setActiveTab('saved')}
        >
          <svg className="inline w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 5v14l7-7 7 7V5z"/></svg>
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 'tagged' ? 'border-b-2 border-white font-bold' : 'text-gray-400'}`}
          onClick={() => setActiveTab('tagged')}
        >
          <svg className="inline w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z"/></svg>
        </button>
      </div>
      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'posts' && (
          <>
            {/* Add Post Button */}
            <div className="flex justify-end mb-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setAddPostOpen(true)}
              >
                <span className="text-xl">+</span> Add Post
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {userProfile.posts.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500 py-8">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    <p>No posts yet</p>
                  </div>
                </div>
              ) : (
                userProfile.posts.map((post) => (
                  <ProfilePost
                    key={post.id}
                    post={post}
                    onPostClick={handlePostClick}
                  />
                ))
              )}
            </div>
            {/* Add Post Modal */}
            {addPostOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setAddPostOpen(false)}>&times;</button>
                  <h2 className="text-xl font-bold mb-4">Add New Post</h2>
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      if (!newPostImage || !newPostCaption) return;
                      console.log('[Add Post] newPostImage:', newPostImage);
                      setIsPosting(true);
                      const storedUser = localStorage.getItem("user");
                      if (!storedUser) {
                        alert("User not found in localStorage. Please log in again.");
                        setIsPosting(false);
                        return;
                      }
                      const parsedUser = JSON.parse(storedUser);
                      console.log("[Add Post] parsedUser:", parsedUser);
                      if (!parsedUser.id) {
                        alert("User ID missing. Please log out and log in again to refresh your session.");
                        setIsPosting(false);
                        return;
                      }
                      const formData = new FormData();
                      formData.append("userId", parsedUser.id);
                      formData.append("description", newPostCaption);
                      formData.append("image", newPostImage);
                      const res = await fetch("/api/post/create", {
                        method: "POST",
                        body: formData,
                      });
                      setIsPosting(false);
                      setAddPostOpen(false);
                      setNewPostImage(null);
                      setNewPostCaption("");
                      // Refresh posts list
                      fetch(`/api/profile/get?username=${encodeURIComponent(parsedUser.username)}`)
                        .then(res => res.json())
                        .then(data => {
                          if (data.user) {
                            setUserProfile(prev => prev ? {
                              ...prev,
                              posts: data.user.posts || [],
                            } : prev);
                          }
                        });
                    }}
                  >
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Image</label>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setNewPostImage(file);
                          } else {
                            setNewPostImage(null);
                          }
                        }}
                      />
                      {newPostImage && (
                        <img src={URL.createObjectURL(newPostImage)} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Caption</label>
                      <input
                        type="text"
                        value={newPostCaption}
                        onChange={e => setNewPostCaption(e.target.value)}
                        className="w-full border rounded p-2 text-black"
                        placeholder="Write a caption..."
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={isPosting}>{isPosting ? "Posting..." : "Post"}</button>
                      <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setAddPostOpen(false)} disabled={isPosting}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-3 gap-2">
            {savedPosts.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-8">
                <div className="flex flex-col items-center">
                  <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 5v14l7-7 7 7V5z"/></svg>
                  <p>No saved posts</p>
                </div>
              </div>
            ) : (
              savedPosts.map((post) => (
                <ProfilePost
                  key={post.id}
                  post={post}
                  onPostClick={handlePostClick}
                />
              ))
            )}
          </div>
        )}
        {activeTab === 'tagged' && (
          <div className="text-center text-gray-500 py-8">
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z"/></svg>
              <p>No tagged posts</p>
            </div>
          </div>
        )}
      </div>
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLogout={() => { localStorage.removeItem('user'); window.location.href = '/login'; }}
        onSwitchAccount={() => { localStorage.removeItem('user'); window.location.href = '/login'; }}
        onProfileUpdate={async (data) => {
          if (!userProfile || !userProfile.id) {
            alert('User not loaded. Please refresh and try again.');
            return;
          }
          const formData = new FormData();
          formData.append('id', String(userProfile.id));
          formData.append('name', data.name);
          formData.append('bio', data.bio);
          formData.append('website', data.website);
          formData.append('currentAvatar', userProfile.avatar || '');
          if (data.avatar) formData.append('avatar', data.avatar);
          const res = await fetch('/api/profile/update', {
            method: 'POST',
            body: formData,
          });
          const result = await res.json();
          if (result.success) {
            setUserProfile((prev) => prev ? {
              ...prev,
              username: data.name,
              bio: data.bio,
              avatar: result.user.avatar,
              website: data.website,
            } : prev);
            alert('Profile updated!');
          } else {
            alert(result.error || 'Profile update failed');
          }
        }}
        user={{
          username: userProfile?.username || '',
          bio: userProfile?.bio || '',
          website: userProfile?.website || '',
          avatar: userProfile?.avatar || '',
        }}
      />
    </div>
  );
}
