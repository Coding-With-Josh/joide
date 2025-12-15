"use client";

import { ArrowUpRight, Award, Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

type Achievement = {
  title: string;
  org: string;
  year: string;
  highlight: string;
  detail: string;
  link: string;
};

const achievements: Achievement[] = [
  {
    title: "Youngest Solana Founder",
    org: "SOL GLOBAL",
    year: "2025",
    highlight: "Founder at 15",
    detail:
      "Un-Officially the youngest Solana founder in the world, founding Zypp Protocol at 15 years",
    link: "https://x.com/josh_scriptz/status/1995254920442794226",
  },
  {
    title: "Contributor at SuperteamNG",
    org: "SUPERTEAM DAO",
    year: "2025",
    highlight: "Contributor",
    detail:
      "Promoted to the role of a contributor in the SuperteamNG community.",
    link: "https://x.com/josh_scriptz/status/1941937538760949928",
  },
  {
    title: "Most active at Google DevFest Benin 2025",
    org: "Google DevFest Benin",
    year: "2025",
    highlight: "Most active",
    detail:
      "Was declared the most active attendee at the Google DevFest Benin 2025 and was given some spicy merch.",
    link: "https://gdg.community.dev/events/details/google-gdg-benin-presents-devfest-benin-2025/",
  },
  {
    title: "Emerged 2nd in the NASA Space Apps Challenge Benin 2025",
    org: "Google DevFest Benin",
    year: "2025",
    highlight: "Most active",
    detail:
      "My team emerged 2nd in the NASA Space Apps Challenge Benin 2025 and was given the sum of 700,000 Naira.",
    link: "https://spaceapps.nasa.gov/benin",
  },
];

export const Achievements = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-6 md:px-12 mt-24 md:mt-32 flex flex-col gap-8 md:gap-10 py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center flex-row-reverse justify-between gap-6"
      >
        <h2 className="text-lg md:text-2xl font-serif font-semibold italic">
          Achievements
        </h2>
        <div className="flex items-center gap-6 md:gap-10">
          <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
          <h2 className="text-base md:text-xl tracking-tight font-medium">
            Exceptional things I&apos;ve done
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {achievements.map(
          ({ title, org, year, highlight, detail, link }, idx) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-linear-to-br from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.45)] backdrop-blur p-6 md:p-7"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-orange-300/25 blur-3xl dark:bg-orange-400/15" />
                <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-400/15" />
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-tighter text-muted-foreground">
                    {org} · {year}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold md:tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground tracking-tighter">
                    {detail}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-800/70 backdrop-blur">
                  {idx === 0 || idx === 3 ? (
                    <Trophy className="h-5 w-5" />
                  ) : (
                    <Award className="h-5 w-5" />
                  )}
                </span>
              </div>

              <div className="relative mt-5 flex items-center justify-between">
                <span className="rounded-full border border-black/15 dark:border-white/20 bg-white/70 dark:bg-neutral-800/70 px-3 py-1 text-xs md:text-sm font-medium tracking-tighter">
                  {highlight}
                </span>
                <Link
                  href={link}
                  className={`
                  flex h-11 w-14 items-center justify-center rounded-full
                  border border-white/70 bg-black/90 text-white dark:bg-white/90 dark:text-black
                  transition-all duration-200 hover:scale-105
                `}
                  aria-label={`Open ${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </motion.section>
  );
};
