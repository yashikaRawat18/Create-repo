"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExploreUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let excludeId = "";
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCurrentUserId(parsed.id);
      excludeId = parsed.id;
    }
    fetch(`/api/users?excludeId=${excludeId}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading users...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Users</h1>
      <ul className="space-y-4">
        {users.map((user: any) => (
          <li key={user.id} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded shadow">
            <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-semibold">{user.username}</div>
              {user.bio && <div className="text-xs text-gray-500">{user.bio}</div>}
            </div>
            <Link href={`/profile/${user.username}`} className="text-blue-600 hover:underline text-sm">View</Link>
            {/* TODO: Add Follow button here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
