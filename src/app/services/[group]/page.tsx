import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, serviceGroups, protectionAddOns, addOns } from "@/data/services";
import { site, tel } from "@/data/site";
import { PageHead } from "@/components/PageHead";
import { ServiceCardList } from "@/components/ServiceMenu";

export const dynamicParams = false;
export const generateStaticParams = () => serviceGroups.map((g) => ({ group: g.slug }));

const getGroup = (slug: string) => serviceGroups.find((g) => g.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }): Promise<Metadata> {
  const g = getGroup((await params).group);
  if (!g) return {};
  return {
    title: `${g.name}: mobile, UK nationwide | OJ Valeting`,
    description: g.intro,
    alternates: { canonical: `/services/${g.slug}/` },
  };
}

export default async function Group({ params }: { params: Promise<{ group: string }> }) {
  const g = getGroup((await params).group);
  if (!g) notFound();
  const list = services.filter((s) => g.cats.includes(s.category));
  const others = serviceGroups.filter((o) => o.slug !== g.slug);
  return (
    <>
      <PageHead id="grp-h" eyebrow="Mobile valeting and detailing, UK nationwide" title={g.name}>
        <p>{g.intro}</p>
      </PageHead>
      <section className="wrap page-body">
        <ServiceCardList slugs={list.map((s) => s.slug)} />
        {g.slug === "ceramic-coating" && (
          <ul className="menu-addons" role="list" aria-label="Other protection">
            {protectionAddOns.map((a) => (
              <li key={a}>
                <span>{a}</span> <span className="num">{addOns[a]}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="center-cta">
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}/`} className="btn btn-dark">
              {o.name}
            </Link>
          ))}{" "}
          <Link href="/#prices" className="hero-link dark">
            All services and prices
          </Link>
        </p>
        <p className="center-cta">
          Not sure which you need? Call or text Owen on <a href={tel}>{site.phone}</a>.
        </p>
      </section>
    </>
  );
}
