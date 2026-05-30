"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const primaryStats = [
  { target: 10, suffix: "+", label: "AI Projects Shipped" },
  { target: 8, suffix: "", label: "Founders Helped" },
  { target: 3, suffix: "", label: "Countries" },
  { target: 60, suffix: "%", label: "Avg Cost Saved" },
];

const secondaryStats = [
  { value: "48 Hours", label: "avg response time" },
  { value: "2 Weeks", label: "to first shipped feature" },
  { value: "100%", label: "client retention" },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-background py-16 lg:py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section eyebrow */}
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
            Numbers that speak
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
            Not promises. Proof.
          </h2>
        </div>

        {/* Primary animated counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {primaryStats.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 100}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-border" />

        {/* Secondary stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {secondaryStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xl font-semibold text-text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-text-secondary">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
