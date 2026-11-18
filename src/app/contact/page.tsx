import type { Metadata } from "next";
import { site, tel, sms, bookHref } from "@/data/site";
import { hoursList } from "@/data/hours";

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
