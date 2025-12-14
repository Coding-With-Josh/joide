import { BlogHero } from "@/components/sections/blog-hero";
import { BlogCards } from "@/components/sections/blog-cards";
import { Nav } from "@/components/sections/nav";
import React from "react";

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
      <Nav />
      <BlogHero />
      <BlogCards />
    </div>
  );
};

export default Blog;

