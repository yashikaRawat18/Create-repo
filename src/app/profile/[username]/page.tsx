"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getUser } from "../../../../lib/auth";

export default function AccountPage() {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = getUser();
    if (!loggedInUser) {
      router.push("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Welcome, {user.username}!</h2>
      <p>This is your account page.</p>
    </div>
  );
}
