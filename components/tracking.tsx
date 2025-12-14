"use client";

import { useEffect } from "react";

const trackEvent = async (
  eventType: string,
  metadata?: Record<string, unknown>
) => {
  try {
    await fetch("/api/metrics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, metadata }),
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

export const PageViewTracker = () => {
  useEffect(() => {
    const referrer = document.referrer || "";
    const isSearchEngine =
      referrer.includes("google") ||
      referrer.includes("bing") ||
      referrer.includes("duckduckgo") ||
      referrer.includes("search") ||
      referrer.includes("yahoo");

    // Check if the referrer URL contains "joide" or "joide.me" indicating a search
    let searchedForJoide = false;
    let searchQuery = "unknown";

    if (isSearchEngine && referrer) {
      try {
        const url = new URL(referrer);
        const params = new URLSearchParams(url.search);
        const query = params.get("q") || params.get("query") || "";
        searchQuery = query;
        searchedForJoide =
          referrer.toLowerCase().includes("joide") ||
          query.toLowerCase().includes("joide");
      } catch {
        // If URL parsing fails, just check if referrer contains "joide"
        searchedForJoide = referrer.toLowerCase().includes("joide");
      }
    }

    trackEvent("page_view", {
      referrer,
      path: window.location.pathname,
      isSearchEngine,
      searchedForJoide,
    });

    // If they searched for joide.me, track it separately
    if (searchedForJoide) {
      trackEvent("search_joide_me", {
        referrer,
        searchQuery,
      });
    }
  }, []);

  return null;
};

export const trackClick = (
  eventType: string,
  metadata?: Record<string, unknown>
) => {
  trackEvent(eventType, metadata);
};
