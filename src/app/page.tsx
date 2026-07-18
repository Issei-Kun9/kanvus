import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Layout,
  Users,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Layout,
      title: "Kanban Boards",
      description: "Drag-and-drop tasks across customizable workflow stages.",
      color: "from-[#6c5ce7] to-[#a29bfe]",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get task prioritization suggestions and project insights.",
      color: "from-[#fdcb6e] to-[#ffeaa7]",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Workspaces with roles so everyone has the right access.",
      color: "from-[#00b894] to-[#55efc4]",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Charts and metrics to see where things stand.",
      color: "from-[#e74c3c] to-[#fd79a8]",
    },
  ];

  const benefits = [
    "Unlimited workspaces and projects",
    "AI-powered task prioritization",
    "Real-time team collaboration",
    "Custom labels and filters",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f7f4]">
      {/* Nav */}
      <header className="border-b border-[#e8e5f0]/60 bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-lg shadow-[#6c5ce7]/20">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Kanvus</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="rounded-xl">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-lg shadow-[#6c5ce7]/20">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center py-28 px-4 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 h-72 w-72 bg-[#6c5ce7]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-72 w-72 bg-[#fdcb6e]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#6c5ce7]/10 px-4 py-1.5 text-sm font-medium text-[#6c5ce7] mb-6 border border-[#6c5ce7]/20">
            <Sparkles className="h-4 w-4" />
            Kanban + AI Task Management
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-[1.1]">
            Organize your projects with{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fdcb6e] bg-clip-text text-transparent">
              Kanban boards
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#64608b] max-w-2xl mb-10 leading-relaxed">
            Kanvus is a project management tool with drag-and-drop boards,
            team workspaces, and an AI assistant to help prioritize tasks.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-xl shadow-[#6c5ce7]/25 px-8">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-xl border-[#e8e5f0] px-8">
                Log in
              </Button>
            </Link>
          </div>
        </div>

        {/* App Preview */}
        <div className="relative mt-20 w-full max-w-5xl">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#6c5ce7]/20 via-[#a29bfe]/20 to-[#fdcb6e]/20 rounded-3xl blur-xl" />
          <div className="relative rounded-2xl border border-[#e8e5f0]/80 bg-white p-2 shadow-2xl shadow-[#6c5ce7]/10">
            <div className="rounded-xl bg-gradient-to-br from-[#f8f7f4] to-[#f0eeff] aspect-video flex items-center justify-center overflow-hidden">
              {/* Mock dashboard preview */}
              <div className="w-full p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe]" />
                  <div className="h-4 w-24 bg-[#e8e5f0] rounded" />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 rounded-xl bg-white border border-[#e8e5f0]/50 shadow-sm" />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 h-40 rounded-xl bg-white border border-[#e8e5f0]/50 shadow-sm" />
                  <div className="h-40 rounded-xl bg-white border border-[#e8e5f0]/50 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Kanvus does
            </h2>
            <p className="text-[#64608b] text-lg max-w-xl mx-auto">
              Boards, tasks, analytics, and billing — all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[#e8e5f0]/50 bg-[#f8f7f4] p-6 hover:bg-white hover:shadow-xl hover:shadow-[#6c5ce7]/5 transition-all duration-300 hover:border-[#e8e5f0]"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[#64608b] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1a1625] via-[#1e1a2e] to-[#2d2640] p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 h-64 w-64 bg-[#6c5ce7]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-[#fdcb6e]/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-4xl font-bold mb-4 text-white">Give it a try</h2>
              <p className="text-white/60 mb-10 max-w-md mx-auto text-lg">
                Free to start. No credit card needed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <ul className="text-left space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-[#00b894] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/register">
                <Button size="lg" className="gap-2 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-xl shadow-[#6c5ce7]/30 px-10">
                  Create your free account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e5f0]/60 py-8 px-4 bg-white">
        <div className="container mx-auto flex items-center justify-between text-sm text-[#64608b]">
          <p>&copy; 2026 Kanvus. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#1a1625] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#1a1625] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
