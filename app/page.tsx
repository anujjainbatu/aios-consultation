import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { getAllBlogPosts } from "@/lib/content/blog-posts";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/content/CTASection";
import { Tag } from "@/components/ui/Tag";

// New animated sections (all client components)
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { StatsBar } from "@/components/sections/StatsBar";
import { Services } from "@/components/sections/Services";
import { Timeline } from "@/components/sections/Timeline";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  const caseStudies = getAllCaseStudies().slice(0, 2);
  const allPosts = getAllBlogPosts();
  const featuredPost =
    allPosts.find((p) => p.tags.includes("Strategy")) ?? allPosts[0];

  return (
    <>
      {/* Hero with scroll parallax */}
      <Hero />

      {/* Marquee / social proof strip */}
      <Marquee />

      {/* Animated stats bar */}
      <StatsBar />

      {/* Services with card entrance animations */}
      <Services />

      {/* Scroll-driven consulting process timeline */}
      <Timeline />

      {/* Auto-scrolling testimonials carousel */}
      <Testimonials />

      {/* Selected work */}
      {caseStudies.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
          <div className="flex flex-col gap-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
                  Selected work
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
                  Built and shipped.
                </h2>
              </div>
              <Link
                href="/work"
                className="text-accent text-sm font-medium hover:underline underline-offset-2 shrink-0 inline-flex items-center gap-1"
              >
                All case studies
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-16 lg:pb-24">
          <div className="flex flex-col gap-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
                  From the blog
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold bg-[linear-gradient(90deg,#3B82F6_0%,#93C5FD_100%)] bg-clip-text text-transparent">
                  Thinking out loud.
                </h2>
              </div>
              <Link
                href="/writing"
                className="text-accent text-sm font-medium hover:underline underline-offset-2 shrink-0 inline-flex items-center gap-1"
              >
                All posts
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <Link href={`/writing/${featuredPost.slug}`} className="group block">
              <Card className="flex flex-col sm:flex-row gap-6 sm:items-start group-hover:border-accent/40">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-150 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium">
                    Read post
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection />
    </>
  );
}
