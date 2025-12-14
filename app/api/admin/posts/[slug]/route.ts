import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
  return Response.json(post);
}

export async function PATCH(request: Request, { params }: Params) {
  const { slug } = await params;
  const body = await request.json();
  const [updated] = await db.update(posts).set(body).where(eq(posts.slug, slug)).returning();
  return Response.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { slug } = await params;
  await db.delete(posts).where(eq(posts.slug, slug));
  return Response.json({ success: true });
}


