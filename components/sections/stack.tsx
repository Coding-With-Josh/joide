import { Icon } from "@iconify/react";
import React from "react";

const stack = [
  { label: "React", icon: "simple-icons:react" },
  { label: "TypeScript", icon: "simple-icons:typescript" },
  { label: "Next.js", icon: "simple-icons:nextdotjs" },
  { label: "Node.js", icon: "simple-icons:nodedotjs" },
  { label: "GraphQL", icon: "simple-icons:graphql" },
  { label: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
  { label: "Docker", icon: "simple-icons:docker" },
  { label: "Git", icon: "simple-icons:git" },
  { label: "Kubernetes", icon: "simple-icons:kubernetes" },
  { label: "Ethereum", icon: "simple-icons:ethereum" },
  { label: "Solidity", icon: "simple-icons:solidity" },
  { label: "Web3.js", icon: "simple-icons:web3dotjs" },
  { label: "Bitcoin", icon: "simple-icons:bitcoin" },
  { label: "Solana", icon: "simple-icons:solana" },
  { label: "Sui", icon: "simple-icons:sui" },
  { label: "Python", icon: "simple-icons:python" },
  { label: "Go", icon: "simple-icons:go" },
  { label: "Rust", icon: "simple-icons:rust" },
  { label: "C", icon: "simple-icons:c" },
  { label: "C++", icon: "simple-icons:cplusplus" },
  { label: "C#", icon: "simple-icons:csharp" },
  { label: "PostgreSQL", icon: "simple-icons:postgresql" },
  { label: "MongoDB", icon: "simple-icons:mongodb" },
  { label: "React Native", icon: "simple-icons:react" },
  { label: "Jest", icon: "simple-icons:jest" },
];

export const Stack = () => {
  return (
    <section className="w-full px-6 md:px-12 mt-20 md:mt-28 flex flex-col gap-6 md:gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl md:text-2xl font-serif font-semibold italic">
          My Stack/Technologies
        </h2>
        <div className="flex items-center gap-6 md:gap-10">
          <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
          <h2 className="text-base md:text-xl tracking-tight font-medium">
            What I work with
          </h2>
        </div>{" "}
      </div>

      <div className="flex flex-wrap gap-3">
        {stack.map(({ label, icon }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-2 rounded-full border border-black/15 dark:border-white/20 bg-transparent px-4 py-2 text-sm md:text-base tracking-tight text-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            aria-label={label}
          >
            <Icon icon={icon} className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
