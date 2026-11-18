import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { areas } from "@/data/areas";
import { site, bookHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Areas covered: Brackley, Buckingham, Towcester | OJ Valeting",
  description:
    "Where Owen's mobile valeting covers: Brackley, Buckingham, Towcester, Bicester and across Bucks, Northants, Oxon, Beds and Warwickshire, plus nationwide.",
  alternates: { canonical: "/areas/" },
};

export default function Areas() {
  return (
    <>
      <PageHead id="areas-h" eyebrow="Mobile valeting, UK nationwide" title="Areas Owen covers">
        <p>
          Owen is based between Brackley and Buckingham and comes to your home or work. He covers{" "}
          {site.counties.slice(0, -1).join(", ")} and {site.counties.at(-1)}. {site.fuelNote}
        </p>
      </PageHead>
      <section className="wrap page-body">
      <ul className="area-list" role="list">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/areas/${a.slug}/`}>Mobile car valeting in {a.town}</Link>
            <span>
              {a.county}, {a.drive} from Owen
            </span>
          </li>
        ))}
      </ul>
      <p>
        Also regularly: {site.towns.filter((t) => !areas.some((a) => a.town === t)).join(", ")}.
      </p>
      <p className="center-cta">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a clean
        </a>
      </p>
      </section>
    </>
  );
}
