import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, getArea } from "@/data/areas";
import { services, gbp, fromText } from "@/data/services";
import { site, tel, sms, bookHref } from "@/data/site";
import { hoursList } from "@/data/hours";
import { reviews } from "@/data/reviews";
import { ReviewList } from "@/components/ReviewList";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ town: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ town: string }> }): Promise<Metadata> {
  const a = getArea((await params).town);
  if (!a) return {};
  return {
    title: `Mobile car valeting ${a.town} | OJ Valeting`,
    description: `Mobile car valeting and detailing in ${a.town}, ${a.county}. Owen comes to your drive: valets from £45, deep cleans, paint correction and ceramic coating.`,
    alternates: { canonical: `/areas/${a.slug}/` },
  };
}

export default async function TownPage({ params }: { params: Promise<{ town: string }> }) {
  const a = getArea((await params).town);
  if (!a) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Mobile car valeting in ${a.town}`,
    serviceType: "Mobile car valeting",
    url: `${site.url}/areas/${a.slug}/`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: [{ "@type": "City", name: a.town }, ...a.villages.map((v) => ({ "@type": "Place", name: v }))],
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Areas", item: `${site.url}/areas/` },
      { "@type": "ListItem", position: 2, name: a.town, item: `${site.url}/areas/${a.slug}/` },
    ],
  };
  return (
    <section className="wrap page-head town-page" aria-labelledby="town-h">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, crumbs]) }} />
      <p className="crumb">
        <Link href="/areas/">Areas</Link> <span aria-hidden="true">/</span> {a.town}
      </p>
      <h1 id="town-h">Mobile Car Valeting in {a.town}</h1>
      <p>{a.intro}</p>
      <p>
        {a.town} is {a.drive} from Owen&rsquo;s base. He also covers the villages around it, like{" "}
        {a.villages.slice(0, -1).join(", ")} and {a.villages.at(-1)}.
      </p>
      <p className="book-live">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a Clean
        </a>
        <a href={sms(`Hi Owen, I'm in ${a.town} and I'd like a `)} className="btn btn-line btn-big">
          Text Owen
        </a>
      </p>

      <h2>Prices in {a.town}</h2>
      <p>Same prices as everywhere else. These are for a small car; bigger vehicles cost a bit more.</p>
      <ul className="book-prices" role="list">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/${s.slug}/`}>{s.name}</Link> <span className="num">{fromText(s.from)}</span>
          </li>
        ))}
      </ul>
      <p>
        Owen confirms the final price once he&rsquo;s seen the vehicle, before he starts. {site.payment} Cars, vans,
        motorbikes, caravans, motorhomes, horseboxes and farm vehicles all welcome.
      </p>

      <h2>When Owen Works</h2>
      <dl className="hours-list">
        {hoursList.map(([d, t]) => (
          <div key={d}>
            <dt>{d}</dt>
            <dd>{t}</dd>
          </div>
        ))}
      </dl>

      <h2>What Customers Say</h2>
      <ReviewList items={reviews.slice(0, 3)} />
      <p>
        <Link href="/reviews/">All reviews</Link> &middot; <Link href="/work/">Our Work</Link> &middot;{" "}
        <a href={tel}>Call {site.phone}</a>
      </p>

      <h2>Other Areas</h2>
      <ul className="area-list" role="list">
        {areas
          .filter((x) => x.slug !== a.slug)
          .map((x) => (
            <li key={x.slug}>
              <Link href={`/areas/${x.slug}/`}>Mobile Car Valeting in {x.town}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
