import type { Metadata } from "next";
import { site, tel, sms } from "@/data/site";
import { services, gbp, addOns } from "@/data/services";
import { hoursList, season } from "@/data/hours";

export const metadata: Metadata = {
  title: "Book a mobile valet or detail online | OJ Valeting",
  description:
    "Pick a free slot in Owen's live diary and he comes to you. Mobile valeting across Bucks, Northants and Oxfordshire.",
  alternates: { canonical: "/book/" },
};

// All booking goes through Owen's Square diary (site.bookingApp). This page is here for old
// links and Google, and hands straight over to it.
export default function Book() {
  return (
    <section className="wrap book-page" aria-labelledby="book-h">
      <div className="book-intro">
        <h1 id="book-h">Book a clean</h1>
        <p>
          Owen&rsquo;s diary is live, so you only see times he can actually do. Pick the package and a time, and he
          confirms it with you before the day.
        </p>
        <p className="book-live">
          <a href={site.bookingApp} className="btn btn-foam btn-big">
            See free slots and book
          </a>
          <a href={tel} className="btn btn-line btn-big">
            Or call <span className="num">{site.phone}</span>
          </a>
        </p>
      </div>

      <div className="book-more">
        <div>
          <h2>Prices</h2>
          <ul className="book-prices" role="list">
            {services.map((s) => (
              <li key={s.slug}>
                <span>{s.name}</span> <span className="num">from {gbp(s.from)}</span>
              </li>
            ))}
          </ul>
          <p>
            These are prices for a small car. Bigger vehicles cost a bit more: each service page has the full
            table by size. Owen confirms the final price once he&rsquo;s seen the vehicle. Caravan, motorhome, horsebox or
            something not on the list? <a href={sms("Hi Owen, ")}>Text him</a> and he&rsquo;ll sort a time.
          </p>
          <p>{site.payment}</p>
          <h2>Add-ons</h2>
          <ul className="book-prices" role="list">
            {Object.entries(addOns).map(([name, price]) => (
              <li key={name}>
                <span>{name}</span> <span className="num">{price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Where Owen works</h2>
          <p>
            Based between Brackley and Buckingham. Regulars in {site.towns.slice(0, -1).join(", ")} and{" "}
            {site.towns.at(-1)}, and anywhere across {site.counties.slice(0, -1).join(", ")} and {site.counties.at(-1)}.{" "}
            {site.fuelNote}
          </p>
          <h2>{season}</h2>
          <dl className="hours-list">
            {hoursList.map(([d, t]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{t}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
