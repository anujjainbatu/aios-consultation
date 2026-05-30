"use client";

import { useState } from "react";
import type { BlogPostListItem } from "@/lib/content/blog-posts";
import { BlogPostCard } from "@/components/content/BlogPostCard";
import { TagFilter } from "@/components/content/TagFilter";
import { FileText } from "lucide-react";

interface WritingListProps {
  posts: BlogPostListItem[];
  allTags: string[];
}

export function WritingList({ posts, allTags }: WritingListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="flex flex-col gap-8">
      <TagFilter tags={allTags} onFilterChange={setActiveTag} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <FileText className="w-12 h-12 text-text-secondary/40" aria-hidden="true" />
          <p className="text-text-secondary">
            No posts found for this tag.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
