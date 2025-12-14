import { CalendarDays, MapPin } from "lucide-react";
import React from "react";

export const Education = () => {
  return (
    <section className="w-full px-6 md:px-12 my-16 md:my-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight">
              Growing the fundamentals
            </h2>
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
            <h2 className="text-base md:text-xl tracking-tight font-medium">
              My education as a student 😄
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-5 py-4 md:px-6 md:py-5 ">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg md:text-xl font-semibold font-serif">
              University Preparatory Secondary School
            </h3>
            <p className="text-sm text-muted-foreground">
              High school student, focused on deep fundamentals while shipping
              real products.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-800/60 px-3 py-1 font-medium tracking-tight">
              <CalendarDays className="h-4 w-4" />
              Expected graduation: 2027
            </span>
            <span className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-neutral-800/60 px-3 py-1 font-medium tracking-tight">
              <MapPin className="h-4 w-4" />
              Nigeria
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
