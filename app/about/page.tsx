import { AboutHero } from "@/components/sections/about-hero";
import { Nav } from "@/components/sections/nav";
import { AboutGallery } from "@/components/sections/about-gallery";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { OpenSource } from "@/components/sections/open-source";
import React from "react";
import { Footer } from "@/components/sections/footer";

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
