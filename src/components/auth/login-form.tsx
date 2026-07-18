"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Mail, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center gradient-mesh">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-[#7C3AED]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] gradient-primary shadow-2xl shadow-[#7C3AED]/30 mx-auto mb-8 animate-float">
            <span className="text-white font-bold text-4xl">K</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Kanvus</h1>
          <p className="text-white/50 text-xl mb-12">Project management that actually works.</p>
          <div className="flex items-center justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#06B6D4]" />
              AI-powered
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              Real-time
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#7C3AED]" />
              Secure
            </div>
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
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Welcome back</h2>
            <p className="text-white/40">Sign in to your Kanvus account</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="rounded-[14px] border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 h-12 hover-scale"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              >
                <Code className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="rounded-[14px] border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 h-12 hover-scale"
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
                <span className="bg-[#09090B] px-4 text-white/30 tracking-wider">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-[14px] bg-[#EF4444]/10 border border-[#EF4444]/20 p-4 text-sm text-[#EF4444] animate-shake">
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                  <span className="text-sm text-white/40">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full rounded-[14px] gradient-primary btn-glow border-0 shadow-lg shadow-[#7C3AED]/20 h-12"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-white/30 pt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
  );
}
