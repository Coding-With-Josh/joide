import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const revalidate = 60;

export async function GET() {
  const data = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(20);

  return Response.json(data);
}
