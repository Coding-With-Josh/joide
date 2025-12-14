"use client";

import { Nav } from "@/components/sections/nav";
import { deletePost, fetchPosts, savePost } from "./actions";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OutlineInput = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="flex flex-col gap-1 text-sm font-medium tracking-tight">
    <span className="text-xs uppercase tracking-tighter text-muted-foreground">
      {label}
    </span>
    <input
      className="w-full placeholder:tracking-tighter rounded-lg border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 text-sm tracking-tight focus:border-black focus:dark:border-white outline-none"
      {...props}
    />
  </label>
);

const OutlineTextArea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <label className="flex flex-col gap-1 text-sm font-medium tracking-tight">
    <span className="text-xs uppercase tracking-tighter text-muted-foreground">
      {label}
    </span>
    <textarea
      className="w-full placeholder:tracking-tighter rounded-lg border border-black/15 dark:border-white/20 bg-transparent px-3 py-2 text-sm tracking-tight focus:border-black focus:dark:border-white outline-none resize-y min-h-[120px]"
      {...props}
    />
  </label>
);

const OutlineButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="rounded-full border border-black/20 dark:border-white/25 px-4 py-2 text-sm font-medium tracking-tight transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    {...props}
  >
    {children}
  </button>
);

const SectionWrap = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground tracking-tight">
            {description}
          </p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalExited, setModalExited] = useState(false);
  const [password, setIsPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string>("Posts");

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setTimeout(() => setModalExited(true), 400);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setError("Invalid password");
      setLoading(false);
      return;
    }
    handleAuthentication();
    setLoading(false);
  };

  if (!isAuthenticated && !modalExited) {
    return (
      <div className="flex flex-col min-h-screen overflow-x-hidden items-center justify-center w-screen h-screen bg-zinc-100 dark:bg-black transition-colors duration-500">
        <div
          className={`relative border dark:border-white/25 border-black/25 rounded-3xl bg-white/80 dark:bg-zinc-900/90 shadow-[0_15px_60px_-40px_rgba(0,0,0,0.38)] p-0 sm:p-0 flex items-center justify-center transition-all duration-400 ease-in-out
            ${
              isAuthenticated
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100"
            }
          `}
          style={{
            width: "100%",
            maxWidth: "460px",
            minWidth: "340px",
            minHeight: "440px",
            boxSizing: "border-box",
          }}
        >
          <div className="w-full h-full flex flex-col items-start px-10 py-12">
            <div className="flex flex-col gap-2 mb-3">
              <h2 className="text-4xl font-serif font-semibold">
                Are you authorized to access this page?
              </h2>
              <h2 className="text-xl font-sans tracking-tight font-medium opacity-80">
                Enter the access key to unlock this page.
              </h2>
            </div>
            <form
              className="flex flex-col gap-7 mt-6 items-start w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row gap-2 w-full justify-center mb-2 mt-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <input
                    key={idx}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="w-14 h-16 text-center bg-transparent border border-black/25 dark:border-white/25 rounded-lg text-3xl font-bold outline-none focus:border-black focus:dark:border-white transition-all shadow-sm"
                    value={password[idx] || ""}
                    autoFocus
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, "");
                      if (v.length > 1) return;
                      const arr = password.split("");
                      arr[idx] = v;
                      setIsPassword(arr.join("").slice(0, 6));
                      if (v && idx < 5) {
                        const next = document.getElementById(`otp-${idx + 1}`);
                        if (next) (next as HTMLInputElement).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !password[idx] && idx > 0) {
                        const prev = document.getElementById(`otp-${idx - 1}`);
                        if (prev) (prev as HTMLInputElement).focus();
                      }
                    }}
                    id={`otp-${idx}`}
                    autoComplete="off"
                  />
                ))}
              </div>
              {error && (
                <span className="text-red-600 text-sm font-medium">
                  {error}
                </span>
              )}
              <button
                type="submit"
                className={`mt-4 w-full rounded-lg bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-semibold tracking-tight hover:bg-neutral-800 hover:dark:bg-neutral-200 transition-all duration-300 disabled:opacity-60 text-lg flex items-center justify-center gap-2 relative`}
                disabled={loading || password.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white dark:text-black" />
                    <span className="ml-2">Checking...</span>
                  </>
                ) : (
                  "Unlock"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen overflow-x-hidden items-start bg-zinc-50 dark:bg-black transition-all duration-500 ease-in-out ${
        !modalExited ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <Nav />
      <div className="w-full px-6 md:px-12 py-10 mt-20">
        <div className="mx-auto max-w-6xl flex gap-10">
          <aside className="w-56 shrink-0 flex flex-col gap-4 border-r border-black/10 dark:border-white/10 pr-6">
            <p className="text-xs uppercase tracking-tighter text-muted-foreground">
              Admin
            </p>
            {["Posts", "Site Metrics"].map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`text-sm font-bold font-serif text-left transition-colors ${
                  active === key
                    ? "text-black dark:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {key}
              </button>
            ))}
          </aside>

          <section className="flex-1 flex flex-col gap-10">
            {active === "Posts" && <PostsPanel />}
            {active === "Site Metrics" && <SiteMetricsPanel />}
          </section>
        </div>
      </div>
    </div>
  );
};

const PostsPanel = () => {
  type Post = {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover: string;
    date: string;
    readTime: string;
    tags: string[];
    published?: boolean | null;
  };

  const [draft, setDraft] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    cover: "",
    date: "",
    readTime: "",
    tags: "",
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const parseTags = (value: string) =>
    value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = (await fetchPosts()) as Post[];
      setPosts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    // Set default date when component mounts (for new posts)
    if (!draft.date && !editingId) {
      setDraft((d) => ({ ...d, date: formatDate(new Date()) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetDraft = () =>
    setDraft({
      title: "",
      slug: "",
      summary: "",
      content: "",
      cover: "",
      date: formatDate(new Date()),
      readTime: "",
      tags: "",
    });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const slug = draft.slug || generateSlug(draft.title);
    const payload = {
      title: draft.title,
      slug: slug,
      summary: draft.summary,
      content: draft.content,
      cover: draft.cover,
      date: draft.date,
      readTime: draft.readTime,
      tags: parseTags(draft.tags),
      published: true,
    };
    try {
      await savePost(payload, editingId ?? undefined);
      resetDraft();
      setEditingId(null);
      await loadPosts();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setDraft({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content,
      cover: post.cover,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags.join(", "),
    });
  };

  const handleDelete = async (id: number) => {
    setSaving(true);
    setError(null);
    try {
      await deletePost(id);
      if (editingId === id) {
        setEditingId(null);
        resetDraft();
      }
      await loadPosts();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionWrap
      title="Posts"
      description="Create, edit, and manage blog posts."
    >
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OutlineInput
          label="Title"
          value={draft.title}
          onChange={(e) => {
            const newTitle = e.target.value;
            setDraft((d) => {
              // Auto-generate slug only if:
              // 1. It's a new post (not editing), OR
              // 2. The slug is empty, OR
              // 3. The slug matches the previously generated slug from the title
              const shouldAutoGenerate =
                !editingId || !d.slug || d.slug === generateSlug(d.title);
              return {
                ...d,
                title: newTitle,
                slug: shouldAutoGenerate ? generateSlug(newTitle) : d.slug,
              };
            });
          }}
        />
        <OutlineInput
          label="Slug"
          value={draft.slug}
          onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
          placeholder="auto-generated from title"
        />
        <OutlineInput
          label="Date"
          value={draft.date}
          onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          placeholder="auto-generated"
        />
        <OutlineInput
          label="Read time"
          value={draft.readTime}
          onChange={(e) =>
            setDraft((d) => ({ ...d, readTime: e.target.value }))
          }
        />
        <OutlineInput
          label="Cover URL"
          value={draft.cover}
          onChange={(e) => setDraft((d) => ({ ...d, cover: e.target.value }))}
        />
        <OutlineInput
          label="Tags (comma separated)"
          value={draft.tags}
          onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value }))}
        />
        <OutlineTextArea
          label="Summary"
          rows={3}
          value={draft.summary}
          onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
        />
      </div>
      <div className="md:col-span-2">
        <OutlineTextArea
          label="Content (Markdown & HTML supported)"
          rows={16}
          value={draft.content}
          onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
        />
      </div>
      <div className="flex items-center gap-3">
        <OutlineButton onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update post" : "Save post"}
        </OutlineButton>
        {editingId && (
          <OutlineButton
            onClick={() => {
              setEditingId(null);
              resetDraft();
            }}
          >
            Cancel edit
          </OutlineButton>
        )}
      </div>
      <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
        {loading ? (
          <div className="py-6 text-sm text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="py-6 tracking-tighter text-sm text-muted-foreground">
            No posts yet.
          </div>
        ) : (
          posts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">
                  {item.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.date} · {item.readTime}
                </span>
              </div>
              <div className="flex gap-2">
                <OutlineButton onClick={() => handleEdit(item)}>
                  Edit
                </OutlineButton>
                <OutlineButton onClick={() => handleDelete(item.id)}>
                  Delete
                </OutlineButton>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionWrap>
  );
};

const SiteMetricsPanel = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const [timeRange, setTimeRange] = useState<string>("all");
  const [webMetrics, setWebMetrics] = useState<{
    aggregated: Record<string, number>;
    timeSeriesData: Record<string, Array<{ time: string; count: number }>>;
    searchCount: number;
    totalEvents: number;
    timeRange: string;
  }>({
    aggregated: {},
    timeSeriesData: {},
    searchCount: 0,
    totalEvents: 0,
    timeRange: "all",
  });
  const [blogMetrics, setBlogMetrics] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        // Load web metrics with time range
        const metricsRes = await fetch(
          `/api/admin/metrics?timeRange=${timeRange}`
        );
        if (metricsRes.ok) {
          const webData = await metricsRes.json();
          setWebMetrics(webData);
        }

        // Load blog metrics
        const posts = await fetchPosts();
        const total = Array.isArray(posts) ? posts.length : 0;
        const published = Array.isArray(posts)
          ? posts.filter((p: { published?: boolean | null }) => p.published)
              .length
          : 0;
        const drafts = total - published;

        setBlogMetrics({
          totalPosts: total,
          publishedPosts: published,
          draftPosts: drafts,
        });
      } catch (err) {
        console.error("Failed to load metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [timeRange]);

  const getMetricValue = (key: string) => webMetrics.aggregated[key] || 0;
  const pageViews = getMetricValue("page_view");
  const emailClicks = getMetricValue("email_click");
  const bookCallClicks = getMetricValue("book_call_click");
  const xClicks = getMetricValue("intro_x_click");
  const discordClicks = getMetricValue("intro_discord_click");
  const telegramClicks = getMetricValue("intro_telegram_click");
  const whatsappClicks = getMetricValue("intro_whatsapp_click");

  const timeRangeOptions = [
    { value: "30m", label: "30 min" },
    { value: "1h", label: "1 hour" },
    { value: "1d", label: "1 day" },
    { value: "1w", label: "1 week" },
    { value: "1m", label: "1 month" },
    { value: "all", label: "All time" },
  ];

  const ChartBar = ({ label, value }: { label: string; value: number }) => {
    return (
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium tracking-tighter">{label}</span>
        <span className="text-muted-foreground tracking-tighter">{value}</span>
      </div>
    );
  };

  // Transform time series data for recharts
  const transformTimeSeriesData = (
    data: Array<{ time: string; count: number }>
  ) => {
    if (!data || data.length === 0) return [];
    const sorted = [...data].sort((a, b) => a.time.localeCompare(b.time));
    return sorted.map((d) => ({
      time: d.time.length > 10 ? d.time.slice(5, 10) : d.time,
      value: d.count,
    }));
  };

  // Prepare engagement data for bar chart
  const engagementData = [
    { name: "Page Views", value: pageViews },
    { name: "Email Clicks", value: emailClicks },
    { name: "Book a Call", value: bookCallClicks },
    { name: "Search", value: webMetrics.searchCount },
  ];

  // Prepare social media data for pie chart
  const socialMediaData = [
    { name: "X", value: xClicks, color: "#000000" },
    { name: "Discord", value: discordClicks, color: "#5865F2" },
    { name: "Telegram", value: telegramClicks, color: "#2596BE" },
    { name: "WhatsApp", value: whatsappClicks, color: "#25D366" },
  ].filter((item) => item.value > 0);

  // Prepare combined time series data
  const combinedTimeSeries = () => {
    const allTimes = new Set<string>();
    Object.values(webMetrics.timeSeriesData).forEach((series) => {
      series.forEach((d) => allTimes.add(d.time));
    });

    const sortedTimes = Array.from(allTimes).sort();
    return sortedTimes.map((time) => {
      const shortTime = time.length > 10 ? time.slice(5, 10) : time;
      return {
        time: shortTime,
        "Page Views":
          webMetrics.timeSeriesData["page_view"]?.find((d) => d.time === time)
            ?.count || 0,
        "Email Clicks":
          webMetrics.timeSeriesData["email_click"]?.find((d) => d.time === time)
            ?.count || 0,
        "Book a Call":
          webMetrics.timeSeriesData["book_call_click"]?.find(
            (d) => d.time === time
          )?.count || 0,
      };
    });
  };

  return (
    <SectionWrap
      title="Site Metrics"
      description="Real-time tracking of website interactions and engagement."
    >
      {/* Time Range Selector */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-tighter text-muted-foreground">
            Time Range
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 text-sm font-medium tracking-tighter rounded-full border transition-all duration-200 ${
                timeRange === option.value
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm scale-[1.02]"
                  : "border-black/15 dark:border-white/20 bg-transparent hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Blog Stats */}
        <div>
          <h3 className="text-sm font-semibold tracking-tighter mb-4 text-muted-foreground uppercase">
            Blog Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-lg border border-black/15 dark:border-white/20">
              <span className="text-xs uppercase tracking-tighter text-muted-foreground">
                Total Posts
              </span>
              {loading ? (
                <div className="flex items-center justify-center h-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <span className="text-2xl font-serif font-semibold tracking-tighter">
                  {blogMetrics.totalPosts}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-lg border border-black/15 dark:border-white/20">
              <span className="text-xs uppercase tracking-tighter text-muted-foreground">
                Published
              </span>
              {loading ? (
                <div className="flex items-center justify-center h-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <span className="text-2xl font-serif font-semibold tracking-tighter">
                  {blogMetrics.publishedPosts}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-lg border border-black/15 dark:border-white/20">
              <span className="text-xs uppercase tracking-tighter text-muted-foreground">
                Drafts
              </span>
              {loading ? (
                <div className="flex items-center justify-center h-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <span className="text-2xl font-serif font-semibold tracking-tighter">
                  {blogMetrics.draftPosts}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Web Metrics Charts */}
        <div>
          <h3 className="text-sm font-semibold tracking-tighter mb-4 text-muted-foreground uppercase">
            Web Engagement
          </h3>
          <div className="flex flex-col gap-6 p-6 rounded-lg border border-black/15 dark:border-white/20">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <ChartBar label="Website Visits" value={pageViews} />
                <ChartBar label="Email Me Clicks" value={emailClicks} />
                <ChartBar label="Book a Call Clicks" value={bookCallClicks} />
                <ChartBar
                  label="Searched for joide.me"
                  value={webMetrics.searchCount}
                />
              </>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <h3 className="text-sm font-semibold tracking-tighter mb-4 text-muted-foreground uppercase">
            Analytics Dashboard
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Combined Engagement */}
            <div className="p-6 rounded-lg border border-black/15 dark:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-tighter">
                  Engagement Trends
                </span>
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : combinedTimeSeries().length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={combinedTimeSeries()}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-black/10 dark:stroke-white/10"
                    />
                    <XAxis
                      dataKey="time"
                      tick={{
                        fill: "currentColor",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                        className: "tracking-tighter",
                      }}
                      stroke="currentColor"
                      style={{ opacity: 0.4 }}
                    />
                    <YAxis
                      tick={{
                        fill: "currentColor",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                        className: "tracking-tighter",
                      }}
                      stroke="currentColor"
                      style={{ opacity: 0.4 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark
                          ? "rgba(0, 0, 0, 0.95)"
                          : "rgba(255, 255, 255, 0.98)",
                        border: isDark
                          ? "1px solid rgba(255, 255, 255, 0.15)"
                          : "1px solid rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontFamily: "var(--font-sans)",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(0, 0, 0, 0.9)",
                      }}
                      labelStyle={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        fontSize: "13px",
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(0, 0, 0, 0.95)",
                      }}
                      itemStyle={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        letterSpacing: "-0.01em",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                      }}
                      formatter={(value: number | string) =>
                        Math.round(Number(value))
                      }
                    />
                    <Legend
                      wrapperStyle={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        letterSpacing: "-0.01em",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.7)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Page Views"
                      stroke={isDark ? "#818cf8" : "#6366f1"}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: isDark ? "#818cf8" : "#6366f1" }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Email Clicks"
                      stroke={isDark ? "#f472b6" : "#ec4899"}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: isDark ? "#f472b6" : "#ec4899" }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Book a Call"
                      stroke={isDark ? "#4ade80" : "#22c55e"}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: isDark ? "#4ade80" : "#22c55e" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-sm text-muted-foreground tracking-tighter">
                  No data available
                </div>
              )}
            </div>

            {/* Bar Chart - Engagement Comparison */}
            <div className="p-6 rounded-lg border border-black/15 dark:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-tighter">
                  Engagement Comparison
                </span>
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-black/10 dark:stroke-white/10"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: "currentColor",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                        className: "tracking-tighter",
                      }}
                      stroke="currentColor"
                      style={{ opacity: 0.4 }}
                    />
                    <YAxis
                      tick={{
                        fill: "currentColor",
                        fontSize: 12,
                        fontFamily: "var(--font-serif)",
                        className: "tracking-tighter",
                      }}
                      stroke="currentColor"
                      style={{ opacity: 0.4 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark
                          ? "rgba(0, 0, 0, 0.95)"
                          : "rgba(255, 255, 255, 0.98)",
                        border: isDark
                          ? "1px solid rgba(255, 255, 255, 0.15)"
                          : "1px solid rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontFamily: "var(--font-serif)",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(0, 0, 0, 0.9)",
                      }}
                      labelStyle={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        fontSize: "13px",
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(0, 0, 0, 0.95)",
                      }}
                      itemStyle={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "12px",
                        letterSpacing: "-0.01em",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                      }}
                      formatter={(value: number | string) =>
                        Math.round(Number(value))
                      }
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {engagementData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.value === 0
                              ? isDark
                                ? "rgba(255, 255, 255, 0.08)"
                                : "rgba(0, 0, 0, 0.08)"
                              : isDark
                              ? "#818cf8"
                              : "#6366f1"
                          }
                          className="tracking-tighter"
                          fontFamily="var(--font-serif)"
                          fontSize="12px"
                          fontWeight="600"
                          letterSpacing="-0.02em"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Pie Chart - Social Media Distribution */}
            <div className="p-6 rounded-lg border border-black/15 dark:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-tighter">
                  Social Media Distribution
                </span>
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : socialMediaData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={socialMediaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: {
                        cx?: number;
                        cy?: number;
                        midAngle?: number;
                        innerRadius?: number;
                        outerRadius?: number;
                        name?: string;
                        percent?: number;
                      }) => {
                        const {
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          name,
                          percent,
                        } = props;
                        if (
                          !midAngle ||
                          !cx ||
                          !cy ||
                          innerRadius === undefined ||
                          outerRadius === undefined ||
                          !name
                        )
                          return null;

                        const RADIAN = Math.PI / 180;
                        const radius =
                          innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const percentage = percent
                          ? Math.round(percent * 100)
                          : 0;

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="currentColor"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "11px",
                              letterSpacing: "-0.01em",
                            }}
                            className="tracking-tighter"
                          >
                            {`${name} ${percentage}%`}
                          </text>
                        );
                      }}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {socialMediaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark
                          ? "rgba(0, 0, 0, 0.95)"
                          : "rgba(255, 255, 255, 0.98)",
                        border: isDark
                          ? "1px solid rgba(255, 255, 255, 0.15)"
                          : "1px solid rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontFamily: "var(--font-sans)",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(0, 0, 0, 0.9)",
                      }}
                      labelStyle={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        fontSize: "13px",
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(0, 0, 0, 0.95)",
                      }}
                      itemStyle={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "12px",
                        letterSpacing: "-0.01em",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-sm text-muted-foreground tracking-tighter">
                  No social media data
                </div>
              )}
            </div>

            {/* Individual Line Chart - Page Views */}
            {webMetrics.timeSeriesData["page_view"] &&
            webMetrics.timeSeriesData["page_view"].length > 0 ? (
              <div className="p-6 rounded-lg border border-black/15 dark:border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold tracking-tighter">
                    Page Views Over Time
                  </span>
                  <span className="text-xs text-muted-foreground font-medium tracking-tighter">
                    {transformTimeSeriesData(
                      webMetrics.timeSeriesData["page_view"]
                    ).reduce((sum, d) => sum + d.value, 0)}{" "}
                    total
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={transformTimeSeriesData(
                      webMetrics.timeSeriesData["page_view"]
                    )}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-black/10 dark:stroke-white/10"
                    />
                    <XAxis
                      dataKey="time"
                      tick={{
                        fill: "currentColor",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                        className: "tracking-tighter",
                      }}
                      stroke="currentColor"
                      style={{ opacity: 0.4 }}
                    />
                    <YAxis
                      tick={{
                        fill: "currentColor",
                        fontSize: 12,
                        fontFamily: "var(--font-sans)",
                        className: "tracking-tighter",
                      }}
                      stroke="currentColor"
                      style={{ opacity: 0.4 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark
                          ? "rgba(0, 0, 0, 0.95)"
                          : "rgba(255, 255, 255, 0.98)",
                        border: isDark
                          ? "1px solid rgba(255, 255, 255, 0.15)"
                          : "1px solid rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                        gap: "0px",
                        padding: "8px 12px",
                        fontFamily: "var(--font-sans)",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(0, 0, 0, 0.9)",
                      }}
                      labelStyle={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        fontSize: "13px",
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(0, 0, 0, 0.95)",
                      }}
                      itemStyle={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        letterSpacing: "-0.01em",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                      }}
                      formatter={(value: number | string) =>
                        Math.round(Number(value))
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={isDark ? "#818cf8" : "#6366f1"}
                      strokeWidth={3}
                      dot={{ r: 5, fill: isDark ? "#818cf8" : "#6366f1" }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : null}
          </div>
        </div>

        {/* Social Media Clicks */}
        <div>
          <h3 className="text-sm font-semibold tracking-tighter mb-4 text-muted-foreground uppercase">
            Social Media Clicks (Intro Section)
          </h3>
          <div className="flex flex-col gap-6 p-6 rounded-lg border border-black/15 dark:border-white/20">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <ChartBar label="X (Twitter)" value={xClicks} />
                <ChartBar label="Discord" value={discordClicks} />
                <ChartBar label="Telegram" value={telegramClicks} />
                <ChartBar label="WhatsApp" value={whatsappClicks} />
              </>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-black/15 dark:border-white/20">
            <span className="text-xs uppercase tracking-tighter text-muted-foreground">
              Total Events Tracked
            </span>
            {loading ? (
              <div className="flex items-center justify-center h-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <span className="text-2xl font-serif font-semibold tracking-tighter">
                {webMetrics.totalEvents}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-black/15 dark:border-white/20">
            <span className="text-xs uppercase tracking-tighter text-muted-foreground">
              Total CTA Clicks
            </span>
            {loading ? (
              <div className="flex items-center justify-center h-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <span className="text-2xl font-serif font-semibold tracking-tighter">
                {emailClicks +
                  bookCallClicks +
                  xClicks +
                  discordClicks +
                  telegramClicks +
                  whatsappClicks}
              </span>
            )}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
};

export default Page;
