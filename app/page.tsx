import { Suspense } from "react";
import { Intro } from "@/components/sections/intro";
import { CaseStudies } from "@/components/sections/case-studies";
import { Achievements } from "@/components/sections/achievements";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { BlogCardsServer } from "@/components/sections/blog-cards-server";
import { BlogCardsLoading } from "@/components/sections/blog-cards-loading";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joide.me";

export const metadata: Metadata = {
  title: "Joide - Blockchain & Software Developer | Joshua Idele",
  description:
    "Joshua Idele (Joide) - Blockchain developer and software engineer. Building innovative Web3 solutions, DeFi protocols, and modern web applications. Explore my projects, blog posts, and achievements.",
  keywords: [
    "Joshua Idele",
    "Joide",
    "Blockchain Developer",
    "Software Engineer",
    "Web3",
    "DeFi",
    "Solana Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Joide - Blockchain & Software Developer",
    description:
      "Joshua Idele (Joide) - Blockchain developer and software engineer. Building innovative Web3 solutions and modern applications.",
    url: baseUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Joide - Blockchain & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joide - Blockchain & Software Developer",
    description:
      "Joshua Idele (Joide) - Blockchain developer and software engineer.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
};

// Enable static generation for better performance
export const revalidate = 60;

export default function Home() {
  // Structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joshua Idele",
    alternateName: "Joide",
    jobTitle: "Blockchain Developer & Software Engineer",
    url: baseUrl,
    sameAs: [
      // Add your social media profiles here
      // "https://twitter.com/joide",
      // "https://github.com/joide",
    ],
    description:
      "Blockchain developer and software engineer building innovative Web3 solutions and modern applications.",
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Intro />
        <CaseStudies />
        <Achievements />
        <Stack />
        <Suspense fallback={<BlogCardsLoading />}>
          <BlogCardsServer />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
