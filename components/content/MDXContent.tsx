import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXSource } from "@/lib/types";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="text-3xl sm:text-4xl font-bold text-text-primary mt-10 mb-4 leading-tight tracking-tight"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-2xl sm:text-3xl font-semibold text-text-primary mt-10 mb-4 leading-snug"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-xl font-semibold text-text-primary mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="text-lg font-semibold text-text-primary mt-6 mb-2"
      {...props}
    />
  ),
  h5: (props: ComponentPropsWithoutRef<"h5">) => (
    <h5
      className="text-base font-semibold text-text-primary mt-4 mb-2"
      {...props}
    />
  ),
  h6: (props: ComponentPropsWithoutRef<"h6">) => (
    <h6
      className="text-sm font-semibold text-text-secondary uppercase tracking-wider mt-4 mb-2"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="text-text-secondary leading-relaxed mb-5 text-base"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc list-outside pl-5 mb-5 space-y-2 text-text-secondary"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal list-outside pl-5 mb-5 space-y-2 text-text-secondary"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-accent pl-5 py-1 my-6 bg-surface rounded-r-lg"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="font-mono text-sm bg-surface-2 text-accent px-1.5 py-0.5 rounded border border-border"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-surface border border-border rounded-xl p-5 overflow-x-auto my-6 text-sm font-mono leading-relaxed"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-150"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-border my-10" />
  ),
};

interface MDXContentProps {
  source: MDXSource;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-custom max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
