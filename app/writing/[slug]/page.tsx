import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getAllBlogPosts, getBlogPost } from "@/lib/content/blog-posts";
import { MDXContent } from "@/components/content/MDXContent";
import { Tag } from "@/components/ui/Tag";
import { CTASection } from "@/components/content/CTASection";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const { frontmatter, readingTimeMinutes, source } = post;

  const formattedDate = new Date(frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Back link */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm transition-colors duration-150 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
          All posts
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-5 mb-10 border-b border-border pb-10">
          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
            {frontmatter.title}
          </h1>

          <p className="text-text-secondary leading-relaxed text-lg">
            {frontmatter.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={frontmatter.publishedAt}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {readingTimeMinutes} min read
            </span>
            {frontmatter.author && (
              <span className="text-text-secondary">by {frontmatter.author}</span>
            )}
          </div>
        </header>

        {/* MDX body */}
        <div className="mb-12">
          <MDXContent source={source} />
        </div>

        {/* Author bio */}
        <div className="border-t border-border pt-8 mb-4">
          <p className="text-text-secondary text-sm">
            Written by{" "}
            <span className="text-text-primary font-medium">
              {frontmatter.author ?? "Anuj Jain"}
            </span>{" "}
            — AI strategy and implementation consultant for startup founders.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  );
}
