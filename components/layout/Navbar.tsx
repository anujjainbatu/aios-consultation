"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setMobileOpen(false);
    }
  }, [pathname]);

  return (
    <div className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 lg:px-8">
      <header
        className={`mx-auto max-w-5xl rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-black/40"
        }`}
      >
        <nav
          className="px-5 sm:px-6 h-14 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-text-primary font-semibold text-base tracking-tight hover:text-accent transition-colors duration-150"
            aria-label="Anuj Jain — Home"
          >
            Anuj Jain
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname.startsWith(link.href)
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Gradient border CTA */}
            <Link
              href="/book"
              style={{
                border: "1px solid transparent",
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), linear-gradient(90deg, #3B82F6 0%, #93C5FD 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
              className="relative px-5 py-2 rounded-full text-sm font-medium group overflow-hidden"
            >
              <span className="relative z-10 bg-linear-to-r from-accent to-blue-300 bg-clip-text text-transparent group-hover:text-white transition-colors duration-200">
                Book free session &rarr;
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-accent to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors duration-150"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile menu — drops inside the floating card */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="sm:hidden border-t border-white/10 px-4 pt-3 pb-4 space-y-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  pathname.startsWith(link.href)
                    ? "text-text-primary bg-white/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-1">
              <Link
                href="/book"
                className="block w-full text-center px-4 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-150"
              >
                Book free session →
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
