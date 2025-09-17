"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logoutUser } from "../lib/auth";


export default function Header() {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.location.href = "/"; // refresh
  };

  // Minimal header, or return null if you want no header at all
  return null;
}
