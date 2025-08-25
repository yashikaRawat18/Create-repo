'use client';

import React, { useState } from 'react';
import { Home, Search, Send, PlusSquare, Compass, Heart } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo and navigation links */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text cursor-pointer hover:scale-105 transition-transform">
          Create
        </h1>

        <form onSubmit={handleSearch} className="hidden sm:block relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Search size={18} />
          </button>
        </form>

        <nav className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`cursor-pointer hover:scale-110 transition-transform ${activeTab === 'home' ? 'text-green-500' : 'text-gray-800 dark:text-white'}`}
          >
            <Home size={26} />
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`cursor-pointer hover:scale-110 transition-transform ${activeTab === 'messages' ? 'text-green-500' : 'text-gray-800 dark:text-white'}`}
          >
            <Send size={26} />
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`cursor-pointer hover:scale-110 transition-transform ${activeTab === 'create' ? 'text-green-500' : 'text-gray-800 dark:text-white'}`}
          >
            <PlusSquare size={26} />
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`cursor-pointer hover:scale-110 transition-transform ${activeTab === 'explore' ? 'text-green-500' : 'text-gray-800 dark:text-white'}`}
          >
            <Compass size={26} />
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`cursor-pointer hover:scale-110 transition-transform ${activeTab === 'activity' ? 'text-green-500' : 'text-gray-800 dark:text-white'}`}
          >
            <Heart size={26} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-0.5 cursor-pointer hover:scale-110 transition-transform">
            <img
              src="https://placehold.co/32x32/FFFFFF/000000?text=U"
              alt="User Avatar"
              className="w-full h-full rounded-full border-2 border-amber-50 dark:border-gray-900"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;