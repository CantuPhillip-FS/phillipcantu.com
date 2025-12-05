import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

// Inspriration taken from former Vecel employee Lee Robinson
// From this Next.js 15 with MDX blog tutorial on YouTube here:
// https://www.youtube.com/watch?v=34bRv6cQezo
// Only included the props that I'd likely use for basic blog posts

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type CodeProps = ComponentPropsWithoutRef<"code">;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1
      className="text-3xl md:text-4xl font-semibold text-orange-400 tracking-tight mb-6"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-2xl md:text-3xl font-semibold text-blue-400 tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-xl md:text-2xl font-semibold text-slate-100 mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-lg font-medium text-slate-200 mt-6 mb-2" {...props} />
  ),

  p: (props: ParagraphProps) => (
    <p className="text-slate-100 leading-relaxed mb-4" {...props} />
  ),

  ol: (props: ListProps) => (
    <ol
      className="list-decimal pl-6 space-y-2 text-slate-100 mb-4"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-6 space-y-2 text-slate-100 mb-4" {...props} />
  ),
  li: (props: ListItemProps) => <li className="leading-relaxed" {...props} />,

  em: (props) => <em className="italic text-slate-100" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-slate-100" {...props} />
  ),

  // Conditional a tag rendering based on external, internal, and hash links
  a: ({ href, children, ...props }: AnchorProps) => {
    const baseClassName =
      "text-yellow-200 hover:text-slate-100 underline underline-offset-4 decoration-slate-600 transition-colors";
    const className = [baseClassName, props.className]
      .filter(Boolean)
      .join(" ");

    if (!href) {
      return (
        <a {...props} className={className}>
          {children}
        </a>
      );
    }

    // Internal links: use Next.js <Link>
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    // Hash links
    if (href.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }

    // External links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },

  // Code blocks + inline code using Sugar High
  code: ({ children, className, ...props }: CodeProps) => {
    const raw = String(children ?? "");
    const isInline = !raw.includes("\n");

    // Inline code – simple and in-line with palette
    if (isInline) {
      return (
        <code
          className={[
            "rounded bg-slate-900/60 px-1.5 py-0.5 text-sm font-mono text-yellow-200",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </code>
      );
    }

    // Multi-line code block – highlight with Sugar High
    const codeHTML = highlight(raw);

    return (
      <code
        className={[
          "block w-full overflow-x-auto rounded-lg bg-slate-900/70 px-4 py-3",
          "text-sm font-mono text-slate-100",
          "shadow-lg shadow-slate-900/60",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },

  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-4 border-l-4 border-slate-400 bg-orange-400/50 min-w-fit max-w-md pl-4 pr-2 py-2 italic text-slate-100 rounded-xl"
      {...props}
    />
  ),
};

export function useMDXComponents(
  otherComponents: MDXComponents = {}
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
  };
}
