import { PageHead } from "@/components/PageHead";
import type { Metadata } from "next";
import { site, tel, sms } from "@/data/site";
import { services, gbp, addOns, fromText } from "@/data/services";
import { hoursList, season } from "@/data/hours";

export const metadata: Metadata = {
  title: "Book a mobile car valet, Brackley | OJ Valeting",
  description:
    "Book Owen to come to you. Mobile valeting across Bucks, Northants, Oxfordshire, Beds and Warwickshire, and nationwide.",
  alternates: { canonical: "/book/" },
};

// All booking goes through Owen's Square diary (site.bookingApp). This page is here for old
// links and Google, and hands straight over to it. FAQ answers use only what Owen has told us.

const faq: [string, string][] = [
  [
    "How does booking work?",
    site.bookingOpen
      ? "Pick the service and your car size, then a free slot in Owen's live diary. Owen gets the request, checks it and confirms. Square sends you a confirmation and a reminder before the day."
      : "Call or text Owen on 07708 600114 with the service, your car and a day that suits, and he'll sort a time with you. Online booking opens soon.",
  ],
  [
    "Which size is my car?",
    "Roughly: small is a Polo or Fiesta, medium a Golf or 3 Series, large an estate or SUV, and XL a 7-seater, big 4x4 or van. If you're not sure, pick the nearest and Owen will tell you before he starts.",
  ],
  [
    "Can the price change?",
    "Prices are from prices. Owen confirms the final figure once he's seen the size and state of the vehicle, before he starts, so there are no surprises at the end. " + site.honest,
  ],
  ["What do you need from me?", site.needs],
  ["How do I pay?", "Apple Pay, bank transfer or cash on the day."],
  [
    "Where do you cover?",
    "Owen is based between Brackley and Buckingham and covers Buckinghamshire, Oxfordshire, Northamptonshire, Bedfordshire and Warwickshire. Nationwide too, with a small fuel charge for further afield.",
  ],
  [
    "Motorbike, caravan, motorhome, horsebox, van or farm vehicle?",
    "All welcome. Text Owen a photo and he'll quote and sort a time, because these vary too much to price online.",
  ],
  [
    "Can I add extras?",
    "Yes. Mention them in the notes when you book, or text Owen. Every add-on and its price is listed on this page.",
  ],
  ["Is there a deposit?", site.deposit],
  [
    "How do I change or cancel?",
    site.bookingOpen
      ? "Use the link in your Square confirmation email, or text Owen on 07708 600114 as early as you can."
      : "Text or call Owen on 07708 600114 as early as you can.",
  ],
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};
export default function Book() {
  return (
    <>
    <PageHead id="book-h" eyebrow={`${site.google.rating} on Google · fully insured`} title="Book a clean" />
    <section className="wrap book-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="book-intro">
        {site.bookingOpen ? (
          <>
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
          </>
        ) : (
          <>
            <p>
              Online booking opens soon. For now, call or text Owen with the service, your car and a day that suits,
              and he&rsquo;ll sort a time with you.
            </p>
            <p className="book-live">
              <a href={sms("Hi Owen, I'd like to book a ")} className="btn btn-foam btn-big">
                Text Owen to book
              </a>
              <a href={tel} className="btn btn-line btn-big">
                Call <span className="num">{site.phone}</span>
              </a>
            </p>
          </>
        )}
      </div>

      <div className="book-more">
        <div>
          <h2>Prices</h2>
          <ul className="book-prices" role="list">
            {services.map((s) => (
              <li key={s.slug}>
                <span>{s.name}</span> <span className="num">{fromText(s.from)}</span>
              </li>
            ))}
          </ul>
          <p>
            {/* Owen, 20 Nov 16:37: removed the "prices for a small car" lead-in */}
            Owen confirms the final price once he&rsquo;s seen the vehicle. Motorbike, caravan, motorhome, horsebox, farm vehicle or
            something not on the list? <a href={sms("Hi Owen, ")}>Text him</a> and he&rsquo;ll sort a time.
          </p>
          <p>{site.needs}</p>
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
      <div className="faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions</h2>
        {faq.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
    </>
  );
}
