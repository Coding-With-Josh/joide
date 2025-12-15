import { db } from "@/db/client";
import { metrics } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and Blob (from sendBeacon)
    let body;
    const contentType = request.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      body = await request.json();
    } else {
      // Handle Blob from sendBeacon
      const blob = await request.blob();
      const text = await blob.text();
      body = JSON.parse(text);
    }

    const { eventType, metadata } = body;

    if (!eventType) {
      return NextResponse.json(
        { error: "eventType is required" },
        { status: 400 }
      );
    }

    // Don't await - fire and forget for better performance
    db.insert(metrics).values({
      eventType,
      metadata: metadata || {},
    }).catch((err) => {
      console.error("Error tracking metric:", err);
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

