import { Intro } from "@/components/sections/intro";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Nav } from "@/components/sections/nav";
import { Achievements } from "@/components/sections/achievements";
import { Stack } from "@/components/sections/stack";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
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
