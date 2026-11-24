import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/data/areas";
import { site, bookHref, tel } from "@/data/site";
import { asset } from "@/data/base";

export const metadata: Metadata = {
  title: "Areas covered: Bucks, Northants, Oxon and nationwide | OJ Valeting",
  description:
    "Where Owen's mobile valeting covers: Buckinghamshire, Northamptonshire, Oxfordshire, Bedfordshire and Warwickshire, plus nationwide.",
  alternates: { canonical: "/areas/" },
};

// Owen, 18 Nov 2026: like elitekleanz.com/our-locations, a map with a simple paragraph on where he
// covers, and no mention of where he's based. The map is a dark-styled render of OpenStreetMap,
// served from this site (fast, no cookies, nothing loaded from anyone else), with no pin.

export default function Areas() {
  return (
    <>
      <section className="area-hero" aria-labelledby="areas-h">
        <picture className="area-map">
          <source type="image/avif" srcSet={asset("/photos/area-map.avif")} />
          <img
            src={asset("/photos/area-map.webp")}
            alt="Map of the Midlands and the South East, from Birmingham to London, centred on the counties Owen covers"
            width={2000}
            height={1100}
            fetchPriority="high"
          />
        </picture>
        <span className="area-glow" aria-hidden="true" />
        <div className="wrap area-card-wrap">
          <div className="area-card">
            <p className="page-eyebrow">Mobile valeting and detailing, UK nationwide</p>
            <h1 id="areas-h">Areas Owen Covers</h1>
            <p>
              Owen comes to your home or work across {site.counties.slice(0, -1).join(", ")} and {site.counties.at(-1)}.
              Further afield is no problem either: he travels nationwide, with a small fuel charge for longer trips.
            </p>
            <p className="area-cta">
              <a href={bookHref} className="btn btn-foam">
                Book a Clean
              </a>
              <a href={tel} className="btn btn-line-dark">
                Call <span className="num">{site.phone}</span>
              </a>
            </p>
          </div>
        </div>
        <p className="map-credit">Map data &copy; OpenStreetMap contributors</p>
      </section>
      <section className="wrap page-body area-towns" aria-label="Towns Owen covers">
        <p className="page-eyebrow dark">Towns Owen covers regularly</p>
        <ul role="list">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}/`}>{a.town}</Link>
            </li>
          ))}
          {site.towns
            .filter((t) => !areas.some((a) => a.town === t))
            .map((t) => (
              <li key={t}>
                <span>{t}</span>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
