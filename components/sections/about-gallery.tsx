"use client";

import Image from "next/image";
import { useState } from "react";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    alt: "Abstract network",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    alt: "Neon circuitry",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    alt: "Workspace mood",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    alt: "Gradient texture",
  },
];

export const AboutGallery = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="w-full px-6 md:px-12 my-16 md:my-24">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-lg md:text-2xl font-serif font-semibold italic">
            Gallery
          </h2>
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
            <h2 className="text-base md:text-xl tracking-tight font-medium">
              My life as a developer
            </h2>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-4">
          {[0, 2].map((start) => (
            <div
              key={start}
              className="flex gap-4"
              onMouseLeave={() => setActive(null)}
            >
              {gallery.slice(start, start + 2).map((item, idx) => {
                const index = start + idx;
                const isActive = active === index;
                const basis = isActive
                  ? "flex-[1.2]"
                  : active === null
                  ? "flex-1"
                  : "flex-[0.8]";
                return (
                  <div
                    key={item.src}
                    className={`relative h-96 overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 transition-all duration-300 ${basis}`}
                    onMouseEnter={() => setActive(index)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300"
                      style={{
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {gallery.map((item) => (
            <div
              key={item.src}
              className="relative h-64 overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
