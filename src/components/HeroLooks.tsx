"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FoamGL } from "@/components/FoamGL";
import { ScrollGL, scrollSeq } from "@/components/ScrollGL";
import { asset } from "@/data/base";

// Three hero "looks" for Owen to try on the live home page before he picks one (Jack, 18 Nov 2026).
// Only switched on by ?look= in the address (ojvalet.co.uk/?look=1), so normal visitors see the
// standard hero. Remove this file and the <HeroLooks /> line once Owen has chosen.
//   1 Foam: the car is covered in snow foam and you wipe it off
//   2 Scroll: scrolling runs through his own jobs, a water squeegee wiping from one car to the next

type Look = 0 | 1 | 2;
const names: Record<Look, string> = { 0: "Photo", 1: "Foam", 2: "Scroll" };

const seq = scrollSeq;

export function HeroLooks() {
  const [look, setLook] = useState<Look | null>(null);
  const [noGL, setNoGL] = useState(false);
  const failGL = useCallback(() => setNoGL(true), []);

  useEffect(() => {
    const v = new URLSearchParams(location.search).get("look");
    if (v !== null) setLook((["0", "1", "2"].includes(v) ? Number(v) : 0) as Look);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero || look === null) return;
    hero.dataset.look = String(look);
    return () => {
      delete hero.dataset.look;
    };
  }, [look]);

  if (look === null) return null;

  const pick = (l: Look) => {
    const u = new URL(location.href);
    u.searchParams.set("look", String(l));
    history.replaceState(null, "", u);
    window.scrollTo({ top: 0 });
    setLook(l);
  };
  const like = `https://wa.me/?text=${encodeURIComponent(`I like look ${look} (${names[look]}) for the home page`)}`;

  return (
    <>
      {look === 1 && (noGL ? <Foam /> : <FoamGL onFail={failGL} />)}
      {look === 2 && (noGL ? <Scroll /> : <ScrollGL onFail={failGL} />)}
      <div className="look-bar" role="region" aria-label="Try a home page look">
        <span className="look-bar-h">Try a look:</span>
        {([0, 1, 2] as Look[]).map((l) => (
          <button key={l} type="button" aria-pressed={look === l} onClick={() => pick(l)}>
            {l === 0 ? names[0] : `${l}. ${names[l]}`}
          </button>
        ))}
        <a href={like} className="look-like">
          I like this one
        </a>
      </div>
    </>
  );
}

/* ---------- 1. Foam: wipe the snow foam off ---------- */

function Foam() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const cv = ref.current!;
    const hero = cv.closest<HTMLElement>(".hero")!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let done = false;
    let touched = false;
    let auto = 0;

    const paint = () => {
      w = hero.clientWidth;
      h = hero.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgb(236 243 248)";
      ctx.fillRect(0, 0, w, h);
      // Bubbles: soft white domes with a thin foam-blue rim, from his logo
      const n = Math.round((w * h) / 380);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 2 + Math.random() ** 2.4 * 26;
        const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
        g.addColorStop(0, "rgb(255 255 255 / 0.95)");
        g.addColorStop(0.7, "rgb(232 241 248 / 0.9)");
        g.addColorStop(1, "rgb(170 205 228 / 0.55)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        if (r > 7) {
          ctx.strokeStyle = "rgb(0 151 215 / 0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const brush = (x: number, y: number, r: number) => {
      ctx.globalCompositeOperation = "destination-out";
      const g = ctx.createRadialGradient(x, y, r * 0.35, x, y, r);
      g.addColorStop(0, "rgb(0 0 0 / 1)");
      g.addColorStop(1, "rgb(0 0 0 / 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let last: [number, number] | null = null;
    const wipe = (cx: number, cy: number) => {
      if (done) return;
      const b = cv.getBoundingClientRect();
      const x = cx - b.left;
      const y = cy - b.top;
      const r = w < 700 ? 56 : 80;
      if (last) {
        const [lx, ly] = last;
        const steps = Math.ceil(Math.hypot(x - lx, y - ly) / (r / 4));
        for (let i = 1; i <= steps; i++) brush(lx + ((x - lx) * i) / steps, ly + ((y - ly) * i) / steps, r);
      } else brush(x, y, r);
      last = [x, y];
      clearTimeout(auto);
      auto = window.setTimeout(rinse, 2500);
      if (!touched) {
        touched = true;
        setHint(false);
      }
    };
    const onPointer = (e: PointerEvent) => wipe(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => wipe(e.touches[0].clientX, e.touches[0].clientY);
    const onLeave = () => (last = null);

    // The rinse: water runs down from the top and the foam goes with it
    let raf = 0;
    const rinse = () => {
      if (done) return;
      done = true;
      setHint(false);
      const start = performance.now();
      const run = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        const line = p * (h + 120);
        ctx.globalCompositeOperation = "destination-out";
        for (let x = 0; x < w; x += 18) {
          const y = line - 60 + Math.sin(x / 70 + p * 9) * 26;
          ctx.fillStyle = "rgb(0 0 0 / 0.5)";
          ctx.fillRect(x, 0, 18, Math.max(0, y));
        }
        if (p < 1) raf = requestAnimationFrame(run);
        else cv.style.opacity = "0";
      };
      raf = requestAnimationFrame(run);
    };

    paint();
    hero.addEventListener("pointermove", onPointer);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("touchmove", onTouch, { passive: true });
    hero.addEventListener("touchend", onLeave);
    auto = window.setTimeout(rinse, 4500);
    return () => {
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("touchmove", onTouch);
      hero.removeEventListener("touchend", onLeave);
      clearTimeout(auto);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="hero-fx hero-foam" aria-hidden="true" />
      {hint && (
        <p className="foam-hint" aria-hidden="true">
          Wipe the foam off
        </p>
      )}
    </>
  );
}

/* ---------- 2. Scroll, without WebGL: flick through his jobs ---------- */

function Scroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const hero = ref.current!.closest<HTMLElement>(".hero")!;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        const run = r.height - window.innerHeight;
        const p = Math.min(Math.max(-r.top / Math.max(run, 1), 0), 0.9999);
        setI(Math.floor(p * seq.length));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div ref={ref} className="hero-fx hero-seq" aria-hidden="true">
      <div className="seq-stage">
        {seq.map((id, k) => (
          <picture key={id} className={k === i ? "on" : undefined}>
            <source media="(min-width: 700px)" srcSet={asset(`/photos/hero-${id}-1536.webp`)} />
            <img src={asset(`/photos/${id}-960.webp`)} alt="" loading={k < 2 ? "eager" : "lazy"} decoding="async" />
          </picture>
        ))}
        <p className="seq-count">
          <span className="num">{String(i + 1).padStart(2, "0")}</span> / {seq.length} of Owen&rsquo;s jobs
        </p>
      </div>
    </div>
  );
}
