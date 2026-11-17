"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll reveals. The `motion` class goes on <html> from an inline script before first paint
// (layout.tsx), only when the visitor hasn't asked for reduced motion. Without JS, or if this
// never runs, the inline script takes the class off again so nothing stays hidden.

const SEL = [
  ".livery-head",
  ".pricelist > li",
  ".suds",
  ".sec-head",
  ".drive-row > li",
  ".owen-photo",
  ".owen-text",
  ".big-quote",
  ".reviews > li",
  ".bb-grid > *",
  ".inc-group",
  ".extras",
  ".photo-strip > li",
  ".work-grid > li",
].join(",");

export function Motion() {
  const path = usePathname();

  useEffect(() => {
    (window as unknown as { __motion: boolean }).__motion = true;
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mq.matches || !("IntersectionObserver" in window)) {
      root.classList.remove("motion");
      return;
    }
    root.classList.add("motion");

    const els = Array.from(document.querySelectorAll<HTMLElement>(SEL));
    for (const el of els) {
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(SEL)) : [];
      el.style.setProperty("--i", String(Math.min(Math.max(sibs.indexOf(el), 0), 8)));
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    els.forEach((el) => !el.classList.contains("in") && io.observe(el));

    const onChange = () => {
      if (!mq.matches) {
        root.classList.remove("motion");
        io.disconnect();
      }
    };
    mq.addEventListener("change", onChange);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, [path]);

  return null;
}
