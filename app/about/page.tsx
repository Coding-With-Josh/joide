import { AboutHero } from "@/components/sections/about-hero";
import { Nav } from "@/components/sections/nav";
import { AboutGallery } from "@/components/sections/about-gallery";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { OpenSource } from "@/components/sections/open-source";
import React from "react";
import { Footer } from "@/components/sections/footer";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joide.me";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Joshua Idele (Joide), a blockchain developer and software engineer. Discover my background, education, experience, and open source contributions.",
  keywords: [
    "About",
    "Joshua Idele",
    "Joide",
    "Blockchain Developer",
    "Software Engineer",
    "Portfolio",
    "Background",
    "Experience",
  ],
  openGraph: {
    title: "About | Joide",
    description:
      "Learn more about Joshua Idele (Joide), a blockchain developer and software engineer.",
    url: `${baseUrl}/about`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "About Joide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Joide",
    description: "Learn more about Joshua Idele (Joide), blockchain developer and software engineer.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

const About = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
      <Nav />
      <AboutHero />
      <AboutGallery />
      <Education />
      <Experience />
      <OpenSource />
      <Footer />
    </div>
  );
};

export default About;
