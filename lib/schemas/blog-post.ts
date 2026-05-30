import { z } from "zod";

/**
 * Zod schema for blog-post MDX frontmatter. Validated at build time by the
 * content loader in lib/content/blog-posts.ts.
 */
export const BlogPostSchema = z.object({
  /** URL slug — must match the filename (without .mdx). */
  slug: z.string().min(1),
  title: z.string().min(1),
  /** One-line summary used on cards, the post header, and meta tags. */
  excerpt: z.string().min(1),
  /** ISO date string, e.g. "2026-04-12". */
  publishedAt: z.string().min(1),
  /** Optional last-updated ISO date string. */
  updatedAt: z.string().optional(),
  /** Topic tags used for the tag cloud and filtering. */
  tags: z.array(z.string()).default([]),
  /** Publication lifecycle. Only "published" is rendered. */
  status: z.enum(["draft", "published"]).default("draft"),
  /** Hero / card image path under /public. */
  coverImage: z.string().optional(),
  /** Author name — defaults to the site owner. */
  author: z.string().default("Anuj Jain"),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
