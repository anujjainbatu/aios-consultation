import type { SiteConfig } from "@/lib/types";

/**
 * Global site configuration. Static values consumed across layout, metadata,
 * and CTA components. The calendlyUrl is a placeholder until the real booking
 * link is provisioned.
 */
export const siteConfig: SiteConfig = {
  name: "Anuj Jain",
  title: "AI Strategy & Implementation Consultant",
  tagline:
    "I help startup founders build AI into their product and ops — from strategy to shipped.",
  description:
    "Anuj Jain is a freelance AI consultant helping international startup founders design, build, and ship AI-powered systems.",
  url: "https://anujjain.dev",
  linkedinUrl: "https://linkedin.com/in/anujjain",
  githubUrl: "https://github.com/anujjain",
  email: "hi@anujjain.dev",
  // Placeholder — replace with the real booking link when available.
  calendlyUrl: "https://calendly.com/anujjain/free-strategy-session",
  ogImage: "/og-default.svg",
};
