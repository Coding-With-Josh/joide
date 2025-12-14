import Link from "next/link";
import React from "react";

type Repo = {
  name: string;
  description: string;
  tech: string[];
  link: string;
  stars?: string;
};

const repos: Repo[] = [
  // {
  //   name: "zyppsdk",
  //   description:
  //     "Solana-first automation + onboarding toolkit for wallets and teams.",
  //   tech: ["Solana", "Rust", "TypeScript"],
  //   link: "https://github.com/",
  //   stars: "⭐️",
  // },
  // {
  //   name: "rollup-kit",
  //   description:
  //     "Composable starter for L2/L3 rollups with typed contracts and dashboards.",
  //   tech: ["EVM", "Next.js", "Foundry"],
  //   link: "https://github.com/",
  // },
  // {
  //   name: "dev-dx-tools",
  //   description:
  //     "CLI and templates to spin up web3 apps with best-practice linting and tests.",
  //   tech: ["Node.js", "CLI", "Testing"],
  //   link: "https://github.com/",
  // },
];

export const OpenSource = () => {
  return (
    <section className="w-full px-6 md:px-12 my-16 md:my-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight">
              Repo & tooling
            </h2>
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
            <h2 className="text-base md:text-xl tracking-tight font-medium">
              My open source projects
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {repos.map(({ name, description, tech, link, stars }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 p-5 shadow-[0_15px_60px_-40px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/30"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
                {stars && <span className="text-sm">{stars}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground tracking-tight">
                {description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 dark:border-white/20 bg-white/70 dark:bg-neutral-800/70 px-2.5 py-1 text-xs font-medium tracking-tight"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
          {!repos.length && (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="flex flex-col items-center justify-center mb-4">
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mb-1 text-black/70 dark:text-white/60"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-40"
                  />
                  <path
                    d="M8 17c0-1.657 1.791-3 4-3s4 1.343 4 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                  <circle cx="9" cy="10" r="1" fill="currentColor" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" />
                  <path
                    d="M9 7c1.5-1 4.5-1 6 0"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    className="opacity-70"
                  />
                </svg>
                <h4 className="text-lg md:text-xl font-serif font-semibold tracking-tight mb-1">
                  Nothing here (yet)
                </h4>
              </div>
              <div className="tracking-tight text-base text-muted-foreground max-w-md mx-auto text-center">
                There are no open source projects to display at the moment.
                <br />
                <span className="inline-block text-center mt-2 animate-pulse">
                  Stay tuned... I’m building & shipping soon!
                </span>
              </div>
              <Link
                href="https://github.com/Coding-With-Josh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-5 py-2 bg-black tracking-tighter text-white dark:bg-white dark:text-black rounded-full font-medium shadow hover:scale-105 transition-transform text-sm"
              >
                Visit my GitHub
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
