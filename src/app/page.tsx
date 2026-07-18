import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layout,
  Users,
  BarChart3,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Layout,
      title: "Kanban Boards",
      description: "Drag-and-drop tasks across customizable workflow stages with real-time updates.",
      gradient: "from-[#00C896] to-[#14B8A6]",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get task prioritization suggestions and project insights powered by GPT-4.",
      gradient: "from-[#7DD3FC] to-[#00C896]",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Workspaces with roles so everyone has the right access and visibility.",
      gradient: "from-[#22C55E] to-[#7DD3FC]",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Charts and metrics to see where things stand at a glance.",
      gradient: "from-[#FBBF24] to-[#EF4444]",
    },
  ];

  const benefits = [
    "Unlimited workspaces and projects",
    "AI-powered task prioritization",
    "Real-time team collaboration",
    "Custom labels and filters",
    "Stripe billing integration",
    "RESTful API access",
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Tasks Managed" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none gradient-mesh" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#00C896]/[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#7DD3FC]/[0.05] rounded-full blur-[150px]" />
      </div>

      {/* Nav */}
      <header className="relative border-b border-white/[0.06] glass-subtle sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-[#00C896]/25">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Kanvus</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="rounded-[14px] text-white/60 hover:text-white hover:bg-white/[0.05]">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-[14px] gradient-primary btn-glow border-0 shadow-lg shadow-[#00C896]/25">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center py-28 px-4 text-center">
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-[#7DD3FC] mb-6 animate-slide-up">
            <Zap className="h-4 w-4" />
            AI-Powered Project Management
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-[1.05] animate-slide-up stagger-1">
            The{" "}
            <span className="gradient-text-ai">
              AI Workspace
            </span>
            <br />
            That Thinks With Your Team
          </h1>
          <p className="text-lg md:text-xl text-white/45 max-w-2xl mb-10 leading-relaxed animate-slide-up stagger-2">
            Kanvus is a project management tool with Kanban boards, team workspaces,
            and an AI assistant that helps prioritize tasks and keep projects on track.
          </p>
          <div className="flex items-center gap-4 justify-center animate-slide-up stagger-3">
            <Link href="/register">
              <Button size="lg" className="gap-2 rounded-[14px] gradient-primary btn-glow border-0 shadow-xl shadow-[#00C896]/30 px-8">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-[14px] border-white/10 text-white/60 hover:bg-white/[0.05] px-8">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* App Preview */}
        <div className="relative mt-20 w-full max-w-5xl animate-slide-up stagger-4">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#00C896]/10 via-[#14B8A6]/10 to-[#7DD3FC]/5 rounded-3xl blur-xl" />
          <div className="relative glass-strong rounded-[24px] p-2 hover-lift">
            <div className="rounded-[22px] bg-[#060606]/80 aspect-video flex items-center justify-center overflow-hidden">
              <div className="w-full p-8">
                {/* Mock dashboard */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl gradient-primary" />
                  <div className="h-4 w-32 bg-white/5 rounded-lg" />
                  <div className="ml-auto flex gap-2">
                    <div className="h-8 w-8 rounded-lg glass-card" />
                    <div className="h-8 w-8 rounded-lg glass-card" />
                    <div className="h-8 w-24 rounded-lg gradient-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 rounded-[22px] glass-card p-4">
                      <div className="h-3 w-16 bg-white/10 rounded mb-2" />
                      <div className="h-6 w-10 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-48 rounded-[22px] glass-card" />
                  <div className="h-48 rounded-[22px] glass-card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center animate-slide-up stagger-${i + 1}`}>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-28 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-[#00C896] mb-4">
              <Sparkles className="h-4 w-4" />
              Features
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">ship faster</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Boards, tasks, analytics, and billing — all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`group glass-card rounded-[22px] p-8 hover-lift border-glow animate-slide-up stagger-${i + 1}`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/45 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="relative py-28 px-4">
        <div className="container mx-auto">
          <div className="relative glass-strong rounded-[24px] p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-[#00C896]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-[#7DD3FC]/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-[#22C55E] mb-6">
                <Shield className="h-4 w-4" />
                Free to Start
              </div>
              <h2 className="text-4xl font-bold mb-4">Give it a try</h2>
              <p className="text-white/40 mb-10 max-w-md mx-auto text-lg">
                Free to start. No credit card needed.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
              <Link href="/register">
                <Button size="lg" className="gap-2 rounded-[14px] gradient-primary btn-glow border-0 shadow-xl shadow-[#00C896]/30 px-10">
                  Create your free account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="font-bold text-white">Kanvus</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed">
                AI-powered project management for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/60">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-white/30 hover:text-white/60 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm text-white/30 hover:text-white/60 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Changelog</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/60">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/60">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Terms</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Security</a></li>
                <li><a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex items-center justify-between text-sm text-white/25">
            <p>&copy; 2026 Kanvus. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
