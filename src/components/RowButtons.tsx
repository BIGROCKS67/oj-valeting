"use client";

import { useEffect, useState } from "react";

// Back and forward buttons for a sideways-scrolling list. Hidden without JS (the row still
// scrolls by swipe, trackpad or keyboard).
export function RowButtons({ target, label }: { target: string; label: string }) {
  const [state, setState] = useState<{ ready: boolean; start: boolean; end: boolean }>({
    ready: false,
    start: true,
    end: false,
  });

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const update = () =>
      setState({
        ready: el.scrollWidth > el.clientWidth + 4,
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  const go = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  if (!state.ready) return null;
  return (
    <div className="row-btns" role="group" aria-label={label}>
      <button type="button" onClick={() => go(-1)} disabled={state.start} aria-controls={target}>
        <span aria-hidden="true">&larr;</span> Back
      </button>
      <button type="button" onClick={() => go(1)} disabled={state.end} aria-controls={target}>
        More <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
