export const BlogCardsLoading = () => {
  return (
    <section className="w-full px-6 md:px-12 my-16 md:my-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="h-7 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden h-[1.5px] w-24 md:block bg-black/50 dark:bg-white/50" />
            <div className="h-5 w-48 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-black/5 dark:bg-white/5 animate-pulse" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white text-black dark:bg-black dark:text-white px-4 py-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                </div>
                <div className="mt-2 h-6 w-full bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                <div className="mt-1 h-4 w-3/4 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-black/10 dark:bg-white/10 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-black/10 dark:bg-white/10 rounded-full animate-pulse" />
                  </div>
                  <div className="h-9 w-20 bg-black/10 dark:bg-white/10 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

