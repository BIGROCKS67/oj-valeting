import type { Metadata } from "next";
import { site, tel, sms, bookHref } from "@/data/site";
import { hoursList } from "@/data/hours";
import { services } from "@/data/services";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";

// Owen, 18 Nov 2026: a Contact button at the end of the top menu instead of the number and Book.

export const metadata: Metadata = {
  title: "Contact Owen | OJ Valeting",
  description: "Call, text or email Owen at OJ Valeting to book a mobile valet or ask a question.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <>
    <PageHead id="contact-h" eyebrow={`Call or text ${site.phone}`} title="Contact Owen">
      <p>
        Call or text and Owen will get back to you. Tell him the car and roughly what you&rsquo;re after, and he&rsquo;ll
        give you an honest quote.
      </p>
    </PageHead>
    <section className="wrap contact">
      <div className="contact-text">
        {/* Owen, 18 Nov: laid out like elitekleanz.com/contact: the terms first (as drop-downs), then a big
            call button, then a quote form. Deposit and belongings confirmed by Owen 18 Nov. */}
        <section id="terms" className="contact-terms" aria-labelledby="terms-h">
          <h2 id="terms-h">Please read before booking</h2>
          <div className="drops">
            <details>
              <summary>Prices</summary>
              <p>
                Prices on this site are starting prices for each vehicle size. Owen confirms the final price once
                he&rsquo;s seen the vehicle, before he starts. It may change if the vehicle is dirtier than expected, or a
                bigger size than the one booked. {site.honest}
              </p>
              <p>{site.fuelNote}</p>
            </details>
            <details>
              <summary>Deposit</summary>
              <p>{site.deposit}</p>
            </details>
            <details>
              <summary>Personal belongings</summary>
              <p>
              </p>
              <p>
                Please take anything valuable or personal out of the vehicle before Owen starts. He can&rsquo;t be
                responsible for items left inside.
              </p>
            </details>
            <details>
              <summary>What Owen needs from you</summary>
              <p>{site.needs}</p>
            </details>
            <details>
              <summary>Paying</summary>
              <p>{site.payment}</p>
            </details>
            <details>
              <summary>Changing or cancelling</summary>
              <p>Text or call Owen on {site.phone} as early as you can.</p>
            </details>
          </div>
          <p className="terms-foot">
            How your details are used is on the <Link href="/privacy/">privacy page</Link>.
          </p>
        </section>

        <p className="contact-call">
          <a href={tel} className="btn btn-foam btn-big">
            Call Owen now <span className="num">{site.phone}</span>
          </a>
          <a href={sms("Hi Owen, ")} className="btn btn-dark btn-big">
            Or text him
          </a>
        </p>

        {/* Quote form: sent to Owen's email by FormSubmit (formsubmit.co). The first message triggers a
            one-off "activate" email to Owen, which he must click before forms come through. */}
        <form className="quote-form" action={`https://formsubmit.co/${site.email}`} method="POST">
          <h2>Get a quote</h2>
          <p className="qf-lead">Tell Owen about the vehicle and he&rsquo;ll text you back with an honest price.</p>
          <input type="hidden" name="_subject" value="New quote request from ojvalet.co.uk" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${site.url}/contact/thanks/`} />
          <input type="text" name="_honey" className="qf-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="qf-grid">
            <label>
              Name
              <input type="text" name="name" required autoComplete="name" />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" required autoComplete="tel" inputMode="tel" />
            </label>
            <label>
              Email
              <input type="email" name="email" autoComplete="email" />
            </label>
            <label>
              Vehicle (make and model)
              <input type="text" name="vehicle" required placeholder="e.g. BMW X5" />
            </label>
            <label className="qf-wide">
              What are you after?
              <select name="service" defaultValue="">
                <option value="" disabled>
                  Pick a service
                </option>
                {services.map((sv) => (
                  <option key={sv.slug}>{sv.name}</option>
                ))}
                <option>Not sure, Owen can advise</option>
              </select>
            </label>
            <label className="qf-wide">
              Anything else Owen should know
              <textarea name="message" rows={4} placeholder="Town, how dirty it is, pet hair, best day..." />
            </label>
          </div>
          <button type="submit" className="btn btn-foam btn-big">
            Send to Owen
          </button>
        </form>
      </div>
      <div className="contact-side">
        <h2>Get in touch</h2>
        <ul className="contact-list" role="list">
          <li>
            <span>Call</span>
            <a href={tel} className="num">
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
    </>
  );
}
