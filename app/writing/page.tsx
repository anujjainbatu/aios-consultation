import type { Metadata } from "next";
import { getAllBlogPosts, getBlogTagCounts } from "@/lib/content/blog-posts";
import { WritingList } from "@/components/content/WritingList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/content/CTASection";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Practical AI writing for startup operators — strategy, prompt engineering, build vs buy decisions, and more.",
};

export default function WritingPage() {
  const posts = getAllBlogPosts();
  const tagCounts = getBlogTagCounts();
  const allTags = tagCounts.map((t) => t.tag);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pt-16">
        <SectionHeader
          title="Writing"
          subtitle="Practical thinking on AI strategy, product decisions, and operator craft — written for founders, not researchers."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <WritingList posts={posts} allTags={allTags} />
      </section>

      <CTASection />
    </>
  );
}
