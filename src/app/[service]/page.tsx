import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService, gbp } from "@/data/services";
import { reviews } from "@/data/reviews";
import { site, tel } from "@/data/site";
import { Pic } from "@/components/Pic";
import { captions } from "@/data/photos";
import { Draft } from "@/components/Draft";
import { ReviewList } from "@/components/ReviewList";
import { serviceLd } from "@/data/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const s = getService((await params).service);
  if (!s) return {};
  return {
    title: `${s.searchName}, from ${gbp(s.from)} | OJ Valeting`,
    description: `${s.owenSays} Mobile, at your home or work across Bucks, Northants and Oxfordshire. From ${gbp(s.from)}. Book online.`,
    alternates: { canonical: `/${s.slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const s = getService((await params).service);
  if (!s) notFound();
  const theirs = reviews.filter((r) => r.service === s.slug);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd(s.slug)) }} />

      <section className="svc-hero" aria-labelledby="svc-h">
        <div className="svc-hero-text">
          <p className="crumb">
            <Link href="/#prices">Prices</Link> <span aria-hidden="true">/</span> {s.name}
          </p>
          <h1 id="svc-h">
            {s.name}, from <span className="num">{gbp(s.from)}</span>
          </h1>
          <p className="svc-meta">
            {s.time}
            {s.note ? `. ${s.note}` : ""}
          </p>
          <p className="svc-says">&ldquo;{s.owenSays}&rdquo;</p>
          <p>Best for {s.goodFor}</p>
          <div className="hero-cta">
            <a href={site.bookingApp} className="btn btn-foam btn-big">
              Book the {s.name.toLowerCase()}
            </a>
            <a href={tel} className="btn btn-line btn-big">
              Call <span className="num">{site.phone}</span>
            </a>
          </div>
        </div>
        <figure className="svc-hero-photo">
          <Pic id={s.photos[0]} priority sizes="(min-width: 900px) 40vw, 100vw" />
        </figure>
      </section>

      <section className="wrap svc-body">
        <div className="included">
          <h2>What&rsquo;s included</h2>
          {!s.includesConfirmed && <Draft />}
          {s.includes.map((g) => (
            <div key={g.group} className="inc-group">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="extras" aria-labelledby="ex-h">
          <h2 id="ex-h">{s.extras.length ? "Extras you can add" : "Extras"}</h2>
          {s.extras.length ? (
            <>
              <ul>
                {s.extras.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <p className="aside-note">Tick any you want when you book and Owen will price them with the job.</p>
            </>
          ) : (
            <p>Added extras are available on request. Mention them when you book.</p>
          )}
          {s.option && (
            <p className="aside-note">
              {s.option.label} {s.option.choices.filter((c) => c !== "Not sure yet").join(", ")}.
            </p>
          )}
        </aside>
      </section>

      <section className="wrap svc-photos" aria-label={`${s.name} photos`}>
        <ul className="photo-strip" role="list">
          {s.photos.slice(1).map((id) => (
            <li key={id}>
              <figure>
                <Pic id={id} sizes="(min-width: 900px) 30vw, 70vw" />
                <figcaption>{captions[id]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {theirs.length > 0 && (
        <section className="wrap said" aria-labelledby="sr-h">
          <h2 id="sr-h">From customers who had it done</h2>
          <ReviewList items={theirs} />
        </section>
      )}

      <section className="wrap other" aria-labelledby="ot-h">
        <h2 id="ot-h">Other services</h2>
        <ul className="other-list" role="list">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/${o.slug}/`}>
                {o.name} <span className="num">from {gbp(o.from)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
