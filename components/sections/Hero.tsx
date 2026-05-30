"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      const playOnInteraction = () => {
        video.play();
        document.removeEventListener("click", playOnInteraction);
        document.removeEventListener("touchstart", playOnInteraction);
      };
      document.addEventListener("click", playOnInteraction);
      document.addEventListener("touchstart", playOnInteraction);
    });
  }, []);

  const contentOpacity = Math.max(1 - scrollY / 400, 0);
  const contentTranslateY = scrollY * 0.4;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black -mt-20">

      {/* Full-screen background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-nodes.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — subtle so the video shows through */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Bottom gradient fade into page background */}
      <div
        className="absolute bottom-0 inset-x-0 h-64 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, #000000)",
        }}
      />

      {/* Content — overlaid on video */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col justify-center min-h-screen pt-32 pb-16">
        <div
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentTranslateY}px)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl"
          >
            I help founders{" "}
            <span className="bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
              ship AI
            </span>{" "}
            that actually works in production.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
          >
            Freelance AI consultant for international startup founders — from
            pre-seed to Series A. Strategy, build, and team enablement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-colors duration-200 group"
            >
              Book free session
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:border-white/60 hover:bg-white/10 px-7 py-3.5 rounded-xl font-semibold text-base transition-colors duration-200 backdrop-blur-sm"
            >
              See my work
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
