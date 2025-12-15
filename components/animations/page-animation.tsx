"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const PageAnimation = ({
  children,
  delay = 0,
  className = "",
}: PageAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

