import type { Metadata } from "next";
import { site, tel, sms, bookHref } from "@/data/site";
import { hoursList } from "@/data/hours";
import Link from "next/link";
import { Draft } from "@/components/Draft";

// Owen, 18 Nov 2026: a Contact button at the end of the top menu instead of the number and Book.

export const metadata: Metadata = {
  title: "Contact Owen | OJ Valeting",
  description: "Call, text or email Owen at OJ Valeting to book a mobile valet or ask a question.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <section className="wrap contact" aria-labelledby="contact-h">
      <div className="contact-text">
        <h1 id="contact-h">Contact Owen</h1>
        <p className="contact-lead">
          Call or text and Owen will get back to you. Tell him the car and roughly what you&rsquo;re after, and he&rsquo;ll
          give you an honest quote.
        </p>
        {/* Owen, 18 Nov: terms on this page, above the contact details, not a page of their own.
            Facts the site already states; Owen is writing his own wording. */}
        <section id="terms" className="contact-terms" aria-labelledby="terms-h">
          <h2 id="terms-h">Please read before booking</h2>
          <p>
            <Draft what="these terms" />
          </p>
          <h3>Prices</h3>
          <p>
            Prices on this site are starting prices for each vehicle size. Owen confirms the final price once he&rsquo;s
            seen the vehicle, before he starts. It may change if the vehicle is dirtier than expected, or a bigger size
            than the one booked. {site.honest}
          </p>
          <p>{site.fuelNote}</p>
          <h3>What Owen needs from you</h3>
          <p>{site.needs}</p>
          <h3>Paying</h3>
          <p>{site.payment}</p>
          <h3>Changing or cancelling</h3>
          <p>Text or call Owen on {site.phone} as early as you can.</p>
          <p>
            How your details are used is on the <Link href="/privacy/">privacy page</Link>.
          </p>
        </section>
        <ul className="contact-list" role="list">
          <li>
            <span>Call</span>
            <a href={tel} className="num">
              {site.phone}
            </a>
          </li>
          <li>
            <span>Text</span>
            <a href={sms("Hi Owen, ")} className="num">
              {site.phone}
            </a>
          </li>
          <li>
            <span>Email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <span>Instagram</span>
            <a href={site.instagram}>{site.instagramHandle}</a>
          </li>
          <li>
            <span>Facebook</span>
            <a href={site.facebook}>OJ Valeting</a>
          </li>
        </ul>
        <p>
          <a href={bookHref} className="btn btn-foam btn-big">
            Book a clean
          </a>
        </p>
      </div>
      <div className="contact-side">
        <h2>Opening hours</h2>
        <dl className="contact-hours">
          {hoursList.map(([d, h]) => (
            <div key={d}>
              <dt>{d}</dt>
              <dd>{h}</dd>
            </div>
          ))}
        </dl>
        <p>
          Based in Buckingham, Buckinghamshire MK18. Covering {site.counties.slice(0, -1).join(", ")} and{" "}
          {site.counties.at(-1)}, and nationwide. 24 hour emergency call-outs.
        </p>
      </div>
    </section>
  );
}
