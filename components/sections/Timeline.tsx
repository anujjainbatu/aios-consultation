"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Free Strategy Session",
    description: "60 minutes. We map your AI opportunities, no pitch.",
    isEnd: false,
    metric: undefined as string | undefined,
  },
  {
    number: "02",
    title: "Audit & Roadmap",
    description: "I audit your workflow and deliver a prioritised AI build plan.",
    isEnd: false,
    metric: undefined as string | undefined,
  },
  {
    number: "03",
    title: "Build & Ship",
    description: "Strategy and engineering. I build it, you own it.",
    isEnd: false,
    metric: undefined as string | undefined,
  },
  {
    number: "04",
    title: "Grow & Iterate",
    description: "Monitoring, iteration, and handoff.",
    isEnd: true,
    metric: "10X",
  },
];

// Desktop: all 4 nodes activate early, front-loaded
const DESKTOP_THRESHOLDS = [0.02, 0.16, 0.30, 0.44] as const;
// Mobile: spread evenly across full scroll range
const MOBILE_THRESHOLDS = [0.08, 0.33, 0.58, 0.82] as const;

function NodeCircle({
  done,
  step,
  size = "w-16 h-16",
}: {
  done: boolean;
  step: (typeof steps)[number];
  size?: string;
}) {
  return (
    <div className="relative">
      {/* "Step" label above node — fades out when done */}
      <motion.div
        className="absolute -top-7 left-0 right-0 flex justify-center pointer-events-none"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: done ? 0 : 1, y: done ? 14 : 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        <span className="text-xs font-medium text-accent uppercase tracking-wider">
          Step
        </span>
      </motion.div>

      <motion.div
        className={`relative rounded-full flex items-center justify-center ${size} border-2 border-border bg-surface overflow-hidden shrink-0`}
        animate={
          done && step.isEnd
            ? {
                boxShadow: [
                  "0 0 0px #3B82F644",
                  "0 0 22px #3B82F688",
                  "0 0 0px #3B82F644",
                ],
              }
            : {}
        }
        transition={done && step.isEnd ? { duration: 2, repeat: Infinity } : {}}
      >
        {/* Blue fill circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-accent"
          initial={{ scale: 0 }}
          animate={{ scale: done ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Step number / metric — fades out when done */}
        <motion.span
          className="absolute z-10 font-semibold text-text-secondary text-base"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: done ? 0 : 1, scale: done ? 0.5 : 1 }}
          transition={{ duration: 0.25, ease: "easeIn" }}
        >
          {step.isEnd ? step.metric : step.number}
        </motion.span>

        {/* Checkmark SVG */}
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.05, delay: done ? 0.25 : 0 }}
        >
          <motion.path
            d="M5 12l4.5 4.5L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: done ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: done ? 0.25 : 0 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

function TextContent({
  index,
  align,
}: {
  index: number;
  align: "left" | "right" | "center";
}) {
  const step = steps[index];
  return (
    <>
      <span className="bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent text-xs font-semibold mb-1.5 block">
        {step.number}
      </span>
      <h3
        className={`text-text-primary font-semibold text-sm mb-1 ${
          align === "right" ? "text-right" : ""
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`text-text-secondary text-xs leading-relaxed ${
          align === "right" ? "text-right" : ""
        }`}
      >
        {step.description}
      </p>
      {step.isEnd && (
        <p
          className={`mt-1.5 bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent text-base font-medium ${
            align === "right" ? "text-right" : ""
          }`}
        >
          {step.metric} Leverage
        </p>
      )}
    </>
  );
}

export function Timeline() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const [completedDesktop, setCompletedDesktop] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);
  const [completedMobile, setCompletedMobile] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 80%", "end 20%"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 85%", "end 15%"],
  });

  useMotionValueEvent(desktopProgress, "change", (latest) => {
    setCompletedDesktop(() => {
      const next = [false, false, false, false] as [
        boolean,
        boolean,
        boolean,
        boolean,
      ];
      DESKTOP_THRESHOLDS.forEach((t, i) => {
        if (latest >= t) next[i] = true;
      });
      return next;
    });
  });

  useMotionValueEvent(mobileProgress, "change", (latest) => {
    setCompletedMobile(() => {
      const next = [false, false, false, false] as [
        boolean,
        boolean,
        boolean,
        boolean,
      ];
      MOBILE_THRESHOLDS.forEach((t, i) => {
        if (latest >= t) next[i] = true;
      });
      return next;
    });
  });

  // Desktop: horizontal fill line — piecewise, pauses at each node
  const lineWidth = useTransform(
    desktopProgress,
    [0, 0.06, 0.16, 0.20, 0.30, 0.34, 0.44, 0.50],
    ["0%", "0%", "33.3%", "33.3%", "66.7%", "66.7%", "100%", "100%"]
  );

  // Desktop text fade-in per step
  const dText0Opacity = useTransform(desktopProgress, [0.06, 0.10], [0, 1]);
  const dText1Opacity = useTransform(desktopProgress, [0.20, 0.24], [0, 1]);
  const dText2Opacity = useTransform(desktopProgress, [0.34, 0.38], [0, 1]);
  const dText3Opacity = useTransform(desktopProgress, [0.48, 0.52], [0, 1]);
  const dTextOpacities = [dText0Opacity, dText1Opacity, dText2Opacity, dText3Opacity];

  const dText0Y = useTransform(desktopProgress, [0.06, 0.10], [14, 0]);
  const dText1Y = useTransform(desktopProgress, [0.20, 0.24], [14, 0]);
  const dText2Y = useTransform(desktopProgress, [0.34, 0.38], [14, 0]);
  const dText3Y = useTransform(desktopProgress, [0.48, 0.52], [14, 0]);
  const dTextYs = [dText0Y, dText1Y, dText2Y, dText3Y];

  // Mobile: vertical segment fills
  const mSeg0Fill = useTransform(mobileProgress, [0.12, 0.33], ["0%", "100%"]);
  const mSeg1Fill = useTransform(mobileProgress, [0.38, 0.58], ["0%", "100%"]);
  const mSeg2Fill = useTransform(mobileProgress, [0.63, 0.82], ["0%", "100%"]);
  const mSegmentFills = [mSeg0Fill, mSeg1Fill, mSeg2Fill];

  // Mobile text fade-in per step
  const mText0Opacity = useTransform(mobileProgress, [0.12, 0.17], [0, 1]);
  const mText1Opacity = useTransform(mobileProgress, [0.38, 0.43], [0, 1]);
  const mText2Opacity = useTransform(mobileProgress, [0.63, 0.68], [0, 1]);
  const mText3Opacity = useTransform(mobileProgress, [0.86, 0.92], [0, 1]);
  const mTextOpacities = [mText0Opacity, mText1Opacity, mText2Opacity, mText3Opacity];

  const mText0Y = useTransform(mobileProgress, [0.12, 0.17], [14, 0]);
  const mText1Y = useTransform(mobileProgress, [0.38, 0.43], [14, 0]);
  const mText2Y = useTransform(mobileProgress, [0.63, 0.68], [14, 0]);
  const mText3Y = useTransform(mobileProgress, [0.86, 0.92], [14, 0]);
  const mTextYs = [mText0Y, mText1Y, mText2Y, mText3Y];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium text-accent uppercase tracking-widest mb-4 block">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
            From first call to{" "}
            <span className="bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
              shipped product.
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            No complicated onboarding. No fluff. Just strategy, build, and leverage.
          </p>
        </motion.div>

        {/* ===== DESKTOP: horizontal timeline ===== */}
        <div ref={desktopRef} className="hidden md:block">
          <div className="relative flex justify-between items-start pt-8">
            {/* Track line */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-surface-2 z-0 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{
                  width: lineWidth,
                  background: "linear-gradient(90deg, #3B82F6 0%, #93C5FD 100%)",
                }}
              />
            </div>

            {steps.map((_, i) => (
              <div
                key={steps[i].number}
                className="relative z-10 flex flex-col items-center w-1/4"
              >
                <NodeCircle done={completedDesktop[i]} step={steps[i]} />
                <motion.div
                  className="mt-8 px-3 text-center"
                  style={{ opacity: dTextOpacities[i], y: dTextYs[i] }}
                >
                  <TextContent index={i} align="center" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MOBILE: vertical alternating timeline ===== */}
        <div ref={mobileRef} className="block md:hidden">
          {steps.map((_, i) => {
            const textRight = i % 2 === 0;
            return (
              <div key={steps[i].number}>
                <div className="flex items-center pt-8">
                  {/* Left text slot */}
                  <motion.div
                    className="flex-1 pr-4"
                    style={
                      !textRight
                        ? { opacity: mTextOpacities[i], y: mTextYs[i] }
                        : { opacity: 0 }
                    }
                  >
                    {!textRight && <TextContent index={i} align="right" />}
                  </motion.div>

                  {/* Node */}
                  <div className="shrink-0 relative z-10">
                    <NodeCircle
                      done={completedMobile[i]}
                      step={steps[i]}
                      size="w-14 h-14"
                    />
                  </div>

                  {/* Right text slot */}
                  <motion.div
                    className="flex-1 pl-4"
                    style={
                      textRight
                        ? { opacity: mTextOpacities[i], y: mTextYs[i] }
                        : { opacity: 0 }
                    }
                  >
                    {textRight && <TextContent index={i} align="left" />}
                  </motion.div>
                </div>

                {/* Vertical connector segment between nodes */}
                {i < steps.length - 1 && (
                  <div className="flex">
                    <div className="flex-1" />
                    <div className="w-14 flex justify-center">
                      <div className="w-0.5 h-14 bg-surface-2 relative overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: mSegmentFills[i],
                            background:
                              "linear-gradient(180deg, #3B82F6 0%, #93C5FD 100%)",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-14 lg:mt-18"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/book"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white bg-accent hover:bg-accent-hover transition-colors duration-200"
          >
            Book your free session →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
