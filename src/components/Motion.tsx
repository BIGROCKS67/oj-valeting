"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll reveals. The `motion` class goes on <html> from an inline script before first paint
// (layout.tsx), only when the visitor hasn't asked for reduced motion. Without JS, or if this
// never runs, the inline script takes the class off again so nothing stays hidden.

const SEL = [
  ".livery-head",
  ".menu-card",
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

let firstPage = true;

export function Motion() {
  const path = usePathname();

  useEffect(() => {
    // Moving between pages: the new page eases in instead of snapping (the first load has the hero).
    if (firstPage) firstPage = false;
    else if (document.documentElement.classList.contains("motion")) {
      const main = document.getElementById("main");
      if (main) {
        main.classList.remove("page-in");
        void main.offsetWidth;
        main.classList.add("page-in");
      }
    }
  }, [path]);

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

    // Stagger only the blocks that arrive together, so nothing waits behind things off screen.
    const io = new IntersectionObserver(
      (entries) => {
        let k = 0;
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.setProperty("--i", String(Math.min(k++, 4)));
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0 },
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
