"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services, categories, addOns, protectionAddOns, gbp, type Service, fromText } from "@/data/services";
import { bookUrl } from "@/data/site";
import { Pic } from "@/components/Pic";

// Owen's menu, by category. Without JavaScript every panel shows, one after another,
// so the whole price list is still there. With it, tabs switch between them.

const tabs = ["All", ...categories, "Add-ons"] as const;
type Tab = (typeof tabs)[number];
// Owen, 18 Nov: capital letters on every word of the tab names
const label = (t: Tab) => t.replace(/(^|[\s-])([a-z])/g, (_, a, b) => a + b.toUpperCase());
const slugOf = (t: Tab) => t.toLowerCase().replace(/[^a-z]+/g, "-");


function Card({ s, js }: { s: Service; js: boolean }) {
  const table = s.prices[0];
  const [size, setSize] = useState(0);
  const [label, price] = table.prices[size];
  const sized = table.prices.length > 1;
  return (
    <li className="menu-card">
      <Link href={`/${s.slug}/`} className="mc-pic" tabIndex={-1} aria-hidden="true">
        <Pic id={s.photos[0]} sizes="(min-width: 900px) 22vw, (min-width: 600px) 45vw, 90vw" alt="" />
      </Link>
      <div className="mc-body">
        <h3>
          <Link href={`/${s.slug}/`}>{s.name}</Link>
        </h3>
        <p className="mc-blurb">{s.blurb}</p>
        {s.cardTip && <p className="mc-tip">{s.cardTip}</p>}
        {js && sized && (
          <div className="mc-sizes" role="group" aria-label={`${s.name}: price by vehicle size`}>
            {table.prices.map(([k], i) => (
              <button key={k} type="button" aria-pressed={i === size} onClick={() => setSize(i)}>
                {k}
              </button>
            ))}
          </div>
        )}
        <p className="mc-meta">
          <span>{s.time}</span>
          {js ? (
            <span className="mc-price" aria-live="polite">
              {label} <strong className="num">{price.replace("+", "")}</strong>
              {price.endsWith("+") && <span className="mc-plus">+</span>}
            </span>
          ) : (
            <span className="mc-price">
              <strong className="num">{fromText(s.from)}</strong>
            </span>
          )}
        </p>
        <p className="mc-links">
          <Link href={`/${s.slug}/`}>{s.includes.length ? <>What&rsquo;s included</> : "More details"}</Link>
          <a href={bookUrl(s.squareId)} className="pl-book">
            Book
          </a>
        </p>
      </div>
    </li>
  );
}

export function ServiceMenu() {
  const [js, setJs] = useState(false);
  const [active, setActive] = useState<Tab>("All");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setJs(true), []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const next = (i + n + tabs.length) % tabs.length;
    setActive(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={`menu${js ? " is-js" : ""}`}>
      {js && (
        <div className="menu-tabs" role="tablist" aria-label="Services by type">
          {tabs.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${slugOf(t)}`}
              aria-selected={active === t}
              aria-controls={`panel-${slugOf(t)}`}
              tabIndex={active === t ? 0 : -1}
              onClick={() => setActive(t)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {label(t)}
            </button>
          ))}
        </div>
      )}

      {tabs.map((t) => {
        // "All" only exists with JavaScript; without it every category panel already shows.
        if (t === "All" && !js) return null;
        const list = t === "All" ? services : services.filter((s) => s.category === t);
        const extras = t === "Add-ons" ? Object.keys(addOns) : t === "Protection" ? protectionAddOns : [];
        return (
          <div
            key={t}
            id={`panel-${slugOf(t)}`}
            className="menu-panel"
            role={js ? "tabpanel" : undefined}
            aria-labelledby={js ? `tab-${slugOf(t)}` : undefined}
            hidden={js && active !== t}
          >
            {!js && <h3 className="menu-panel-h">{label(t)}</h3>}
            {list.length > 0 && (
              <ul className="menu-cards" role="list">
                {list.map((s) => (
                  <Card key={s.slug} s={s} js={js} />
                ))}
              </ul>
            )}
            {extras.length > 0 && (
              <ul className="menu-addons" role="list" aria-label={t === "Add-ons" ? "Add-on prices" : "Other protection"}>
                {extras.map((a) => (
                  <li key={a}>
                    <span>{a}</span> <span className="num">{addOns[a]}</span>
                  </li>
                ))}
              </ul>
            )}
            {t === "Add-ons" && <p className="menu-note">Add any of these to a booking. Mention them in the notes, or text Owen. After something that isn&rsquo;t listed? Just ask.</p>}
          </div>
        );
      })}
    </div>
  );
}

/** The same cards on their own, for the /services/<group>/ pages */
export function ServiceCardList({ slugs }: { slugs: string[] }) {
  const [js, setJs] = useState(false);
  useEffect(() => setJs(true), []);
  const list = services.filter((s) => slugs.includes(s.slug));
  return (
    <div className={`menu${js ? " is-js" : ""}`}>
      <ul className="menu-cards" role="list">
        {list.map((s) => (
          <Card key={s.slug} s={s} js={js} />
        ))}
      </ul>
    </div>
  );
}
