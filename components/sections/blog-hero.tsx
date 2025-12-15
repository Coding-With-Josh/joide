"use client";

import { motion } from "motion/react";

export const BlogHero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-6 md:px-12 mt-20 md:mt-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div className="flex flex-col gap-4 md:gap-5 text-base md:text-lg tracking-tight text-muted-foreground">
          <p className="text-sm uppercase tracking-tighter text-muted-foreground">
            Notes & signals
          </p>
          <p>
            I share experiments, build logs, and distilled lessons from shipping
            products across blockchain and frontend stacks. Expect concise write-ups,
            code snippets, and practical checklists.
          </p>
        </div>

        <div className="flex justify-end">
          <h1 className="text-5xl md:text-6xl lg:text-[140px] font-semibold font-serif tracking-tight text-right leading-[0.9]">
            BLOG
          </h1>
        </div>
      </div>
    </motion.section>
  );
};

