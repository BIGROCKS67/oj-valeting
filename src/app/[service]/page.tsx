import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService, gbp, addOns, addOnPrice, sizeGuide, fromText } from "@/data/services";
import { reviews } from "@/data/reviews";
import { site, tel, bookUrl } from "@/data/site";
import { Pic } from "@/components/Pic";
import { captions } from "@/data/photos";
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
    title: `${s.searchName}, Brackley | OJ Valeting`,
    description: `${s.owenSays ?? s.blurb} Mobile, at your home or work across Bucks, Oxon, Northants, Beds and Warwickshire. ${s.from > 0 ? `From ${gbp(s.from)}.` : ""} Call or text Owen to book.`,
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
            <Link href="/#prices">Services</Link> <span aria-hidden="true">/</span> {s.name}
          </p>
          <h1 id="svc-h">
            {s.name}
            {s.from > 0 && (
              <>
                , from <span className="num">{gbp(s.from)}</span>
              </>
            )}
          </h1>
          <p className="svc-meta">
            {s.time}
            {s.note ? `. ${s.note}` : ""}
          </p>
          <p className="svc-meta">{site.needs}</p>
          <p className="svc-says">{s.blurb}</p>
          <p>Best for {s.goodFor}</p>
          <div className="hero-cta">
            <a href={bookUrl(s.squareId)} className="btn btn-foam btn-big">
              Book the {s.name}
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

      <section className="wrap svc-prices" aria-labelledby="pr-h">
        <h2 id="pr-h">{s.prices[0].prices.length > 1 ? "Prices by vehicle size" : "Price"}</h2>
        {s.tip && <p className="price-tip">{s.tip}</p>}
        <div className="price-tables">
          {s.prices.map((t) => (
            <table key={t.label} className="price-table">
              <caption>
                {t.label}
                {t.note && <span>{t.note}</span>}
              </caption>
              <tbody>
                {t.prices.map(([size, price]) => (
                  <tr key={size}>
                    <th scope="row">{size}</th>
                    <td className="num">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        {s.prices[0].prices.length > 1 && (<p className="size-guide">
          {sizeGuide.map(([size, what], i) => (
            <span key={size}>
              <strong>{size}</strong> {what}
              {i < sizeGuide.length - 1 ? ". " : "."}
            </span>
          ))}{" "}
          A &ldquo;+&rdquo; means from: Owen confirms the final price once he&rsquo;s seen the vehicle.
        </p>)}
      </section>

      <section className="wrap svc-body">
        {s.includes.length > 0 && (<div className="included">
          <h2>What&rsquo;s included</h2>
          {s.includes.map((g) => (
            <div key={g.group} className="inc-group">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>
                    {s.slug !== "deep-exterior" && i.includes("full deep exterior wash") ? (
                      <>
                        {i.split("full deep exterior wash")[0]}
                        <Link href="/deep-exterior/" className="inc-link">full deep exterior wash</Link>
                        {i.split("full deep exterior wash")[1]}
                      </>
                    ) : (
                      i
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>)}

        <aside className="extras" aria-labelledby="ex-h">
          <h2 id="ex-h">{s.extras.length ? "Popular extras for this service" : "Extras"}</h2>
          {s.extras.length ? (
            <>
              <ul>
                {s.extras.map((e) => (
                  <li key={e}>
                    {e} <span className="num">{addOnPrice(e)}</span>
                  </li>
                ))}
              </ul>
              <p className="aside-note">Mention any you want in the notes when you book, or text Owen. After something that isn&rsquo;t listed? Just ask.</p>
              {/* Owen, voice note 21 Nov: show these are only some of the extras, with a way to the full list */}
              <p>
                <Link href="/book/#add-ons" className="btn btn-line btn-line-dark">
                  See all {Object.keys(addOns).length} extras and prices
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>Added extras are available on request. Mention them when you book.</p>
              <p><Link href="/book/#add-ons" className="btn btn-line btn-line-dark">See all extras and prices</Link></p>
            </>
          )}
          {s.option && (
            <p className="aside-note">
              {s.option.label} {s.option.choices.filter((c) => c !== "Not sure yet").join(", ")}.
            </p>
          )}
        </aside>
      </section>

      {/* Good to know: drop-downs like elitekleanz.com (Owen, 18 Nov). Facts already on the site; the
          deposit: 20% on every service (Owen, 19 Nov). */}
      <section className="wrap svc-faq" aria-labelledby="gk-h">
        <h2 id="gk-h">Good to know</h2>
        <div className="drops">
          <details>
            <summary>How long does it take?</summary>
            <p>
              {s.time === "Owen will confirm the time" ? "Owen will tell you when he quotes." : `${s.time}, depending on the size and state of the vehicle.`}
            </p>
          </details>
          <details>
            <summary>Can the price change?</summary>
            <p>
              The prices are starting prices for each size. Owen confirms the final price once he&rsquo;s seen the
              vehicle, before he starts. {s.note?.startsWith("Price may vary") ? s.note : ""} {site.honest}
            </p>
          </details>
          <details>
            <summary>What do you need from me?</summary>
            <p>{site.needs}</p>
          </details>
          <details>
            <summary>Is there a deposit?</summary>
            <p>
              {site.deposit} The full terms are on the <Link href="/contact/#terms">contact page</Link>.
            </p>
          </details>
          <details>
            <summary>What if it rains?</summary>
            <p>Owen brings a waterproof gazebo, so rain won&rsquo;t stop the job.</p>
          </details>
          <details>
            <summary>How do I pay?</summary>
            <p>{site.payment}</p>
          </details>
        </div>
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
                {o.name} <span className="num">{fromText(o.from)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
