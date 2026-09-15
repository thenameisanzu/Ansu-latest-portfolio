"use client";

import { useEffect, useRef } from "react";

export default function TabTitleManager() {
  const originalTitle = useRef<string>("Ansu V S — Developer & Designer");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    originalTitle.current = document.title || "Ansu V S — Developer & Designer";

    const inactiveTitles = [
      "👋 Don't forget your project idea!",
      "🟢 Ansu is online — Let's talk",
      "✨ Aethra Digital Solutions",
    ];
    let titleIdx = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Change title immediately
        document.title = inactiveTitles[0];
        // Cycle every 3 seconds
        intervalRef.current = setInterval(() => {
          titleIdx = (titleIdx + 1) % inactiveTitles.length;
          document.title = inactiveTitles[titleIdx];
        }, 3000);
      } else {
        // Clear interval
        if (intervalRef.current) clearInterval(intervalRef.current);
        // Show welcome back briefly
        document.title = "👋 Welcome back!";
        setTimeout(() => {
          document.title = originalTitle.current;
        }, 1400);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}
