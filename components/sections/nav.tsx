"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ThemeSwitcher } from "../ui/theme-switcher";
import { ArrowUpRight, X } from "lucide-react";
import { Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/store", label: "Store" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
    
  return (
    <header className="sticky top-6 z-40 w-screen">
      <div
        className="mx-auto flex items-center justify-between px-6 md:px-12 py-4"
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="font-serif text-3xl font-bold">joide.fm</Link>
          <span className="h-7 w-px rounded-full bg-black/25 dark:bg-white/70 hidden md:block" />
          <p className="hidden text-sm leading-tight text-muted-foreground font-medium tracking-tighter text-balance md:block">
            Blockchain & Software developer
            <br />
            Based in Nigeria
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher className="hidden md:block" />
          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center transition hover:bg-accent/40"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            <span className="flex flex-col items-start justify-center gap-1.5">
              <span
                className={`block h-0.5 w-6 rounded-full bg-foreground transition shadow-xl ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-3 rounded-full bg-foreground transition shadow-xl ${
                  open ? "-translate-y-[5px] -rotate-45 w-6" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/25 w-screen h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-40 h-screen w-[min(320px,80vw)] border-l border-border bg-background px-6 py-8 shadow-2xl"
              initial={{ opacity: 0, x: 32, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="font-serif text-3xl font-bold">joide.fm</Link>
                <button
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent/60"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {links.map(({ href, label }) => {
                  const isStore = label === "Store";
                  const LinkComponent = isStore ? "div" : Link;
                  const linkProps = isStore
                    ? {}
                    : {
                        href,
                        onClick: () => setOpen(false),
                      };

                  return (
                    <LinkComponent
                      key={href}
                      {...linkProps}
                      className={`flex items-center justify-between text-lg font-medium tracking-tight py-2 px-4 rounded-full relative ${
                        isStore
                          ? "opacity-75 cursor-not-allowed overflow-hidden"
                          : "transition hover:text-foreground/80 dark:hover:text-white/80 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {isStore && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
                      )}
                      <div className="flex items-center gap-2 relative z-10">
                        <span>{label}</span>
                        {isStore && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-black/20 dark:border-white/20 bg-gradient-to-r from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground shadow-sm">
                            <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                            Soon
                          </span>
                        )}
                      </div>
                      {!isStore && <ArrowUpRight className="h-4 w-4" />}
                    </LinkComponent>
                  );
                })}
              </div>

              <div className="mt-8">
                <ThemeSwitcher className="w-fit" />
    </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
