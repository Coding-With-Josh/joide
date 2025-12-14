import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .where(eq(posts.published, true))
    .limit(1);
  
  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
  
  return Response.json(post);
}


