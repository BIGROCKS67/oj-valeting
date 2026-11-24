import type { Metadata } from "next";
import { wall, captions } from "@/data/photos";
import { site, bookHref } from "@/data/site";
import { WorkGallery } from "@/components/WorkGallery";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Valeting work: cars, vans, horseboxes | OJ Valeting",
  description:
    "Photos of OJ Valeting jobs, every one on the customer's own drive: Porsches, Range Rovers, a Scania horsebox, an Opel Manta and more.",
  alternates: { canonical: "/work/" },
};

const extra = ["porsche-cayenne", "porsche-wheel", "range-rover-satin", "discovery-interior", "headlight-restoration", "owen-polo-sill", "soft-top-treatment", "vw-golf-r", "bmw-5-series"];

export default function Work() {
  const all = [...wall, ...extra];
  return (
    <>
      <PageHead id="work-h" eyebrow="450+ vehicles cleaned" title="Our Work">
        {/* Owen, 17 Nov 2026: over 450 vehicles cleaned. */}
        <p>
          Every one cleaned on the owner&rsquo;s own drive or yard. New ones go up on{" "}
          <a href={site.instagram}>Instagram {site.instagramHandle}</a> and <a href={site.facebook}>Facebook</a>.
        </p>
      </PageHead>
      <section className="wrap page-body">
        <WorkGallery items={all.map((id) => ({ id, caption: captions[id] }))} />
      </section>
      <p className="wrap center-cta">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a Clean
        </a>
      </p>
    </>
  );
}
