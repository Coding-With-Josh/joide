export const AboutHero = () => {
  return (
    <section className="w-full px-6 md:px-12 mt-20 md:mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div className="flex flex-col gap-4 md:gap-5 text-base md:text-lg tracking-tight text-muted-foreground">
          <p>
            I am a 15 year old blockchain developer with a keen interest in
            building innovative solutions that make life easier for everyone,
            especially fellow developers.
          </p>
          <p>
            My journey in the tech world has been driven by a desire to create
            impactful applications and tools that enhance productivity and user
            experience.
          </p>
        </div>

        <div className="flex justify-end">
          <h1 className="text-5xl md:text-6xl lg:text-[140px] font-semibold font-serif tracking-tight text-right leading-[0.9]">
            ABOUT
          </h1>
        </div>
      </div>
    </section>
  );
};
