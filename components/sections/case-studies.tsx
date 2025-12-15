import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getAllProjects } from "@/app/project";

// Use projects data directly to keep in sync
const studies = getAllProjects().map((project) => ({
  slug: project.slug,
  title: project.title,
  subtitle: project.subtitle,
  cover: project.cover,
}));

export const CaseStudies = () => {
  return (
    <section className="w-full px-6 md:px-12 mt-24 md:mt-32 flex flex-col gap-8 md:gap-10 py-10">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-lg md:text-2xl font-serif font-semibold italic">
          Case studies
        </h2>
        <div className="flex items-center gap-6 md:gap-10">
          <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
          <h2 className="text-base md:text-xl tracking-tight font-medium">
            Projects I&apos;ve worked on
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map(({ slug, title, subtitle, cover }, index) => (
          <Link key={slug} href={`/project/${slug}`}>
            <div className="overflow-hidden group cursor-pointer rounded-3xl">
              <div className="aspect-4/3 w-full overflow-hidden rounded-3xl relative transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src={cover}
                  alt={`${title} cover`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={index < 2}
                  loading={index < 2 ? undefined : "lazy"}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-300" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 px-4 py-4 md:px-5 md:py-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg md:text-xl font-serif font-semibold tracking-tight text-white">
                      {title}
                    </p>
                    <p className="text-xs md:text-sm tracking-tight text-white/80">
                      {subtitle}
                    </p>
                  </div>
                  <div
                    className={`
                      flex h-11 w-14 items-center justify-center rounded-full
                      border border-white/70 bg-white/90 text-black
                      transition-all duration-200 group-hover:scale-110 group-hover:bg-white
                    `}
                    aria-label={`View ${title}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
