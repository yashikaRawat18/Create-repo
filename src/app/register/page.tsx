"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", username: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

  const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      alert("Registration successful! Redirecting to login...");
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}



        <input className="w-full p-2 border rounded mb-2 text-black" placeholder="Full Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="w-full p-2 border rounded mb-2 text-black" placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="w-full p-2 border rounded mb-2 text-black" placeholder="Username"
          value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

        <input className="w-full p-2 border rounded mb-2 text-black" placeholder="Phone"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

        <input type="password" className="w-full p-2 border rounded mb-2 text-black" placeholder="Password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <input type="password" className="w-full p-2 border rounded mb-4 text-black" placeholder="Confirm Password"
          value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
}
