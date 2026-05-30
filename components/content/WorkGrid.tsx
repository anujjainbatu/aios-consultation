"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { TagFilter } from "@/components/content/TagFilter";
import { FolderOpen } from "lucide-react";

interface WorkGridProps {
  studies: CaseStudy[];
  allTags: string[];
}

export function WorkGrid({ studies, allTags }: WorkGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? studies.filter((s) => s.tags.includes(activeTag))
    : studies;

  return (
    <div className="flex flex-col gap-8">
      <TagFilter tags={allTags} onFilterChange={setActiveTag} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <FolderOpen className="w-12 h-12 text-text-secondary/40" aria-hidden="true" />
          <p className="text-text-secondary">
            No case studies found for this tag.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      )}
    </div>
  );
}
