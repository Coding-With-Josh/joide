import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";

type Params = { params: Promise<{ slug: string }> };

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joide.me";

async function getPost(slug: string) {
  const res = await fetch(
    `${baseUrl}/api/blog/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const url = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.cover.startsWith("http")
    ? post.cover
    : `${baseUrl}${post.cover}`;

  return {
    title: post.title,
    description: post.summary || post.description || `Read ${post.title} by Joide`,
    keywords: post.tags || [],
    authors: [{ name: "Joshua Idele", url: baseUrl }],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary || post.description,
      publishedTime: post.date,
      authors: ["Joshua Idele"],
      tags: post.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || post.description,
      images: [imageUrl],
      creator: "@joide",
    },
    alternates: {
      canonical: url,
    },
  };
}


export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary || post.description,
    image: post.cover.startsWith("http") ? post.cover : `${baseUrl}${post.cover}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Joshua Idele",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Joshua Idele",
    },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* Hero Section */}
      <article className="w-full">
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px]">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 md:px-12 pb-12 md:pb-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 text-sm text-white/90 mb-4 tracking-tighter">
                  <span className="uppercase tracking-[0.18em]">
                    {post.date}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-white mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-tighter text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight mt-8 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-base md:text-lg leading-relaxed tracking-tight text-foreground mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4 tracking-tight">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 tracking-tight">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-base md:text-lg leading-relaxed tracking-tight">
                      {children}
                    </li>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-sm font-mono tracking-tighter">
                        {children}
                      </code>
                    ) : (
                      <code className="block p-4 rounded-lg bg-black/5 dark:bg-white/10 text-sm font-mono tracking-tighter overflow-x-auto mb-4">
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-black/20 dark:border-white/20 pl-4 italic my-4 text-muted-foreground tracking-tight">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors tracking-tight"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold tracking-tight">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic tracking-tight">{children}</em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
