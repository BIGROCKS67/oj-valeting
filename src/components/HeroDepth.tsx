"use client";

import { useEffect } from "react";

// Depth on the home page background: the photo drifts against the pointer and sinks slower than
// the page on scroll, so the car sits behind the lettering. Only with html.motion (no reduced motion).
export function HeroDepth() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero || !root.classList.contains("motion")) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const paint = () => {
      raf = 0;
      const y = Math.min(window.scrollY, hero.offsetHeight);
      hero.style.setProperty("--px", px.toFixed(3));
      hero.style.setProperty("--py", py.toFixed(3));
      hero.style.setProperty("--sy", `${(y * 0.3).toFixed(1)}px`);
    };
    const ask = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      ask();
    };
    if (fine) hero.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", ask, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", ask);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
