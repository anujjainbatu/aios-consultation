import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { WorkGrid } from "@/components/content/WorkGrid";
import { CTASection } from "@/components/content/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from AI consulting engagements — support automation, GTM workflows, internal knowledge systems, and more.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies();

  const allTags = Array.from(
    new Set(studies.flatMap((s) => s.tags))
  ).sort();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pt-16">
        <SectionHeader
          title="Work"
          subtitle="Real engagements with startup founders. Each case study shows the problem, what we built, and the measurable outcome."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <WorkGrid studies={studies} allTags={allTags} />
      </section>

      <CTASection />
    </>
  );
}
