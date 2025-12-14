import { Intro } from "@/components/sections/intro";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Nav } from "@/components/sections/nav";
import { Achievements } from "@/components/sections/achievements";
import { Stack } from "@/components/sections/stack";
import { Footer } from "@/components/sections/footer";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joide.me";

export const metadata: Metadata = {
  title: "Home",
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
      <Intro />
      <CaseStudies />
      <Achievements />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}
