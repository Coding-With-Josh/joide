import type { Metadata } from "next";
import {
  Geist_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PageViewTracker } from "@/components/tracking";

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://joide.me";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Joide - Blockchain & Software Developer",
    template: "%s | Joide",
  },
  description:
    "Joshua Idele, popularly known as Joide, is a blockchain developer and software engineer. Building innovative solutions in Web3, DeFi, and modern web applications.",
  keywords: [
    "Joshua Idele",
    "Joide",
    "Blockchain Developer",
    "Software Engineer",
    "Web3",
    "DeFi",
    "Solana",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Joshua Idele", url: baseUrl }],
  creator: "Joshua Idele",
  publisher: "Joshua Idele",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Joide",
    title: "Joide - Blockchain & Software Developer",
    description:
      "Joshua Idele, popularly known as Joide, is a blockchain developer and software engineer. Building innovative solutions in Web3, DeFi, and modern web applications.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Joide - Blockchain & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joide - Blockchain & Software Developer",
    description:
      "Joshua Idele, popularly known as Joide, is a blockchain developer and software engineer.",
    images: ["/og.png"],
    creator: "@joide",
  },
  icons: {
    icon: [
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageViewTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
