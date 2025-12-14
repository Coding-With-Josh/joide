import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Github, Globe, ArrowUpRight, Twitter } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getProject } from "../index";

type Params = { params: Promise<{ slug: string }> };

// Disable caching for project pages during development
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectDetail({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black">
      <Nav />

      {/* Hero Section */}
      <article className="w-full mt-10">
        <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px]">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/70" />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 md:px-12 pb-12 md:pb-20">
              <div className="max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-4 text-sm text-white/90 mb-4 tracking-tighter">
                  <span className="uppercase tracking-[0.18em]">
                    {project.year}
                  </span>
                  <span>·</span>
                  <span>{project.category}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold tracking-tight text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-lg md:text-xl font-medium text-white/90 mb-6 tracking-tight max-w-2xl">
                  {project.subtitle}
                </p>
                <p className="text-base md:text-lg text-white/80 mb-8 tracking-tight max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/30 dark:border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium tracking-tighter text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full px-6 md:px-12 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Links Section */}
            {(project.liveUrl || project.repoUrl || project.xProfile) && (
              <div className="mb-16 pb-16 border-b border-black/10 dark:border-white/10">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                    <h2 className="text-sm uppercase text-muted-foreground font-medium">
                      Links
                    </h2>
                    <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 p-6 transition-all duration-300 hover:border-black/20 dark:hover:border-white/25 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                              <Globe className="h-6 w-6 text-foreground" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <h3 className="text-lg font-serif font-semibold tracking-tight">
                                Live Site
                              </h3>
                              <p className="text-sm text-muted-foreground tracking-tight line-clamp-1 truncate">
                                {project.liveUrl
                                  .replace(/^https?:\/\//, "")
                                  .replace(/\/$/, "")}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        </div>
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 p-6 transition-all duration-300 hover:border-black/20 dark:hover:border-white/25 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                              <Github className="h-6 w-6 text-foreground" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <h3 className="text-lg font-serif font-semibold tracking-tight">
                                GitHub
                              </h3>
                              <p className="text-sm text-muted-foreground tracking-tight line-clamp-1 truncate">
                                {project.repoUrl
                                  .replace(/^https?:\/\//, "")
                                  .replace(/\/$/, "")}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        </div>
                      </Link>
                    )}
                    {project.xProfile && (
                      <Link
                        href={project.xProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 p-6 transition-all duration-300 hover:border-black/20 dark:hover:border-white/25 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                              <Twitter className="h-6 w-6 text-foreground" />
                            </div>
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <h3 className="text-lg font-serif font-semibold tracking-tight">
                                X Profile
                              </h3>
                              <p className="text-sm text-muted-foreground tracking-tight line-clamp-1 truncate">
                                {project.xProfile
                                  .replace(/^https?:\/\//, "")
                                  .replace(/\/$/, "")
                                  .replace(/^x\.com\//, "@")
                                  .replace(/^twitter\.com\//, "@")}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight mt-10 mb-5">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-base md:text-lg leading-relaxed tracking-tight text-foreground mb-5">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-5 ml-4 tracking-tight">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-5 ml-4 tracking-tight">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-base md:text-lg leading-relaxed tracking-tight">
                      {children}
                    </li>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-sm font-mono tracking-tighter">
                        {children}
                      </code>
                    ) : (
                      <code className="block p-4 rounded-lg bg-black/5 dark:bg-white/10 text-sm font-mono tracking-tighter overflow-x-auto mb-5">
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-black/20 dark:border-white/20 pl-4 italic my-5 text-muted-foreground tracking-tight">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors tracking-tight"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold tracking-tight">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic tracking-tight">{children}</em>
                  ),
                }}
              >
                {project.content}
              </ReactMarkdown>
            </div>

            {/* Gallery Section */}
            {project.images && project.images.length > 1 && (
              <div className="mt-16 space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight mb-8">
                  Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.slice(1).map((image, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video overflow-hidden rounded-2xl border border-black/10 dark:border-white/15"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${idx + 2}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
