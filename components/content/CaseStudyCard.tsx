import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, TrendingUp } from "lucide-react";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const primaryOutcome = study.outcomes[0];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {study.industry && (
            <Tag active>{study.industry}</Tag>
          )}
        </div>
        {study.date && (
          <time
            dateTime={study.date}
            className="text-xs text-text-secondary shrink-0"
          >
            {new Date(study.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </time>
        )}
      </div>

      <div>
        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
          {study.client}
        </p>
        <h3 className="text-xl font-semibold text-text-primary leading-snug">
          {study.title}
        </h3>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
        {study.summary}
      </p>

      {primaryOutcome && (
        <div className="flex items-center gap-3 bg-surface-2 rounded-lg px-4 py-3 border border-border">
          <TrendingUp className="w-4 h-4 text-cta shrink-0" aria-hidden="true" />
          <div>
            <span className="text-xl font-bold text-cta">{primaryOutcome.metric}</span>
            <span className="ml-2 text-sm text-text-secondary">{primaryOutcome.label}</span>
          </div>
        </div>
      )}

      {study.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="mt-auto pt-2">
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all duration-150 group"
        >
          Read case study
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
