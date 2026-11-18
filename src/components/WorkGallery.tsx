"use client";

import { useEffect, useRef, useState } from "react";
import { Pic } from "@/components/Pic";
import { asset } from "@/data/base";

// Our Work: an editorial grid (every ninth photo shown big), and tapping any photo opens it full
// size, with arrows, swipe and the keyboard to move through them. Without JavaScript it's a plain grid.
export function WorkGallery({ items }: { items: { id: string; caption: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const touch = useRef(0);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open === null) {
      if (d.open) d.close();
    } else if (!d.open) d.showModal();
  }, [open]);

  const go = (n: number) => setOpen((i) => (i === null ? i : (i + n + items.length) % items.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const cur = open === null ? null : items[open];
  return (
    <>
      <ul className="gallery" role="list">
        {items.map((it, i) => (
          <li key={it.id} className={i % 9 === 0 ? "g-big" : undefined}>
            <button type="button" className="g-item" onClick={() => setOpen(i)} aria-label={`Open photo: ${it.caption}`}>
              <Pic id={it.id} sizes={i % 9 === 0 ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 25vw, 50vw"} />
              <span className="g-cap">{it.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        className="lightbox"
        aria-label="Photo"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dlg.current) setOpen(null);
        }}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {cur && (
          <figure className="lb-fig">
            <img src={asset(`/photos/${cur.id}-960.webp`)} alt={cur.caption} />
            <figcaption>
              <span>{cur.caption}</span>
              <span className="lb-count num">
                {open! + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" onClick={() => setOpen(null)} aria-label="Close">
          Close
        </button>
        <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous photo">
          Prev
        </button>
        <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next photo">
          Next
        </button>
      </dialog>
    </>
  );
}
