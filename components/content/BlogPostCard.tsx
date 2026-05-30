import Link from "next/link";
import type { BlogPostListItem } from "@/lib/content/blog-posts";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, Clock } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPostListItem;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <time
          dateTime={post.publishedAt}
          className="text-sm text-text-secondary"
        >
          {formattedDate}
        </time>
        <span className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {post.readingTimeMinutes} min read
        </span>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-text-primary leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="mt-auto pt-2">
        <Link
          href={`/writing/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all duration-150 group"
        >
          Read post
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
