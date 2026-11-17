import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Car valeting guides and prices | OJ Valeting",
  description: "Straight answers from Owen: what a mobile valet costs, and whether your car needs paint correction before a ceramic coating.",
  alternates: { canonical: "/guides/" },
};

export default function Guides() {
  return (
    <section className="wrap page-head" aria-labelledby="guides-h">
      <h1 id="guides-h">Guides</h1>
      <p>Straight answers to the questions Owen gets asked most.</p>
      <ul className="area-list" role="list">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}/`}>{g.h1}</Link>
            <span>{g.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
