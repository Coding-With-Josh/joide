import { Suspense } from "react";
import { BlogHero } from "@/components/sections/blog-hero";
import { BlogCardsServer } from "@/components/sections/blog-cards-server";
import { BlogCardsLoading } from "@/components/sections/blog-cards-loading";
import { Nav } from "@/components/sections/nav";
import React from "react";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joide.me";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles and insights from Joide on blockchain development, Web3, software engineering, and technology. Sharp, concise, and practical content.",
  keywords: [
    "Blog",
    "Blockchain",
    "Web3",
    "Software Development",
    "Technology",
    "Programming",
    "DeFi",
    "Solana",
  ],
  openGraph: {
    title: "Blog | Joide",
    description:
      "Read articles and insights from Joide on blockchain development, Web3, and software engineering.",
    url: `${baseUrl}/blog`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Joide Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Joide",
    description:
      "Read articles and insights on blockchain development and Web3.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

// Enable static generation for better performance
export const revalidate = 60;

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
      <Nav />
      <BlogHero />
      <Suspense fallback={<BlogCardsLoading />}>
        <BlogCardsServer />
      </Suspense>
    </div>
  );
};

export default Blog;
