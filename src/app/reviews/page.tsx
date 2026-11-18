import type { Metadata } from "next";
import { site, bookHref } from "@/data/site";
import { reviews, homeQuote } from "@/data/reviews";
import { ReviewList } from "@/components/ReviewList";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "OJ Valeting reviews: mobile valeting, Brackley",
  description: "What customers say about Owen's mobile valeting: deep cleans, ozone treatment, paint correction, caravans and vans.",
  alternates: { canonical: "/reviews/" },
};

export default function Reviews() {
  return (
    <>
      <PageHead id="rev-h" eyebrow={`${site.google.rating} on Google, from ${site.google.count} reviews`} title="Reviews">
        <p>Every review customers have left for Owen, newest first, word for word.</p>
      </PageHead>
      <section className="wrap page-body">
      <ReviewList items={[...reviews, { text: homeQuote.text, name: "Monthly customer", when: "2026" }]} />
      <p className="center-cta">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a clean
        </a>
      </p>
      </section>
    </>
  );
}
