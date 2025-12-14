"use client";

import { ArrowRight, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { trackClick } from "@/components/tracking";

export const Contact = () => {
  return (
    <section className="w-full px-6 md:px-12 my-24 md:my-32">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-orange-200/60 blur-3xl dark:bg-orange-400/20" />
          <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-blue-200/60 blur-3xl dark:bg-blue-400/20" />
        </div>

        <div className="relative flex flex-col gap-6 md:gap-8 p-6 md:p-10 lg:p-12">
          <div className="flex flex-col gap-3 md:gap-4 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Let&apos;s build
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-tight">
              Bring your next idea to life with cinematic clarity.
            </h2>
            <p className="text-base md:text-lg tracking-tighter text-muted-foreground md:max-w-2xl">
              I collaborate with teams to design, ship, and polish premium
              digital experiences, from core blockchain infrastructure to rich
              product interfaces, to actual problem solving.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border tracking-tight border-black/10 dark:border-white/15 bg-white/70 dark:bg-neutral-800/70 px-4 py-2 text-sm font-medium">
                Available for select projects
              </span>
              <span className="rounded-full border tracking-tight border-black/10 dark:border-white/15 bg-white/70 dark:bg-neutral-800/70 px-4 py-2 text-sm text-muted-foreground">
                Response under 24h
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="mailto:codewithjoshh@gmail.com"
                target="_blank"
                className="flex items-center gap-2 w-fit rounded-full border border-black/10 dark:border-white/15 bg-black text-white px-7 md:px-3 py-1.5 text-sm md:text-base tracking-tighter font-medium shadow-lg transition-all duration-200 hover:scale-[1.02] dark:bg-white dark:text-black"
                onClick={() => trackClick("email_click")}
              >
                <Mail className="h-4 w-4" />
                Email me
              </Link>
              <Link
                href="https://calendly.com/joide_fm"
                target="_blank"
                className="flex items-center gap-2 rounded-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm md:text-base tracking-tighter font-medium transition-all duration-200 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black"
                onClick={() => trackClick("book_call_click")}
              >
                <Calendar className="h-4 w-4" />
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
