export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
  content: string;
  tech: string[];
  year: string;
  category: string;
  liveUrl?: string;
  repoUrl?: string;
  xProfile?: string;
  images?: string[];
};

// Project data - in a real app, this could come from a CMS or API
export const projects: Project[] = [
  {
    slug: "zypp",
    title: "Zypp Protocol",
    subtitle: "Solana, DeFi",
    cover: "/zypp/cover.png",
    description: "The payment engine for offline Solana transactions.",
    content: `## Overview

Zypp Protocol is an offline-first payment and settlement layer built for real-world usage. It enables fast, reliable transactions even in low or no-connectivity environments, with secure on-chain settlement once connectivity is restored.

## The Challenge

Reliable internet access remains a major barrier to everyday digital payments in many regions. Most blockchain and payment systems depend on constant connectivity, making them impractical for real-world, on-the-ground commerce.

## The Solution

Zypp Protocol introduces a resilient transaction layer that allows users to send, receive, and manage value offline, while ensuring secure on-chain settlement when devices reconnect. Zypp bridges the gap between blockchain infrastructure and real-world payment conditions.

### Key Features

- **Offline Transactions** — Send and receive payments without internet access  
- **On-Chain Settlement** — Secure finalization once connectivity is restored  
- **Developer-Friendly APIs** — Easy integration for wallets and applications  
- **Built for Reliability** — Designed for imperfect networks and real environments  

## Results

Zypp Protocol unlocks reliable digital payments where traditional systems fail, enabling broader adoption, new markets, and practical decentralized finance at scale.`,
    tech: ["React Native", "Solana", "Rust", "TypeScript", "JavaScript", "PostgreSQL", "BLE", "NFC", "QR Code", "Bluetooth"],
    year: "2025",
    category: "Mobile and SDK",
    liveUrl: "https://zypp.fun",
    repoUrl: "https://github.com/zyppprotocol",
    xProfile: "https://x.com/use_zypp",
    images: [
      "/zypp/1.png",
      "/zypp/2.png",
      "/zypp/3.png",
    ],
  },
  {
    slug: "dappr-ai",
    title: "Dappr AI",
    subtitle: "Solana, AI",
    cover:
      "/dappr/cover.png",
    description:
      "An AI-Powered no-code platform for building Solana dapps.",
    content: `## Overview

Dappr AI is an AI-powered no-code platform for building Solana dapps.

## The Vision

Dappr AI was conceived to democratize blockchain development by allowing anyone, regardless of coding experience, to quickly build and deploy robust decentralized applications on Solana. The goal is to drastically reduce the complexity barrier so creators, founders, and enterprises can focus on the "what" not the "how."

## Key Features

- **No-Code Builder**: A visual builder for building solana dapps, without writing a single line of code.
- **AI Prompt-To-Dapp**: Write a prompt and get a dapp in seconds.
- **Solana Native**: Built on top of the Solana blockchain, enabling fast transactions and cost-effective deployments.
- **Prebuilt Templates & Modules**: Launch NFT marketplaces, or custom dapps by simply customizing templates.
- **Secure Deployments**: Automated contract verification and one-click mainnet/testnet deployments.
- **Analytics**: Built-in analytics so you can monitor performance and user adoption.

## How It Works

1. **Sign Up & Project Creation**: Log in and create a new dapp project right from your dashboard.
2. **Drag & Drop Components**: Use the visual editor to architect your dapp's contracts and UI.
3. **AI Guidance**: Ask AI how to structure your dapp, let it generate business logic, or automatically debug issues.
4. **Test Instantly**: Preview your dapp on Solana devnet in seconds with auto-mocked blockchain data.
5. **One-Click Launch**: Deploy to mainnet, with built-in analytics so you can monitor performance and user adoption.

## Results & Impact

NOT YET LIVE
`,
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "@solana/web3.js", "Rust", "PostgreSQL"],
    year: "2025",
    category: "No-code Platform",
    // liveUrl: "https://dappr.fun",
    // repoUrl: "https://github.com/dappr-ai",
    xProfile: "https://x.com/dapprdotfun",
    images: [
      "/dappr/1.png",
      "/dappr/2.png",
    ],
  },
  {
    slug: "solanawearables",
    title: "Solana Wearables",
    subtitle: "Solana, NFTs",
    cover:
      "/solanawearables/cover.png",
    description:
      "A wearable ecosystem built on the Solana blockchain.",
    content: `## Overview

Solana Wearables is a wearable ecosystem built on the Solana blockchain. It allows you to wear your chain on your body and interact with them.

## Features

- **Wearable NFTs**: Wear your chain on your body and interact with them.
- **Wearable Marketplace**: Buy and sell wearable NFTs.
- **Wearable Wallet**: Connect your wallet to your wearable and interact with them.
- **Wearable Analytics**: Track your wearable's performance and user adoption.

## Security First

Security was our top priority. Every component was audited, and we implemented multiple layers of protection to ensure user funds are always safe.

## Results

STILL IN EARLY DEVELOPMENT.`,
    tech: ["Arduino", "Raspberry Pi", "Python", "C++", "LVGL", "Zephyr", "Bluetooth", "WiFi"],
    year: "2025",
    category: "Hardware",
    // liveUrl: "https://solanawearables.com",
    repoUrl: "https://github.com/solanawearables",
    xProfile: "https://x.com/solanawearables",
    images: [
      "/solanawearables/cover.png",
    ],
  },
  {
    slug: "sync-ai",
    title: "Sync AI",
    subtitle: "Blockchain, Launchpad",
    cover:
      "/syncai/cover.png",
    description:
      "A multi-chain launchpad for Solana projects.",
    content: `## Overview

Sync AI is a multi-chain launchpad for Solana projects. It allows you to launch your token on multiple chains and get funding from the community.

## Features

- **Multi-Chain Support**: Launch your token on multiple chains.
- **AI-Powered Launchpad**: Use AI to help you launch your token.
- **Community Funding**: Get funding from the community.
- **Analytics**: Track your token's performance and user adoption.

## Design Process

We focused on creating an interface that is easy to use and doesn't get in the way of the user's experience.`,
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "@solana/web3.js", "@solana/spl-token"],
    year: "2025",
    category: "Web Application",
    liveUrl: "https://sync-launch-pad.vercel.app",
    repoUrl: "https://github.com/Coding-With-Josh/sync-ai",
    // xProfile: "https://x.com/syncaidotfun",
    images: [
      "/syncai/cover.png",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
