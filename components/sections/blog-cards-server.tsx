import Image from "next/image";
import Link from "next/link";
import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  cover: string;
};

async function getPosts(): Promise<Post[]> {
  const data = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(20);

  return data as Post[];
}

export const BlogCardsServer = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <section className="w-full px-6 md:px-12 my-16 md:my-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-lg md:text-2xl font-serif font-semibold italic">
              Latest posts
            </h2>
            <div className="flex items-center gap-6 md:gap-10">
              <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
              <p className="text-sm md:text-base tracking-tight text-muted-foreground">
                Sharp, concise, and practical.
              </p>
            </div>
          </div>

          <div className="col-span-full flex flex-col items-center justify-center py-20 md:py-24">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative mb-4">
                <svg
                  width="64"
                  height="64"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-black/70 dark:text-white/60"
                >
                  <path
                    d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-50"
                  />
                  <path
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-40"
                  />
                  <path
                    d="M8 7h8M8 11h8M8 15h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                </svg>
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full blur-xl animate-pulse" />
              </div>
              <h4 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mb-2">
                Nothing here (yet)
              </h4>
            </div>
            <div className="tracking-tight text-base md:text-lg text-muted-foreground max-w-lg mx-auto text-center space-y-2">
              <p>
                The blog is currently empty, but great content is on the way.
              </p>
              <p className="inline-flex items-center gap-2 text-center">
                <span className="inline-block animate-pulse">✨</span>
                <span className="font-medium">
                  I&apos;m crafting thoughtful posts that will be worth your
                  time.
                </span>
                <span className="inline-block animate-pulse delay-75">✨</span>
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground tracking-tighter">
              <span className="h-px w-12 bg-black/20 dark:bg-white/20" />
              <span>Check back soon</span>
              <span className="h-px w-12 bg-black/20 dark:bg-white/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 md:px-12 my-16 md:my-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-lg md:text-2xl font-serif font-semibold italic">
            Latest posts
          </h2>
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
            <p className="text-sm md:text-base tracking-tight text-muted-foreground">
              Sharp, concise, and practical.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map(
            (
              { id, title, summary, date, readTime, tags, cover, slug },
              index
            ) => (
              <Link
                key={id}
                href={`/blog/${slug}`}
                className="group relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={cover}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    priority={index < 2}
                    {...(index >= 2 && { loading: "lazy" })}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />

                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white text-black dark:bg-black dark:text-white px-4 py-4 shadow-lg backdrop-blur">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span>{date}</span>
                      <span>{readTime}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-serif md:text-xl font-semibold tracking-wide">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground tracking-tighter font-medium">
                      {summary}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/15 dark:border-white/25 bg-white/80 dark:bg-neutral-900/60 px-2.5 py-1 text-[11px] font-medium tracking-tight"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex h-9 min-w-[80px] items-center justify-center rounded-full border border-black/20 dark:border-white/25 bg-transparent text-sm font-medium tracking-tight transition-all duration-200 hover:scale-[1.02] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                        Read
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

