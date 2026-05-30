"use client";

import { useState } from "react";
import { Tag } from "@/components/ui/Tag";

interface TagFilterProps {
  tags: string[];
  allLabel?: string;
  onFilterChange: (activeTag: string | null) => void;
}

export function TagFilter({ tags, allLabel = "All", onFilterChange }: TagFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  function handleSelect(tag: string | null) {
    setActive(tag);
    onFilterChange(tag);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
      <Tag
        active={active === null}
        onClick={() => handleSelect(null)}
      >
        {allLabel}
      </Tag>
      {tags.map((tag) => (
        <Tag
          key={tag}
          active={active === tag}
          onClick={() => handleSelect(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
