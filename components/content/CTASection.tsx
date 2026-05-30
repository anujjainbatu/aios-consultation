import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
  buttonLabel?: string;
}

export function CTASection({
  headline = "Ready to build with AI?",
  subtext = "Book a free 1-hour strategy session. No pitch — just clarity on where AI fits your product and ops.",
  buttonLabel = "Book your free 1hr session",
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="bg-surface border border-border rounded-2xl px-8 sm:px-12 py-12 sm:py-16 flex flex-col items-center text-center gap-6 relative overflow-hidden">
        {/* Decorative background accent */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, #3b82f6 0%, transparent 80%)",
          }}
        />

        <h2 className="relative text-3xl sm:text-4xl font-bold text-text-primary max-w-xl leading-tight">
          {headline}
        </h2>
        <p className="relative text-text-secondary max-w-lg leading-relaxed">
          {subtext}
        </p>
        <Link
          href="/book"
          className="relative inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors duration-200 group"
        >
          {buttonLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
