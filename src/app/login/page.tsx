"use client";
import { useState } from "react";
import { setUser } from "../../../lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      // Store the correct id and username from the API response
      setUser({ id: data.id, username: data.username });
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}


        <input className="w-full p-2 border rounded mb-2 text-black" placeholder="Username"
          value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

        <input type="password" className="w-full p-2 border rounded mb-4 text-black" placeholder="Password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
}
