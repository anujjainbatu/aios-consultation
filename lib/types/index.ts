// Core domain types for the static content layer.
// Frontmatter-derived types (CaseStudy, BlogPost) live alongside their Zod
// schemas in lib/schemas; this file holds the broader site-level types and
// re-exports the schema-inferred ones for convenient single-import access.

import type { CaseStudy } from "@/lib/schemas/case-study";
import type { BlogPost } from "@/lib/schemas/blog-post";

export type { CaseStudy } from "@/lib/schemas/case-study";
export type { BlogPost } from "@/lib/schemas/blog-post";

/** Raw MDX string passed to next-mdx-remote/rsc's MDXRemote server component. */
export type MDXSource = string;

/**
 * Global, build-time site configuration. Static values only — no secrets.
 */
export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  linkedinUrl: string;
  githubUrl: string;
  email: string;
  calendlyUrl: string;
  appsScriptUrl: string;
  ogImage: string;
}

/**
 * A single measurable result delivered in a case study.
 */
export interface CaseStudyOutcome {
  /** Short headline metric, e.g. "-68%". */
  metric: string;
  /** What the metric describes, e.g. "support tickets". */
  label: string;
}

/**
 * A client quote attached to a case study.
 */
export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * Publication lifecycle status shared by content types.
 */
export type ContentStatus = "draft" | "published";

/**
 * A tag and the number of items associated with it. Used for tag clouds /
 * filter UIs on the blog index.
 */
export interface TagCount {
  tag: string;
  count: number;
}

/**
 * A single navigation entry.
 */
export interface NavItem {
  label: string;
  href: string;
  /** When true, render as a primary call-to-action button. */
  isCta?: boolean;
}

/**
 * A fully-loaded case study: validated frontmatter plus the serialized MDX
 * body ready for next-mdx-remote's <MDXRemote />.
 */
export interface LoadedCaseStudy {
  frontmatter: CaseStudy;
  /** Serialized MDX source from next-mdx-remote/serialize. */
  source: MDXSource;
}

/**
 * A fully-loaded blog post: validated frontmatter, computed reading time, and
 * the serialized MDX body.
 */
export interface LoadedBlogPost {
  frontmatter: BlogPost;
  readingTimeMinutes: number;
  source: MDXSource;
}
