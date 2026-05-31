import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen, Briefcase } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "You're booked — Anuj Jain",
  description: "Your free AI strategy session is confirmed. Check your inbox for the Google Meet link.",
  robots: { index: false }, // don't index the thank-you page
};

const nextSteps = [
  {
    step: "01",
    heading: "Check your inbox",
    body: "A confirmation email with your Google Meet link is on its way. Check spam if you don't see it in a few minutes.",
  },
  {
    step: "02",
    heading: "Accept the calendar invite",
    body: "A Google Calendar invite was sent to your email. Accept it and the Meet link will live right in your calendar.",
  },
  {
    step: "03",
    heading: "Show up, no prep needed",
    body: "No decks, no homework. Just your context and curiosity. I'll handle the structure.",
  },
];

const exploreLinks = [
  {
    label: "See case studies",
    href: "/work",
    icon: Briefcase,
    description: "How I've shipped AI features for founders like you.",
  },
  {
    label: "Read the blog",
    href: "/writing",
    icon: BookOpen,
    description: "Thinking on AI strategy, tooling, and building fast.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* Hero block */}
        <div className="text-center mb-16">
          {/* Animated check circle */}
          <div className="flex justify-center mb-8">
            <div
              className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
              style={{ boxShadow: "0 0 40px rgba(59,130,246,0.20)" }}
            >
              <Calendar className="w-9 h-9 text-accent" aria-hidden="true" />
            </div>
          </div>

          <span className="text-xs font-medium text-accent uppercase tracking-widest mb-4 block">
            Request received
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-5">
            You&apos;re booked.{" "}
            <span className="bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
              See you then.
            </span>
          </h1>

          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
            Your session is confirmed. Check your inbox for the{" "}
            <span className="text-text-primary font-medium">Google Meet link</span>{" "}
            and calendar invite — no pitch, just a real conversation.
          </p>
        </div>

        {/* Next steps */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-6">
            What happens next
          </h2>
          <ol className="flex flex-col gap-6">
            {nextSteps.map(({ step, heading, body }) => (
              <li key={step} className="flex gap-5 items-start">
                <span className="text-xs font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent shrink-0 mt-0.5 w-6">
                  {step}
                </span>
                <div>
                  <p className="font-semibold text-text-primary mb-1">{heading}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Explore while you wait */}
        <div className="mb-10">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-widest mb-4 text-center">
            While you wait
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exploreLinks.map(({ label, href, icon: Icon, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 bg-surface border border-border hover:border-accent/30 rounded-xl p-5 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary group-hover:text-accent transition-colors duration-150 text-sm mb-0.5 inline-flex items-center gap-1">
                    {label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" aria-hidden="true" />
                  </p>
                  <p className="text-text-secondary text-xs leading-relaxed">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* LinkedIn + home */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline underline-offset-2 font-medium"
          >
            Connect on LinkedIn →
          </a>
          <span className="hidden sm:block text-border">|</span>
          <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors duration-150">
            Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
