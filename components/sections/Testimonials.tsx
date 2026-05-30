"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Anuj mapped our AI opportunity in one session and shipped our first feature in 2 weeks.",
    author: "Founder",
    company: "Series A SaaS",
  },
  {
    quote:
      "We saved $80k in hiring costs by building with Anuj instead of a full ML team.",
    author: "CEO",
    company: "Pre-seed FinTech",
  },
  {
    quote:
      "The RAG pipeline Anuj built cut our support tickets by 60% in 30 days.",
    author: "Co-founder",
    company: "B2B SaaS",
  },
  {
    quote:
      "Not just strategy — he actually writes the code. That's rare in AI consulting.",
    author: "Founder",
    company: "YC W24",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollRight = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 320;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft + scrollAmount >= maxScroll - 1) {
      el.scrollLeft = 0;
    } else {
      el.scrollLeft += scrollAmount;
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(scrollRight, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, scrollRight]);

  return (
    <section className="py-16 lg:py-24 bg-surface overflow-hidden">
      {/* Header — stays in padded container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-12">
        <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
          Social proof
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
          Founders don&apos;t just talk about it.
        </h2>
      </div>

      {/* Carousel — full-width so it bleeds to the edge on mobile */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-4 sm:pl-6 lg:pl-16 pr-4 sm:pr-6 lg:pr-16"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        aria-label="Testimonials carousel"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            /* Mobile: nearly full viewport width so only one card shows at a time
               Tablet+: fixed width so multiple cards show */
            className="bg-surface-2 rounded-2xl p-6 flex flex-col gap-4 snap-start shrink-0
                       w-[calc(100vw-48px)] sm:w-80 lg:w-96"
          >
            <span
              className="text-5xl font-serif text-accent leading-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="text-text-primary leading-relaxed flex-1">
              {t.quote}
            </p>
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-text-primary">{t.author}</p>
              <p className="text-xs text-text-secondary">{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardWidth = el.querySelector("div")?.offsetWidth ?? 320;
              el.scrollLeft = i * (cardWidth + 16);
            }}
            className="w-2 h-2 rounded-full bg-border hover:bg-accent transition-colors duration-200"
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
