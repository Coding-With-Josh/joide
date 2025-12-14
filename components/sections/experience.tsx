import { BadgeCheck } from "lucide-react";
import React from "react";

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  summary: string;
  tags: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Founder & Builder",
    org: "Zypp Protocol, Solana Wearables, Dappr AI",
    period: "2024 - Present",
    summary:
      "Shipping Solana-native infra that smooths onboarding and automates on-chain routines.",
    tags: ["Solana", "Rust", "TypeScript", "DX"],
  },
  {
    role: "Contributor",
    org: "SuperteamNG",
    period: "2025 - Present",
    summary:
      "Collaborating on community initiatives, audits, and growth experiments for ecosystem projects.",
    tags: ["Audits", "Growth", "Community"],
  },
  {
    role: "Lead Engineer",
    org: "Freelance / Hackathons",
    period: "2022 - Present",
    summary:
      "Designed and delivered full-stack products across web3 and SaaS; multiple hackathon wins and finalist placements.",
    tags: ["React", "Next.js", "Smart Contracts", "Product"],
  },
];

export const Experience = () => {
  return (
    <section className="w-full px-6 md:px-12 my-16 md:my-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight">
              Roles & impact
            </h2>
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
            <h2 className="text-base md:text-xl tracking-tight font-medium">
              My experience as a developer
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experiences.map(({ role, org, period, summary, tags }) => (
            <div
              key={role}
              className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 p-5 "
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {org}
                  </p>
                  <h3 className="text-lg font-semibold font-serif">{role}</h3>
                  <p className="text-sm text-muted-foreground tracking-tight">
                    {period}
                  </p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-800/70">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground tracking-tighter">
                {summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 dark:border-white/20 bg-white/70 dark:bg-neutral-800/70 px-2.5 py-1 text-xs font-medium tracking-tight"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
