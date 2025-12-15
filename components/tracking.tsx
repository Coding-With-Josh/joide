"use client";

import { useEffect } from "react";

const trackEvent = async (
  eventType: string,
  metadata?: Record<string, unknown>
) => {
  try {
    // Use sendBeacon for better performance (non-blocking)
    if (navigator.sendBeacon) {
      const blob = new Blob(
        [JSON.stringify({ eventType, metadata })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/metrics/track", blob);
    } else {
      // Fallback to fetch with low priority
      await fetch("/api/metrics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, metadata }),
        keepalive: true, // Keep request alive even after page unload
      });
    }
  } catch (error) {
    // Silently fail - tracking should never block the page
    console.error("Failed to track event:", error);
  }
};

export const PageViewTracker = () => {
  useEffect(() => {
    // Defer tracking until browser is idle to avoid blocking render
    const scheduleTracking = () => {
      if (typeof window === "undefined") return;

      const track = () => {
        const referrer = document.referrer || "";
        const isSearchEngine =
          referrer.includes("google") ||
          referrer.includes("bing") ||
          referrer.includes("duckduckgo") ||
          referrer.includes("search") ||
          referrer.includes("yahoo");

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
            searchedForJoide = referrer.toLowerCase().includes("joide");
          }
        }

        trackEvent("page_view", {
          referrer,
          path: window.location.pathname,
          isSearchEngine,
          searchedForJoide,
        });

        if (searchedForJoide) {
          trackEvent("search_joide_me", {
            referrer,
            searchQuery,
          });
        }
      };

      // Use requestIdleCallback if available, otherwise setTimeout
      if ("requestIdleCallback" in window) {
        requestIdleCallback(track, { timeout: 2000 });
      } else {
        setTimeout(track, 100);
      }
    };

    scheduleTracking();
  }, []);

  return null;
};

export const trackClick = (
  eventType: string,
  metadata?: Record<string, unknown>
) => {
  trackEvent(eventType, metadata);
};
