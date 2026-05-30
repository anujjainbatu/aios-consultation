import type { CaseStudyOutcome } from "@/lib/schemas/case-study";

interface OutcomesTableProps {
  outcomes: CaseStudyOutcome[];
}

export function OutcomesTable({ outcomes }: OutcomesTableProps) {
  if (outcomes.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="px-6 py-4 border-b border-border bg-surface-2">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Key Outcomes
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {outcomes.map((outcome, idx) => (
          <div
            key={idx}
            className="px-6 py-5 flex flex-col gap-1"
          >
            <span className="text-3xl font-bold text-cta leading-none">
              {outcome.metric}
            </span>
            <span className="text-sm text-text-secondary leading-snug">
              {outcome.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
