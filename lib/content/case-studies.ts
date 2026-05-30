import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CaseStudySchema, type CaseStudy } from "@/lib/schemas/case-study";
import type { LoadedCaseStudy } from "@/lib/types";

const SLUG_RE = /^[a-z0-9-]+$/;

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");
const MDX_EXTENSION = ".mdx";

/**
 * Lists the `.mdx` files in the case-studies content directory. Returns an
 * empty array if the directory does not exist yet.
 */
function listCaseStudyFiles(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(MDX_EXTENSION));
}

/**
 * Reads and validates a single case study's frontmatter from disk.
 * Returns the validated frontmatter together with the raw MDX body.
 * Throws if the frontmatter fails schema validation (fail fast at build time).
 */
function readCaseStudyFile(fileName: string): {
  frontmatter: CaseStudy;
  content: string;
} {
  const fullPath = path.join(CASE_STUDIES_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const slugFromFile = fileName.replace(MDX_EXTENSION, "");
  const parsed = CaseStudySchema.safeParse({ slug: slugFromFile, ...data });

  if (!parsed.success) {
    throw new Error(
      `Invalid case study frontmatter in "${fileName}": ${parsed.error.message}`
    );
  }

  return { frontmatter: parsed.data, content };
}

/**
 * Returns all published case studies' frontmatter, sorted by `order` ascending.
 * Does not serialize MDX bodies — use {@link getCaseStudy} for the full body.
 */
export function getAllCaseStudies(): CaseStudy[] {
  return listCaseStudyFiles()
    .map((file) => readCaseStudyFile(file).frontmatter)
    .filter((cs) => cs.status === "published")
    .sort((a, b) => a.order - b.order);
}

/**
 * Loads a single published case study by slug, serializing its MDX body for
 * rendering with next-mdx-remote's <MDXRemote />.
 *
 * @returns the loaded case study, or `null` if not found or not published.
 */
export async function getCaseStudy(
  slug: string
): Promise<LoadedCaseStudy | null> {
  if (!SLUG_RE.test(slug)) return null;

  const fileName = `${slug}${MDX_EXTENSION}`;
  const fullPath = path.join(CASE_STUDIES_DIR, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { frontmatter, content } = readCaseStudyFile(fileName);

  if (frontmatter.status !== "published") {
    return null;
  }

  return { frontmatter, source: content };
}
