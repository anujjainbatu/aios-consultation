import { getAllCaseStudies } from "@/lib/content/case-studies";
import { getAllBlogPosts } from "@/lib/content/blog-posts";
import { CTASection } from "@/components/content/CTASection";

// New animated sections (all client components)
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { StatsBar } from "@/components/sections/StatsBar";
import { Services } from "@/components/sections/Services";
import { Timeline } from "@/components/sections/Timeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { FeaturedPosts } from "@/components/sections/FeaturedPosts";

export default function HomePage() {
  const caseStudies = getAllCaseStudies().slice(0, 2);
  const featuredPosts = getAllBlogPosts().slice(0, 3);

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
      <SelectedWork caseStudies={caseStudies} />

      {/* Featured posts */}
      <FeaturedPosts posts={featuredPosts} />

      {/* CTA */}
      <CTASection />
    </>
  );
}
