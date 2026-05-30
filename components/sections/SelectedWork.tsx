"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import type { CaseStudy } from "@/lib/types";

function AnimatedCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px -80px 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 * index }}
    >
      <CaseStudyCard study={study} />
    </motion.div>
  );
}

export function SelectedWork({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
      <div className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
              Selected work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
              Built and shipped.
            </h2>
          </div>
          <Link
            href="/work"
            className="text-accent text-sm font-medium hover:underline underline-offset-2 shrink-0 inline-flex items-center gap-1"
          >
            All case studies
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile: sequential scroll reveal */}
        <div className="flex flex-col gap-5 md:hidden">
          {caseStudies.map((study, i) => (
            <AnimatedCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        {/* Desktop: staggered grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
