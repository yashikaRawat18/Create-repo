import React, { useRef } from "react";

import { getAccounts, switchUser, cleanAccounts } from "../lib/auth";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onSwitchAccount?: () => void;
  onProfileUpdate: (data: { name: string; bio: string; website: string; avatar?: File | null }) => void;
  user: { username: string; bio?: string; website?: string; avatar?: string };
}

import { useEffect, useState } from "react";

export default function SettingsModal({ isOpen, onClose, onLogout, onSwitchAccount, onProfileUpdate, user }: SettingsModalProps) {
  const [accounts, setAccounts] = useState<any[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    if (isOpen) {
      // Fetch valid user IDs from backend
      fetch("/api/profile/all")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.users)) {
            cleanAccounts(data.users.map((u: any) => u.id));
            setAccounts(getAccounts());
          } else {
            setAccounts(getAccounts());
          }
        })
        .catch(() => setAccounts(getAccounts()));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onProfileUpdate({
              name: nameRef.current?.value || user.username,
              bio: bioRef.current?.value || "",
              website: websiteRef.current?.value || "",
              avatar: avatarRef.current?.files?.[0] || null,
            });
            onClose();
          }}
        >
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input ref={nameRef} defaultValue={user.username} className="w-full border rounded p-2 text-black" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <input ref={bioRef} defaultValue={user.bio || ""} className="w-full border rounded p-2 text-black" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Website</label>
            <input ref={websiteRef} defaultValue={user.website || ""} className="w-full border rounded p-2 text-black" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Profile Photo</label>
            <input ref={avatarRef} type="file" accept="image/*" className="w-full" />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={onClose}>Cancel</button>
          </div>
        </form>
        <hr className="my-4" />
        <button className="w-full text-left text-red-500 hover:underline mb-2" onClick={onLogout}>Logout</button>
        {accounts.length > 1 && (
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">Switch Account</div>
            {accounts.map((acc: any, idx: number) => (
              <button
                key={acc.id || idx}
                className="w-full text-left text-blue-500 hover:underline block"
                onClick={() => switchUser(acc.id)}
              >
                {acc.username}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
