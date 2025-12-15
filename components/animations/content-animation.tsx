"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ContentAnimationProps {
  children: ReactNode;
  delay?: number;
}

export const ContentAnimation = ({
  children,
  delay = 0.2,
}: ContentAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

