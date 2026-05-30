import { z } from "zod";

/**
 * A single measurable result delivered in the engagement.
 */
export const CaseStudyOutcomeSchema = z.object({
  /** Short headline metric, e.g. "-68%". */
  metric: z.string(),
  /** What the metric describes, e.g. "support tickets". */
  label: z.string(),
});

/**
 * Optional client quote for the case study.
 */
export const CaseStudyTestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
});

/**
 * Zod schema for case-study MDX frontmatter. Validated at build time by the
 * content loader in lib/content/case-studies.ts.
 */
export const CaseStudySchema = z.object({
  /** URL slug — must match the filename (without .mdx). */
  slug: z.string().min(1),
  title: z.string().min(1),
  /** Client name or anonymized descriptor, e.g. "Seed-stage SaaS startup". */
  client: z.string().min(1),
  /** One-line summary used on cards and meta tags. */
  summary: z.string().min(1),
  /** Industry / vertical, e.g. "B2B SaaS". */
  industry: z.string().optional(),
  /** Free-form services / focus tags. */
  tags: z.array(z.string()).default([]),
  /** Headline outcomes shown prominently on the case study. */
  outcomes: z.array(CaseStudyOutcomeSchema).default([]),
  /** Optional client testimonial. */
  testimonial: CaseStudyTestimonialSchema.optional(),
  /** Publication lifecycle. Only "published" is rendered. */
  status: z.enum(["draft", "published"]).default("draft"),
  /** Manual sort order — lower numbers appear first. */
  order: z.number().int().default(0),
  /** Hero / card image path under /public. */
  coverImage: z.string().optional(),
  /** ISO date string for when the engagement completed. */
  date: z.string().optional(),
});

export type CaseStudyOutcome = z.infer<typeof CaseStudyOutcomeSchema>;
export type CaseStudyTestimonial = z.infer<typeof CaseStudyTestimonialSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
