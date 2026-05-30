import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { BlogPostSchema, type BlogPost } from "@/lib/schemas/blog-post";
import type { LoadedBlogPost, TagCount } from "@/lib/types";

const SLUG_RE = /^[a-z0-9-]+$/;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const MDX_EXTENSION = ".mdx";
const WORDS_PER_MINUTE = 200;

/** A blog post's frontmatter plus its computed reading time. */
export interface BlogPostListItem extends BlogPost {
  readingTimeMinutes: number;
}

/**
 * Lists the `.mdx` files in the blog content directory. Returns an empty array
 * if the directory does not exist yet.
 */
function listBlogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(MDX_EXTENSION));
}

/**
 * Estimates reading time in whole minutes from a markdown body, based on a
 * 200-words-per-minute baseline. Always returns at least 1.
 */
function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Reads and validates a single blog post's frontmatter from disk, returning
 * the validated frontmatter alongside the raw MDX body.
 * Throws if the frontmatter fails schema validation (fail fast at build time).
 */
function readBlogFile(fileName: string): {
  frontmatter: BlogPost;
  content: string;
} {
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const slugFromFile = fileName.replace(MDX_EXTENSION, "");
  const parsed = BlogPostSchema.safeParse({ slug: slugFromFile, ...data });

  if (!parsed.success) {
    throw new Error(
      `Invalid blog post frontmatter in "${fileName}": ${parsed.error.message}`
    );
  }

  return { frontmatter: parsed.data, content };
}

/**
 * Returns all published blog posts (frontmatter + reading time), sorted by
 * `publishedAt` descending (newest first). Does not serialize MDX bodies — use
 * {@link getBlogPost} for the full body.
 */
export function getAllBlogPosts(): BlogPostListItem[] {
  return listBlogFiles()
    .map((file) => {
      const { frontmatter, content } = readBlogFile(file);
      return {
        ...frontmatter,
        readingTimeMinutes: computeReadingTime(content),
      };
    })
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Aggregates tags across all published posts into descending-count buckets.
 * Useful for a tag cloud or filter UI on the blog index.
 */
export function getBlogTagCounts(): TagCount[] {
  const counts = new Map<string, number>();

  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Loads a single published blog post by slug, computing its reading time and
 * serializing its MDX body for rendering with next-mdx-remote's <MDXRemote />.
 *
 * @returns the loaded post, or `null` if not found or not published.
 */
export async function getBlogPost(
  slug: string
): Promise<LoadedBlogPost | null> {
  if (!SLUG_RE.test(slug)) return null;

  const fileName = `${slug}${MDX_EXTENSION}`;
  const fullPath = path.join(BLOG_DIR, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { frontmatter, content } = readBlogFile(fileName);

  if (frontmatter.status !== "published") {
    return null;
  }

  return {
    frontmatter,
    readingTimeMinutes: computeReadingTime(content),
    source: content,
  };
}
