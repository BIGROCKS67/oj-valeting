"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Home page only: the header sits transparent over the hero photo, then turns solid livery black
// once the page has scrolled 48px. Other pages keep the plain paper header.
export function HeadState() {
  const path = usePathname();
  useEffect(() => {
    const head = document.querySelector<HTMLElement>(".site-head");
    if (!head) return;
    if (path !== "/") {
      head.classList.remove("head-solid");
      return;
    }
    const on = () => head.classList.toggle("head-solid", window.scrollY > 48);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  return null;
}
