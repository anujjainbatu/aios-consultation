import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";

export const metadata: Metadata = {
  title: "Book a Free Session",
  description:
    "Book a free 1-hour AI strategy session with Anuj Jain. Audit your current stack, map quick wins, and get a clear roadmap — no pitch.",
};

const sessionPoints = [
  {
    heading: "AI Stack Audit",
    description:
      "We map your current product and ops to identify where AI creates compounding leverage — and where it doesn't.",
  },
  {
    heading: "Sequenced Roadmap",
    description:
      "Walk away with a prioritized list of AI bets, ordered by impact and feasibility given your team's current state.",
  },
  {
    heading: "Open Q&A",
    description:
      "Bring your specific questions — build vs buy, team readiness, model choice, cost, trust. We go deep on what's blocking you.",
  },
];

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        {/* Left: copy — shown second on mobile, first on desktop */}
        <div className="order-2 lg:order-1 flex flex-col gap-8">
          <div>
            <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
              Free strategy session
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight tracking-tight mb-4">
              Let&apos;s figure out where AI fits your product.
            </h1>
            <p className="text-text-secondary leading-relaxed text-lg">
              A focused 1-hour call — no pitch, no fluff. Just clarity on
              what to build, what to skip, and what to do first.
            </p>
          </div>

          <ul className="flex flex-col gap-5" aria-label="What the session covers">
            {sessionPoints.map(({ heading, description }) => (
              <li key={heading} className="flex items-start gap-4">
                <CheckCircle
                  className="w-5 h-5 text-accent mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-text-primary mb-1">{heading}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-surface border border-border rounded-xl p-5">
            <p className="text-sm text-text-secondary leading-relaxed">
              <span className="font-medium text-text-primary">Who this is for: </span>
              Founders at pre-seed through Series B evaluating AI for their
              product or internal ops — and want a straight answer on what to
              build, buy, or skip.
            </p>
          </div>
        </div>

        {/* Right: lead form — shown first on mobile, second on desktop */}
        <div className="order-1 lg:order-2">
          <LeadForm />
        </div>

      </div>
    </div>
  );
}
