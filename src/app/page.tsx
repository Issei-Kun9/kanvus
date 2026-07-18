import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layout,
  Users,
  BarChart3,
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
    <div className="flex flex-col min-h-screen bg-[#13111c]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-[#6c5ce7]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#fdcb6e]/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* Nav */}
      <header className="relative border-b border-white/[0.06] glass-subtle sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] shadow-lg shadow-[#6c5ce7]/25">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Kanvus</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05]">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-lg shadow-[#6c5ce7]/25">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center py-28 px-4 text-center">
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-[#a29bfe] mb-6">
            <Sparkles className="h-4 w-4" />
            Kanban + AI Task Management
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-[1.1] text-white">
            Organize your projects with{" "}
            <span className="gradient-text">
              Kanban boards
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mb-10 leading-relaxed">
            Kanvus is a project management tool with drag-and-drop boards,
            team workspaces, and an AI assistant to help prioritize tasks.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#5b4bd5] hover:to-[#9289f2] border-0 shadow-xl shadow-[#6c5ce7]/30 px-8">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-xl border-white/10 text-white/60 hover:bg-white/[0.05] px-8">
                Log in
              </Button>
            </Link>
          </div>
        </div>

        {/* App Preview */}
        <div className="relative mt-20 w-full max-w-5xl">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#6c5ce7]/10 via-[#a29bfe]/10 to-[#fdcb6e]/5 rounded-3xl blur-xl" />
          <div className="relative glass-strong rounded-2xl p-2">
            <div className="rounded-xl bg-[#13111c]/80 aspect-video flex items-center justify-center overflow-hidden">
              <div className="w-full p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe]" />
                  <div className="h-4 w-24 bg-white/5 rounded" />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 rounded-xl glass-card" />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 h-40 rounded-xl glass-card" />
                  <div className="h-40 rounded-xl glass-card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-28 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              What Kanvus does
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Boards, tasks, analytics, and billing — all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-[#6c5ce7]/5 transition-all duration-300"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-4">
        <div className="container mx-auto">
          <div className="relative glass-strong rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-[#6c5ce7]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-[#fdcb6e]/5 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-4xl font-bold mb-4 text-white">Give it a try</h2>
              <p className="text-white/40 mb-10 max-w-md mx-auto text-lg">
                Free to start. No credit card needed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <ul className="text-left space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-white/60">
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
      <footer className="relative border-t border-white/[0.06] py-8 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm text-white/30">
          <p>&copy; 2026 Kanvus. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
