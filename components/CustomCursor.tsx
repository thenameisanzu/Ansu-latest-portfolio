"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on true desktop mouse/trackpad devices without touch screens
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) return;

    setIsEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;
    let isRunning = false;
    let hasMoved = false;

    const loop = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.18;
      ringY += dy * 0.18;
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringX = e.clientX;
        ringY = e.clientY;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      startLoop();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        isRunning = false;
      } else {
        startLoop();
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='hover']")) {
        ring.classList.add("is-active");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='hover']")) {
        ring.classList.remove("is-active");
      }
    };

    const onTouchStart = () => {
      // Immediate failsafe: hide if touch is detected
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
        className="cursor-dot hidden lg:block"
      />
      <div
        ref={ringRef}
        style={{ opacity: 0, transition: "opacity 0.2s ease, width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease" }}
        className="cursor-ring hidden lg:block"
      />
    </>
  );
}

