"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

const companySizes = [
  "Just me",
  "2–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
];

type FormState = "idle" | "loading" | "error";

export function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    companySize: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.companySize) return;

    setState("loading");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/thank-you");
    } catch {
      setState("error");
    }
  };

  const inputClass =
    "w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors duration-150";

  const labelClass = "block text-xs font-medium text-text-secondary uppercase tracking-widest mb-2";

  return (
    <AnimatePresence mode="wait">
      {(
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-surface border border-border rounded-2xl p-6 sm:p-8"
          noValidate
        >
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-1">
              Get your free session
            </h2>
            <p className="text-sm text-text-secondary">
              Fill in your details — I&apos;ll be in touch within 48 hours.
            </p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name <span className="text-accent">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Alex Johnson"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Work email <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="alex@startup.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className={labelClass}>
              Company website
              <span className="text-text-secondary/50 font-normal ml-1 normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <input
              id="website"
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://yourstartup.com"
              value={form.website}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Company size */}
          <div>
            <label htmlFor="companySize" className={labelClass}>
              Company size <span className="text-accent">*</span>
            </label>
            <select
              id="companySize"
              name="companySize"
              required
              value={form.companySize}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer appearance-none`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "40px",
              }}
            >
              <option value="" disabled>Select team size…</option>
              {companySizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Error state */}
          {state === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              Something went wrong. Try emailing me directly at{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {state === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Request free session →"
            )}
          </button>

          <p className="text-xs text-text-secondary text-center">
            No spam. No pitch. I&apos;ll reply within 48 hours.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

