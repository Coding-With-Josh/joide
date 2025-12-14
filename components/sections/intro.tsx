"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { trackClick } from "@/components/tracking";

export const Intro = () => {
  return (
    <div className="w-full px-6 md:px-12 mt-25 md:mt-40 flex flex-col gap-6 md:gap-8">
        {/* <Image
        src={require("@/assets/me.jpg")}
        alt="me"
        className="inset-0 scale-160 w-[300px] opacity-40 saturate-0 absolute mx-auto rounded-b-full"
        />
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between z-50"> */}
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          <h1 className="text-base sm:text-lg md:text-xl tracking-tighter font-medium">
            Hello! I&apos;m Joshua.
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-[90px] leading-tight md:leading-none max-w-3xl md:max-w-5xl tracking-tighter mt-2 md:mt-6 text-balance">
            A{" "}
            <span className="text-5xl sm:text-6xl md:text-[100px] tracking-tighter font-medium">
              15
            </span>{" "}
            year old blockchain developer focusing on building viable
            solutions...
          </h1>
        </div>

        <div className="lg:w-[320px] w-full lg:flex-none">
          <div className="rounded-2xl px-4 py-4 md:px-5 md:py-5">
            <p className="text-md font-semibold font-serif text-right text-muted-foreground">
              Connect with me on
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: "X", icon: "simple-icons:x", link: "https://x.com/josh_scriptz", eventType: "intro_x_click" },
                { label: "Discord", icon: "simple-icons:discord", link: "https://discord.com/users/josh_scriptz", eventType: "intro_discord_click" },
                { label: "Telegram", icon: "simple-icons:telegram", link: "https://t.me/josh_scriptz", eventType: "intro_telegram_click" },
                { label: "WhatsApp", icon: "simple-icons:whatsapp", link: "https://wa.me/+2348107198205", eventType: "intro_whatsapp_click" },
              ].map(({ label, icon, link, eventType }) => (
                <Link 
                  href={link} 
                  key={label} 
                  className="rounded-full border border-black/15 dark:border-white/20 px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 hover:scale-[1.02] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" 
                  target="_blank"
                  onClick={() => trackClick(eventType, { platform: label })}
                >
                  <button
                    key={label}
                    type="button"
                    className="flex items-center gap-2 "
                    aria-label={`Connect via ${label}`}
                  >
                    <Icon className="h-4 w-4" icon={icon} />
                    <span>{label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
