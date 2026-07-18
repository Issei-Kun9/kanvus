"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#13111c]">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-[#6c5ce7]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-[#fdcb6e]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-2xl shadow-[#6c5ce7]/30 mx-auto mb-6">
            <span className="text-white font-bold text-3xl">K</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Kanvus</h1>
          <p className="text-white/50 text-lg">Project management that actually works.</p>
          <div className="mt-12 flex items-center justify-center gap-6 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#fdcb6e]" />
              AI-powered
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#00b894]" />
              Real-time
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 h-96 w-96 bg-[#6c5ce7]/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-lg shadow-[#6c5ce7]/20">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Kanvus</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white">Welcome back</h2>
            <p className="text-white/40">Sign in to your Kanvus account</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 h-11"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              >
                <Code className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 h-11"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <Mail className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#13111c] px-3 text-white/30">or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl bg-[#e74c3c]/10 border border-[#e74c3c]/20 p-3.5 text-sm text-[#ff6b6b]">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl glass-input border-white/10 h-11 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl glass-input border-white/10 h-11 text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-lg shadow-[#6c5ce7]/20 h-11"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </form>

            <p className="text-center text-sm text-white/30 pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#a29bfe] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
