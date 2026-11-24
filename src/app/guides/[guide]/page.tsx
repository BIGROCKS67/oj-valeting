import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/data/guides";
import { getService } from "@/data/services";
import { site, tel, bookHref } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ guide: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }): Promise<Metadata> {
  const g = getGuide((await params).guide);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}/` } };
}

export default async function GuidePage({ params }: { params: Promise<{ guide: string }> }) {
  const g = getGuide((await params).guide);
  if (!g) notFound();
  const url = `${site.url}/guides/${g.slug}/`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.h1,
      description: g.description,
      url,
      author: { "@type": "Person", name: "Owen", worksFor: { "@id": `${site.url}/#business` } },
      publisher: { "@id": `${site.url}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.sections.map((s) => ({
        "@type": "Question",
        name: s.q,
        acceptedAnswer: { "@type": "Answer", text: s.a.join(" ") },
      })),
    },
  ];
  return (
    <article className="wrap page-head guide" aria-labelledby="guide-h">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <p className="crumb">
        <Link href="/guides/">Guides</Link> <span aria-hidden="true">/</span> {g.h1}
      </p>
      <h1 id="guide-h">{g.h1}</h1>
      <p className="guide-meta">Updated {g.updated}</p>
      <p>{g.intro}</p>
      {g.sections.map((s) => (
        <section key={s.q}>
          <h2>{s.q}</h2>
          {s.a.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}
      <h2>More From Owen</h2>
      <ul className="area-list" role="list">
        {g.related.map((slug) => {
          const s = getService(slug);
          return s ? (
            <li key={slug}>
              <Link href={`/${slug}/`}>{s.name}</Link>
            </li>
          ) : null;
        })}
        <li>
          <Link href="/areas/">Areas Owen Covers</Link>
        </li>
      </ul>
      <p className="book-live">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a Clean
        </a>
        <a href={tel} className="btn btn-line btn-big">
          Call <span className="num">{site.phone}</span>
        </a>
      </p>
    </article>
  );
}
