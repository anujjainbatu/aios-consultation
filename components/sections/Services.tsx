"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cpu, Users } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Strategy",
    description:
      "Audit where AI can compound value in your product and ops. Walk away with a sequenced roadmap — not a wishlist.",
  },
  {
    icon: Cpu,
    title: "Product Build",
    description:
      "From RAG pipelines to agentic workflows, I design and ship the system — with evals, guardrails, and handoff docs your team owns.",
  },
  {
    icon: Users,
    title: "Team Enablement",
    description:
      "Upskill your team to maintain and extend what we build together. Workshops, documentation, and async support included.",
  },
];

// Mobile: each card triggers independently as it scrolls into view
function MobileCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger only when card is 80px inside the viewport — ensures sequential reveal
  const isInView = useInView(ref, { margin: "0px 0px -80px 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 * index }}
      className="bg-surface rounded-2xl p-6 flex flex-col gap-4 border border-border"
    >
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
        <Icon size={20} className="text-accent" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
      <div className="flex flex-col gap-12">
        <div>
          <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
            What I do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
            End-to-end AI consulting.
          </h2>
          <p className="mt-3 text-lg text-text-secondary max-w-2xl leading-relaxed">
            From identifying the right problem to shipping something your team trusts.
          </p>
        </div>

        {/* Mobile: sequential scroll reveal */}
        <div className="flex flex-col gap-5 sm:hidden">
          {services.map(({ icon, title, description }, i) => (
            <MobileCard key={title} icon={icon} title={title} description={description} index={i} />
          ))}
        </div>

        {/* Desktop: staggered grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface rounded-2xl p-6 flex flex-col gap-4 hover:bg-surface-2 transition-colors duration-300 border border-border hover:border-accent/30"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon size={20} className="text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
