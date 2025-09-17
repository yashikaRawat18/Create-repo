"use client";
import React from "react";

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: { id: string; username: string }[];
}

const UserListModal: React.FC<UserListModalProps> = ({ isOpen, onClose, title, users }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="max-h-60 overflow-y-auto">
          {users.length === 0 ? (
            <div className="text-gray-400 text-center">No users found.</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-black mr-3">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="font-medium text-gray-800">{user.username}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
