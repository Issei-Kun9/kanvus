import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      typescript: true,
    });
  }
  return _stripe;
}

export { getStripe as stripe };

export const PLANS = {
  FREE: {
    name: "Free",
    description: "For personal use",
    price: 0,
    features: [
      "3 workspaces",
      "5 projects per workspace",
      "Basic task management",
      "AI suggestions (10/day)",
    ],
    limits: {
      workspaces: 3,
      projects: 5,
      aiRequests: 10,
    },
  },
  PRO: {
    name: "Pro",
    description: "For growing teams",
    price: 12,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
    features: [
      "Unlimited workspaces",
      "Unlimited projects",
      "Advanced analytics",
      "AI assistant (unlimited)",
      "Priority support",
      "Custom labels & filters",
    ],
    limits: {
      workspaces: Infinity,
      projects: Infinity,
      aiRequests: Infinity,
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;
