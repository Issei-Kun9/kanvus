"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a1625] via-[#1e1a2e] to-[#2d2640] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 h-96 w-96 bg-[#6c5ce7]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 h-96 w-96 bg-[#00b894]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-2xl shadow-[#6c5ce7]/30 mx-auto mb-6">
            <span className="text-white font-bold text-3xl">K</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Kanvus</h1>
          <p className="text-white/50 text-lg">Start managing projects today.</p>
          <div className="mt-12 space-y-4 text-left max-w-xs mx-auto">
            {["Kanban boards", "AI assistant", "Team workspaces"].map((f) => (
              <div key={f} className="flex items-center gap-3 text-white/60">
                <div className="h-6 w-6 rounded-lg bg-[#00b894]/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#00b894]" />
                </div>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#f8f7f4]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-lg shadow-[#6c5ce7]/20">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Kanvus</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create account</h2>
            <p className="text-[#64608b]">Get started with Kanvus for free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-[#e74c3c]/10 border border-[#e74c3c]/20 p-3.5 text-sm text-[#e74c3c]">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1a1625]">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl border-[#e8e5f0] bg-white h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1a1625]">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border-[#e8e5f0] bg-white h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1a1625]">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-[#e8e5f0] bg-white h-11"
                minLength={8}
                required
              />
              <p className="text-xs text-[#64608b]">
                Must be at least 8 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-lg shadow-[#6c5ce7]/20 h-11"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </form>

          <p className="text-center text-sm text-[#64608b] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#6c5ce7] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
