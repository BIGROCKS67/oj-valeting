import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { site, tel } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a mobile valet or detail online | OJ Valeting",
  description:
    "Choose your package, vehicle, extras and a day, and Owen texts you to confirm. Mobile valeting across Bucks, Northants and Oxfordshire.",
  alternates: { canonical: "/book/" },
};

export default function Book() {
  return (
    <section className="wrap book-page" aria-labelledby="book-h">
      <div className="book-intro">
        <h1 id="book-h">Book a clean</h1>
        <p>
          Takes about two minutes, and Owen texts you to confirm. Rather talk it through? Call{" "}
          <a href={tel} className="num">
            {site.phone}
          </a>
          .
        </p>
        {site.bookingApp && (
          <p className="book-live">
            <a href={site.bookingApp} className="btn btn-foam">
              See Owen&rsquo;s free slots and book
            </a>
            <span>Live diary, so you only see times he can do. Or fill in the form below.</span>
          </p>
        )}
      </div>
      <BookingForm />
    </section>
  );
}
