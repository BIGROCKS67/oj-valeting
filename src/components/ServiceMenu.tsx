"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services, categories, addOns, protectionAddOns, gbp, type Service } from "@/data/services";
import { site } from "@/data/site";
import { Pic } from "@/components/Pic";

// Owen's menu, by category. Without JavaScript every panel shows, one after another,
// so the whole price list is still there. With it, tabs switch between them.

const tabs = [...categories, "Add-ons"] as const;
type Tab = (typeof tabs)[number];
const slugOf = (t: Tab) => t.toLowerCase().replace(/[^a-z]+/g, "-");

function Card({ s }: { s: Service }) {
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
        <p className="mc-meta">
          <span>{s.time}</span>
          <span className="mc-price">
            from <strong className="num">{gbp(s.from)}</strong>
          </span>
        </p>
        <p className="mc-links">
          <Link href={`/${s.slug}/`}>Prices by size</Link>
          <a href={site.bookingApp} className="pl-book">
            Book
          </a>
        </p>
      </div>
    </li>
  );
}

export function ServiceMenu() {
  const [js, setJs] = useState(false);
  const [active, setActive] = useState<Tab>("Full valets");
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
              {t}
            </button>
          ))}
        </div>
      )}

      {tabs.map((t) => {
        const list = services.filter((s) => s.category === t);
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
            {!js && <h3 className="menu-panel-h">{t}</h3>}
            {list.length > 0 && (
              <ul className="menu-cards" role="list">
                {list.map((s) => (
                  <Card key={s.slug} s={s} />
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
            {t === "Add-ons" && <p className="menu-note">Add any of these to a booking. Mention them in the notes, or text Owen.</p>}
          </div>
        );
      })}
    </div>
  );
}
