import { db } from "@/db/client";
import { metrics } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, metadata } = body;

    if (!eventType) {
      return NextResponse.json(
        { error: "eventType is required" },
        { status: 400 }
      );
    }

    await db.insert(metrics).values({
      eventType,
      metadata: metadata || {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking metric:", error);
    return NextResponse.json(
      { error: "Failed to track metric" },
      { status: 500 }
    );
  }
}

