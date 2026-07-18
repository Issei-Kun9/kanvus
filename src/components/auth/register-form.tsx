"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const passwordStrength = React.useMemo(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }, [password]);

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
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center gradient-mesh">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 h-96 w-96 bg-[#7C3AED]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 h-96 w-96 bg-[#10B981]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] gradient-primary shadow-2xl shadow-[#7C3AED]/30 mx-auto mb-8 animate-float">
            <span className="text-white font-bold text-4xl">K</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Kanvus</h1>
          <p className="text-white/50 text-xl mb-12">Start managing projects today.</p>
          <div className="space-y-4 text-left max-w-xs mx-auto">
            {["Kanban boards", "AI assistant", "Team workspaces"].map((f) => (
              <div key={f} className="flex items-center gap-3 text-white/60">
                <div className="h-6 w-6 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                </div>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 h-96 w-96 bg-[#7C3AED]/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-md relative z-10 animate-slide-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] gradient-primary shadow-lg shadow-[#7C3AED]/25">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Kanvus</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Create account</h2>
            <p className="text-white/40">Get started with Kanvus for free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-[14px] bg-[#EF4444]/10 border border-[#EF4444]/20 p-4 text-sm text-[#EF4444] animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-[16px] glass-input h-12 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-[16px] glass-input h-12 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-[16px] glass-input h-12 text-white pr-12"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password strength */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= passwordStrength
                          ? passwordStrength <= 1
                            ? "bg-[#EF4444]"
                            : passwordStrength <= 2
                            ? "bg-[#F59E0B]"
                            : passwordStrength <= 3
                            ? "bg-[#10B981]"
                            : "bg-[#06B6D4]"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
              <p className="text-xs text-white/25">
                Must be at least 8 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full rounded-[14px] gradient-primary btn-glow border-0 shadow-lg shadow-[#7C3AED]/20 h-12"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
