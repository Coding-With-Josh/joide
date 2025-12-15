"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";
import { trackClick } from "@/components/tracking";

export const Intro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-6 md:px-12 mt-25 md:mt-40 flex flex-col gap-6 md:gap-8"
    >
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
          <div className="px-4 py-4 md:px-5 md:py-5">
            <p className="text-sm md:text-base font-medium text-right text-muted-foreground mb-4 tracking-tight">
              Connect with me on
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "X", icon: "simple-icons:x", link: "https://x.com/josh_scriptz", eventType: "intro_x_click" },
                { label: "Discord", icon: "simple-icons:discord", link: "https://discord.com/users/josh_scriptz", eventType: "intro_discord_click" },
                { label: "Telegram", icon: "simple-icons:telegram", link: "https://t.me/josh_scriptz", eventType: "intro_telegram_click" },
                { label: "WhatsApp", icon: "simple-icons:whatsapp", link: "https://wa.me/+2348107198205", eventType: "intro_whatsapp_click" },
              ].map(({ label, icon, link, eventType }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link} 
                    className="flex items-center gap-3 rounded-full border border-black/10 dark:border-white/10 bg-transparent dark:bg-neutral-900 px-4 py-2 text-sm md:text-base font-medium tracking-tight text-foreground hover:border-black/20 dark:hover:border-white/20 transition-all duration-200" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(eventType, { platform: label })}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" icon={icon} />
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
