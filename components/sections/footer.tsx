import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { ThemeSwitcher } from "../ui/theme-switcher-footer";

const socials = [
  { label: "X", icon: "simple-icons:x", href: "https://x.com/josh_scriptz" },
  {
    label: "Discord",
    icon: "simple-icons:discord",
    href: "https://discord.com/users/josh_scriptz",
  },
  {
    label: "Telegram",
    icon: "simple-icons:telegram",
    href: "https://t.me/josh_scriptz",
  },
  {
    label: "WhatsApp",
    icon: "simple-icons:whatsapp",
    href: "https://wa.me/+2348107198205",
  },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-black dark:bg-white dark:text-black text-white">
      <div className="flex flex-col gap-6 px-12 py-10 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-3xl font-bold">joide.fm</h1>
          <span className="hidden h-9 w-px bg-white/40 dark:bg-black/40 md:block" />
          <div className="flex flex-col text-sm md:text-base font-medium tracking-tight text-white/80 dark:text-black/60 leading-snug">
            <span>Blockchain &amp; Software developer</span>
            <span>Based in Nigeria</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <ThemeSwitcher className="self-start md:self-end" />
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, icon, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border dark:border-black/25 border-white/25 px-3 py-1.5 text-sm font-medium tracking-tight dark:text-black text-white transition-all duration-200 hover:scale-[1.02] dark:hover:bg-black hover:bg-white dark:hover:text-white hover:text-black"
              >
                <Icon icon={icon} className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
