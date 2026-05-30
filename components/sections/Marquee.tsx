"use client";

import { motion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const items = [
  "Series A SaaS",
  "Pre-seed Fintech",
  "YC W24 Startup",
  "B2B SaaS",
  "HealthTech",
  "EdTech Startup",
  "DevTools",
  "AI-native SaaS",
  "Web3 Infra",
  "Climate Tech",
  "PropTech",
  "LegalTech",
];

const duplicatedItems = [...items, ...items];

export function Marquee() {
  return (
    <ParallaxProvider>
      <section className="w-full bg-background px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-7xl mx-auto bg-surface rounded-3xl md:px-8 lg:pt-16 pt-10 overflow-hidden">

          {/* Two-column parallax headline + description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start px-6 md:px-0 pb-10 md:pb-14">

            <Parallax speed={-6}>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent"
              >
                Helping founders
                <br />
                build with AI — fast.
              </motion.h2>
            </Parallax>

            <Parallax speed={4}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl"
              >
                From pre-seed to Series A, I work with founders who move fast
                and need AI that works in production — not just in demos. Strategy
                and engineering, end to end.
              </motion.p>
            </Parallax>

          </div>

          {/* Scrolling strip */}
          <div className="relative flex pb-10 md:pb-14 overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-linear-to-r from-surface to-transparent" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-linear-to-l from-surface to-transparent" />

            <motion.div
              className="flex gap-4 md:gap-6 pr-4 md:pr-6"
              animate={{ x: [0, "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 24,
                  ease: "linear",
                },
              }}
              aria-hidden="true"
            >
              {duplicatedItems.map((item, i) => (
                <div
                  key={`${item}-${i}`}
                  className="shrink-0 h-14 md:h-16 bg-surface-2 rounded-full flex items-center justify-center px-6 md:px-8 border border-border"
                >
                  <span className="text-sm md:text-base text-text-secondary font-medium whitespace-nowrap">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </ParallaxProvider>
  );
}
