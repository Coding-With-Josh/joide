import { db } from "@/db/client";
import { metrics } from "@/db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get("timeRange") || "all";

    // Calculate start date based on time range
    const now = new Date();
    let startDate: Date | null = null;

    switch (timeRange) {
      case "30m":
        startDate = new Date(now.getTime() - 30 * 60 * 1000);
        break;
      case "1h":
        startDate = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case "1d":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "1w":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "1m":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "all":
      default:
        startDate = null;
        break;
    }

    // Build query with optional time filter
    const filteredMetrics = startDate
      ? await db
          .select()
          .from(metrics)
          .where(gte(metrics.createdAt, startDate))
          .orderBy(desc(metrics.createdAt))
      : await db.select().from(metrics).orderBy(desc(metrics.createdAt));

    // Aggregate metrics by event type
    const aggregated = filteredMetrics.reduce((acc, metric) => {
      const type = metric.eventType;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
      return acc;
    }, {} as Record<string, number>);

    // Get time-series data for charts
    const timeSeriesData: Record<
      string,
      Array<{ time: string; count: number }>
    > = {};

    // Group by time intervals based on range
    let intervalFormat = "YYYY-MM-DD HH24:MI";
    if (timeRange === "30m" || timeRange === "1h") {
      intervalFormat = "YYYY-MM-DD HH24:MI";
    } else if (timeRange === "1d") {
      intervalFormat = "YYYY-MM-DD HH24";
    } else {
      intervalFormat = "YYYY-MM-DD";
    }

    const timeSeriesQuery = startDate
      ? db
          .select({
            time: sql<string>`TO_CHAR(${metrics.createdAt}, '${sql.raw(
              intervalFormat
            )}')`,
            eventType: metrics.eventType,
            count: sql<number>`COUNT(*)`,
          })
          .from(metrics)
          .where(gte(metrics.createdAt, startDate))
          .groupBy(
            sql`TO_CHAR(${metrics.createdAt}, '${sql.raw(intervalFormat)}')`,
            metrics.eventType
          )
      : db
          .select({
            time: sql<string>`TO_CHAR(${metrics.createdAt}, '${sql.raw(
              intervalFormat
            )}')`,
            eventType: metrics.eventType,
            count: sql<number>`COUNT(*)`,
          })
          .from(metrics)
          .groupBy(
            sql`TO_CHAR(${metrics.createdAt}, '${sql.raw(intervalFormat)}')`,
            metrics.eventType
          );

    const timeSeries = await timeSeriesQuery;

    // Organize time series by event type
    timeSeries.forEach((row) => {
      if (!timeSeriesData[row.eventType]) {
        timeSeriesData[row.eventType] = [];
      }
      timeSeriesData[row.eventType].push({
        time: row.time,
        count: Number(row.count),
      });
    });

    // Get searches for "joide.me" specifically
    const searchJoideMetrics = startDate
      ? await db
          .select()
          .from(metrics)
          .where(
            and(
              eq(metrics.eventType, "search_joide_me"),
              gte(metrics.createdAt, startDate)
            )
          )
      : await db
          .select()
          .from(metrics)
          .where(eq(metrics.eventType, "search_joide_me"));
    const searchCount = searchJoideMetrics.length;

    return NextResponse.json({
      aggregated,
      timeSeriesData,
      searchCount,
      totalEvents: filteredMetrics.length,
      timeRange,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
