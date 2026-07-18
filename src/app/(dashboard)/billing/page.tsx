"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles, CreditCard, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "",
    description: "For personal use",
    features: [
      "3 workspaces",
      "5 projects per workspace",
      "Basic task management",
      "AI suggestions (10/day)",
      "Community support",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: 12,
    period: "/month",
    description: "For growing teams",
    features: [
      "Unlimited workspaces",
      "Unlimited projects",
      "Advanced analytics",
      "AI assistant (unlimited)",
      "Priority support",
      "Custom labels & filters",
      "Team collaboration",
      "API access",
    ],
    current: false,
    popular: true,
  },
];

export default function BillingPage() {
  const [loading, setLoading] = React.useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Failed to start checkout:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-white/40">
          Your plan and invoices.
        </p>
      </div>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan, i) => (
          <Card
            key={plan.name}
            className={cn(
              "relative overflow-hidden animate-slide-up",
              plan.popular ? "border-[#7C3AED]/50 shadow-lg shadow-[#7C3AED]/10" : "",
              `stagger-${i + 1}`
            )}
          >
            {/* Gradient accent */}
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />
            )}
            
            {plan.popular && (
              <div className="absolute top-4 right-4">
                <Badge className="gradient-primary text-white border-0 rounded-full">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                {plan.current && (
                  <Badge variant="secondary" className="bg-white/[0.06] text-white/50 border-white/[0.08]">
                    Current
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.period && (
                  <span className="text-white/40">{plan.period}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "w-full rounded-[14px] h-12",
                  plan.current
                    ? "border-white/10 text-white/40"
                    : "gradient-primary btn-glow"
                )}
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current || loading}
                onClick={!plan.current ? handleUpgrade : undefined}
              >
                {plan.current ? (
                  "Current Plan"
                ) : loading ? (
                  "Redirecting..."
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Upgrade to {plan.name}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment History */}
      <Card className="animate-slide-up stagger-3">
        <CardHeader>
          <CardTitle className="text-base">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-white/30">
            <CreditCard className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No payment history yet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
