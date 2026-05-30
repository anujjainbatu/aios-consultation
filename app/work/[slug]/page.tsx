import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { MDXContent } from "@/components/content/MDXContent";
import { OutcomesTable } from "@/components/content/OutcomesTable";
import { Tag } from "@/components/ui/Tag";
import { CTASection } from "@/components/content/CTASection";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.frontmatter.title,
    description: study.frontmatter.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const { frontmatter, source } = study;

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm transition-colors duration-150 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
          All case studies
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-5 mb-10">
          <div className="flex flex-wrap gap-2">
            {frontmatter.industry && (
              <Tag active>{frontmatter.industry}</Tag>
            )}
            {frontmatter.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div>
            <p className="text-sm text-text-secondary uppercase tracking-wider font-medium mb-2">
              {frontmatter.client}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              {frontmatter.title}
            </h1>
          </div>

          <p className="text-text-secondary leading-relaxed text-lg">
            {frontmatter.summary}
          </p>

          {frontmatter.date && (
            <time
              dateTime={frontmatter.date}
              className="text-xs text-text-secondary"
            >
              Completed{" "}
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
        </header>

        {/* Outcomes */}
        {frontmatter.outcomes.length > 0 && (
          <div className="mb-12">
            <OutcomesTable outcomes={frontmatter.outcomes} />
          </div>
        )}

        {/* MDX body */}
        <div className="mb-12">
          <MDXContent source={source} />
        </div>

        {/* Testimonial */}
        {frontmatter.testimonial && (
          <figure className="relative mb-12 bg-surface border border-border rounded-2xl p-6 sm:p-8">
            <Quote
              className="absolute top-4 right-4 w-8 h-8 text-accent/20"
              aria-hidden="true"
            />
            <blockquote className="text-text-primary text-lg leading-relaxed italic mb-4">
              &ldquo;{frontmatter.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption>
              <span className="font-semibold text-text-primary">
                {frontmatter.testimonial.author}
              </span>
              <span className="text-text-secondary text-sm">
                {" "}&mdash; {frontmatter.testimonial.role}
              </span>
            </figcaption>
          </figure>
        )}
      </article>

      <CTASection />
    </>
  );
}
