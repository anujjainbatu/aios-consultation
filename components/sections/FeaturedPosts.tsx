"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { BlogPostListItem } from "@/lib/content/blog-posts";

function AnimatedPost({ post, index }: { post: BlogPostListItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px -80px 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 * index }}
    >
      <PostCard post={post} />
    </motion.div>
  );
}

function PostCard({ post }: { post: BlogPostListItem }) {
  return (
    <Link href={`/writing/${post.slug}`} className="group block">
      <Card className="flex flex-col sm:flex-row gap-5 sm:items-start group-hover:border-accent/40 transition-colors duration-200">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 shrink-0">
          <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2.5 flex-1">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150 leading-snug">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium mt-1">
            Read post
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export function FeaturedPosts({ posts }: { posts: BlogPostListItem[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-16 lg:pb-24">
      <div className="flex flex-col gap-8">
        {/* Header */}
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

        {/* Mobile: sequential scroll reveal */}
        <div className="flex flex-col gap-5 sm:hidden">
          {posts.map((post, i) => (
            <AnimatedPost key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* Desktop: staggered grid */}
        <div className="hidden sm:flex flex-col gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
