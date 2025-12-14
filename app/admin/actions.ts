export type PostPayload = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover: string;
  date: string;
  readTime: string;
  tags: string[];
  published?: boolean;
};

export const fetchPosts = async () => {
  const res = await fetch("/api/admin/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

type PostWithSlug = {
  id: number;
  slug: string;
};

export const savePost = async (payload: PostPayload, id?: number) => {
  if (id) {
    // For updates, we need to get the current post to get its slug
    const posts = await fetchPosts();
    const post = (posts as PostWithSlug[]).find((p) => p.id === id);
    if (!post) throw new Error("Post not found");

    const res = await fetch(`/api/admin/posts/${post.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Save failed");
    return res.json();
  } else {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Save failed");
    return res.json();
  }
};

export const deletePost = async (id: number) => {
  // First get the post to get its slug
  const posts = await fetchPosts();
  const post = (posts as PostWithSlug[]).find((p) => p.id === id);
  if (!post) throw new Error("Post not found");

  const res = await fetch(`/api/admin/posts/${post.slug}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
};
