import type { Metadata } from "next";
import { site, bookHref } from "@/data/site";
import { reviews, homeQuote } from "@/data/reviews";
import { ReviewList } from "@/components/ReviewList";
import { PageHead } from "@/components/PageHead";
import { Stars } from "@/components/Stars";

export const metadata: Metadata = {
  title: "OJ Valeting reviews: mobile valeting, Brackley",
  description: "What Customers Say about Owen's mobile valeting: deep cleans, ozone treatment, paint correction, caravans and vans.",
  alternates: { canonical: "/reviews/" },
};

export default function Reviews() {
  return (
    <>
      <PageHead id="rev-h" eyebrow={`${site.google.rating} on Google, from ${site.google.count} reviews`} title="Reviews">
        <p>Every review customers have left for Owen, newest first, word for word.</p>
      </PageHead>
      <section className="wrap page-body">
        <div className="rev-summary">
          <p className="rating-num num">{site.google.rating}</p>
          <div>
            <Stars size={24} />
            <p>
              From {site.google.count} reviews on Google.
            </p>
          </div>
          <p className="rev-actions">
            <a href={site.google.url} className="btn btn-dark">
              See them on Google
            </a>
            <a href={site.google.review} className="hero-link dark">
              Had Owen round? Leave a review
            </a>
          </p>
        </div>
        <ReviewList cards items={[...reviews, { text: homeQuote.text, name: "Monthly customer", when: "2026" }]} />
      <p className="center-cta">
        <a href={bookHref} className="btn btn-foam btn-big">
          Book a Clean
        </a>
      </p>
      </section>
    </>
  );
}
