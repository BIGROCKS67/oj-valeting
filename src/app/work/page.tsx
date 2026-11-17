import type { Metadata } from "next";
import { wall, captions } from "@/data/photos";
import { site, bookHref } from "@/data/site";
import { Pic } from "@/components/Pic";

export const metadata: Metadata = {
  title: "Valeting work: cars, vans, horseboxes | OJ Valeting",
  description:
    "Photos of OJ Valeting jobs, every one on the customer's own drive: Porsches, Range Rovers, a Scania horsebox, an Opel Manta and more.",
  alternates: { canonical: "/work/" },
};

const extra = ["porsche-cayenne", "porsche-wheel", "range-rover-satin", "discovery-interior", "seat-headlight", "owen-polo-sill", "vw-golf-r", "bmw-5-series"];

export default function Work() {
  const all = [...wall, ...extra];
  return (
    <>
      <section className="wrap page-head" aria-labelledby="work-h">
        <h1 id="work-h">Our work</h1>
        <p>
          {all.length} jobs, every one done on the owner&rsquo;s drive or yard. Owen posts new ones on{" "}
          <a href={site.instagram}>Instagram {site.instagramHandle}</a>.
        </p>
      </section>
      <ul className="wrap work-grid" role="list">
        {all.map((id) => (
          <li key={id}>
            <figure>
              <Pic id={id} sizes="(min-width: 1100px) 25vw, (min-width: 600px) 33vw, 50vw" />
              <figcaption>{captions[id]}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="wrap center-cta">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a clean
        </a>
      </p>
    </>
  );
}
