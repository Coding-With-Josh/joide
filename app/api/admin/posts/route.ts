import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const data = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const [created] = await db.insert(posts).values(body).returning();
  return Response.json(created, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { slug, ...updateData } = body;
  if (!slug) {
    return Response.json({ error: "Slug is required" }, { status: 400 });
  }
  const [updated] = await db
    .update(posts)
    .set(updateData)
    .where(eq(posts.slug, slug))
    .returning();
  return Response.json(updated);
}

