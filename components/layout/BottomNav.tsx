"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, Calendar, PenLine } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { siteConfig } from "@/lib/data/site-config";

const navItems = [
  { label: "Home",    href: "/",        icon: Home,      exact: true  },
  { label: "Work",    href: "/work",    icon: Briefcase, exact: false },
  null, // center bubble placeholder
  { label: "Writing", href: "/writing", icon: PenLine,   exact: false },
  { label: "Connect", href: siteConfig.linkedinUrl, icon: LinkedInIcon, exact: false, external: true },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile navigation"
    >
      <div className="bg-surface/90 backdrop-blur-xl border-t border-border h-16 flex items-center justify-around px-2">

        {navItems.map((item, i) => {
          /* Center CTA bubble */
          if (item === null) {
            return (
              <motion.div
                key="book-cta"
                whileTap={{ scale: 0.88 }}
                className="flex flex-col items-center"
              >
                <Link
                  href="/book"
                  aria-label="Book free session"
                  className="w-14 h-14 -mt-8 rounded-full bg-accent flex items-center justify-center"
                  style={{ boxShadow: "0 0 20px rgba(59,130,246,0.45), 0 4px 12px rgba(0,0,0,0.4)" }}
                >
                  <Calendar className="w-6 h-6 text-white" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          }

          const { label, href, icon: Icon, exact, external } = item;
          const active = !external && isActive(href, exact);

          return (
            <motion.div
              key={href}
              whileTap={{ scale: 0.88 }}
              className="flex flex-col items-center"
            >
              <Link
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors duration-150 ${
                  active ? "text-accent" : "text-text-secondary"
                }`}
                aria-label={label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] font-medium leading-none">{label}</span>
              </Link>
            </motion.div>
          );
        })}

      </div>
    </nav>
  );
}
