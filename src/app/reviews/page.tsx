import type { Metadata } from "next";
import { site } from "@/data/site";
import { reviews, homeQuote } from "@/data/reviews";
import { ReviewList } from "@/components/ReviewList";

export const metadata: Metadata = {
  title: "Reviews from OJ Valeting customers",
  description: "What customers say about Owen's mobile valeting: deep cleans, ozone treatment, paint correction, caravans and vans.",
  alternates: { canonical: "/reviews/" },
};

export default function Reviews() {
  return (
    <section className="wrap page-head" aria-labelledby="rev-h">
      <h1 id="rev-h">Reviews</h1>
      <p>Every review customers have left for Owen, newest first, word for word.</p>
      <ReviewList items={[...reviews, { text: homeQuote.text, name: "Monthly customer", when: "2026" }]} />
      <p className="center-cta">
        <a href={site.bookingApp} className="btn btn-foam btn-big">
          Book a clean
        </a>
      </p>
    </section>
  );
}
