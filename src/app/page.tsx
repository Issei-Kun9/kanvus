import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "Kanban Boards",
      description:
        "Drag-and-drop task management with customizable workflows.",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description:
        "Get smart task prioritization and project insights powered by AI.",
    },
    {
      icon: Shield,
      title: "Team Collaboration",
      description:
        "Workspaces, roles, and real-time updates for your entire team.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track progress with beautiful charts and actionable metrics.",
    },
  ];

  const benefits = [
    "Unlimited workspaces and projects",
    "AI-powered task prioritization",
    "Real-time team collaboration",
    "Advanced analytics and reporting",
    "Custom labels and filters",
    "Stripe integration for billing",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              F
            </div>
            <span className="text-lg font-bold">Kanvus</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Sparkles className="h-4 w-4" />
          AI-Powered Project Management
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6">
          Ship projects faster with{" "}
          <span className="text-primary">smart task management</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Kanvus combines beautiful Kanban boards with AI-powered insights
          to help teams prioritize work, track progress, and deliver results.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Log in
            </Button>
          </Link>
        </div>

        {/* App Preview */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl border bg-card p-2 shadow-2xl">
          <div className="rounded-xl bg-muted/50 aspect-video flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything you need to ship
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Powerful features designed for modern teams that move fast.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join teams using Kanvus to ship better products, faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <ul className="text-left space-y-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Create your free account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2026 Kanvus. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
