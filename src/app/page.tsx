import Link from "next/link";
import { site, tel, bookHref } from "@/data/site";
import { captions } from "@/data/photos";
import { reviews, homeQuote } from "@/data/reviews";
import { Pic } from "@/components/Pic";
import { ReviewList } from "@/components/ReviewList";
import { ServiceMenu } from "@/components/ServiceMenu";
import { businessLd, websiteLd } from "@/data/schema";
import { asset } from "@/data/base";

// Foam bubbles that rise once behind the price list: [left %, size px, delay ms]
const suds: [number, number, number][] = [
  [4, 26, 0], [11, 14, 260], [19, 40, 120], [27, 18, 520], [36, 30, 340], [44, 12, 80],
  [53, 22, 600], [61, 36, 200], [69, 16, 440], [77, 28, 40], [85, 20, 380], [93, 34, 180],
];

// The five jobs on the home page mosaic: the first one is the big feature
const mosaic = ["porsche-taycan-black", "defender-snow-foam", "alfa-romeo-4c", "scania-horsebox", "porsche-taycan-blue"];

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([businessLd, websiteLd]) }} />

      {/* Hero, from the 20-agent study (18 Nov 2026): one photo held still, fading into livery black, the
          lettering bottom-left, proof as one quiet line by the button. Headline wording is Owen's. */}
      {/* Preload the one hero photo each screen size will use, so it starts loading before the CSS */}
      <link rel="preload" as="image" type="image/avif" href={asset("/photos/hero-d.avif")} media="(min-width: 1024px)" fetchPriority="high" />
      <link rel="preload" as="image" type="image/avif" href={asset("/photos/hero-m.avif")} media="(max-width: 1023px)" fetchPriority="high" />
      <section className="hero" aria-labelledby="hero-h">
        <picture className="hero-pic">
          <source media="(min-width: 1024px)" type="image/avif" srcSet={asset("/photos/hero-d.avif")} />
          <source media="(min-width: 1024px)" type="image/webp" srcSet={asset("/photos/hero-d.webp")} />
          <source type="image/avif" srcSet={asset("/photos/hero-m.avif")} />
          <img
            src={asset("/photos/hero-m.webp")}
            alt="A black Porsche Taycan wheel with red brake calipers, glossy after a valet by Owen"
            width={845}
            height={1127}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-in">
          <div className="hero-copy">
            <p className="hero-eyebrow">Owen comes to you, at home or work, anywhere in the UK</p>
            <h1 id="hero-h">
              <span className="hl hl-light">
                <span>Professional</span>
              </span>
              <span className="hl">
                <span>Mobile Valeting</span>
              </span>
              <span className="hl">
                <span>and Detailing</span>
              </span>
            </h1>
            <p className="hero-sub">Hand wash, deep cleans, paint correction and ceramic coating, done properly on your drive.</p>
            <div className="hero-cta">
              <a href={bookHref} className="btn btn-foam hero-book">
                Book a clean
              </a>
              <Link href="/work/" className="hero-link">
                See our work
              </Link>
            </div>
            <p className="hero-proof">
              <a href={site.google.url}>
                <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                  <path fill="#f5b400" d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" />
                </svg>{" "}
                {site.google.rating} from {site.google.count} Google reviews
              </a>
              <span aria-hidden="true"> · </span>450+ vehicles cleaned<span aria-hidden="true"> · </span>24hr call-outs
            </p>
          </div>
        </div>
      </section>
      <ul className="proof-band" role="list" aria-label="OJ Valeting in numbers">
        <li>
          <strong className="num">450+</strong> vehicles cleaned
        </li>
        <li>
          <strong className="num">{site.google.rating}</strong> from {site.google.count} Google reviews
        </li>
        <li>
          <strong className="num">24hr</strong> call-outs, fully insured
        </li>
        <li>
          <strong>UK</strong> nationwide
        </li>
      </ul>

      <section className="livery" id="prices" aria-labelledby="prices-h">
        <div className="suds" aria-hidden="true">
          {suds.map(([x, size, delay], i) => (
            <span key={i} style={{ "--x": `${x}%`, "--s": `${size}px`, "--d": `${delay}ms` } as React.CSSProperties} />
          ))}
        </div>
        <div className="livery-in">
          <div className="livery-head">
            <h2 id="prices-h">Services</h2>
            <p>
              Pick what you need: inside, outside or both, paint correction, a coating or a regular plan. Prices are for a small
              car and go up with size, and every service has its full table. Cars, vans, motorbikes, caravans, motorhomes,
              horseboxes and farm vehicles all welcome.
            </p>
          </div>
          <ServiceMenu />
          <p className="livery-foot">
            Owen confirms the final price once he&rsquo;s seen the vehicle, before he starts. Fuel charges may apply further afield. {site.honest} {site.needs} {site.payment}
          </p>
        </div>
      </section>

      {/* Driveway mosaic: one big feature job and four more, captions on the photos (Jack, 18 Nov: amp it up) */}
      <section className="drives" aria-labelledby="drives-h">
        <div className="wrap">
          <div className="drives-head">
            <p className="page-eyebrow dark">450+ vehicles and counting</p>
            <h2 id="drives-h">Every car here was cleaned on its owner&rsquo;s drive</h2>
            <p>
              From a Porsche Taycan to a Scania horsebox. More on <a href={site.instagram}>Instagram</a>.
            </p>
          </div>
          <ul className="mosaic" role="list">
            {mosaic.map((id, i) => (
              <li key={id} className={i === 0 ? "m-big" : undefined}>
                <figure>
                  <Pic id={id} sizes={i === 0 ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 25vw, 50vw"} />
                  <figcaption>{captions[id]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mosaic-cta">
            <Link href="/work/" className="btn btn-dark btn-big">
              See all our work
            </Link>
          </p>
        </div>
      </section>

      <section className="owen" aria-labelledby="owen-h">
        <div className="owen-split">
          <figure className="owen-photo">
            <Pic id="owen-steam-cleaning-door" sizes="(min-width: 900px) 50vw, 100vw" alt="Owen in his OJ Valeting T-shirt, steam cleaning the inside of a car door" />
          </figure>
          <div className="owen-text">
            <p className="page-eyebrow">Just me and my business</p>
            <h2 id="owen-h">Owen does every job himself</h2>
            <blockquote className="owen-quote">
              <p>
                &ldquo;Honesty and quality are the heart of everything I do. I&rsquo;ll always give you genuine advice and
                recommend only what your vehicle needs.&rdquo;
              </p>
            </blockquote>
            <p>
              Owen started OJ Valeting just over a year ago and has cleaned over 450 vehicles since. You book him, and
              he&rsquo;s the one who turns up and does the job.
            </p>
            <ul className="facts" role="list">
              <li>Fully insured</li>
              <li>Comes to your home or work</li>
              <li>Waterproof gazebo, so rain won&rsquo;t stop him</li>
              <li>Needs a tap and a plug socket</li>
              <li>24 hour emergency call-outs</li>
              <li>UK nationwide</li>
            </ul>
            <Link href="/about/" className="hero-link">
              More about Owen
            </Link>
          </div>
        </div>
      </section>

      <section className="said" aria-labelledby="said-h">
        <div className="wrap">
          <div className="said-top">
            <div>
              <h2 id="said-h">What customers say</h2>
              <figure className="big-quote">
                <blockquote>
                  <p>&ldquo;{homeQuote.text}&rdquo;</p>
                </blockquote>
                <figcaption>A monthly customer</figcaption>
              </figure>
            </div>
            <aside className="rating-card" aria-label="Google rating">
              <p className="rating-num num">{site.google.rating}</p>
              <p className="rating-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 20 20" width="22" height="22">
                    <path fill="#f5b400" d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" />
                  </svg>
                ))}
              </p>
              <p>from {site.google.count} Google reviews</p>
              <p className="rating-links">
                <Link href="/reviews/" className="btn btn-foam">
                  Read all {reviews.length + 1} reviews
                </Link>
                <a href={site.google.url}>See them on Google</a>
              </p>
            </aside>
          </div>
          <ReviewList items={[reviews[0], reviews[1], reviews[4]]} />
        </div>
      </section>

      <section className="book-band" aria-labelledby="bb-h">
        <div className="wrap bb-grid">
          <div>
            <h2 id="bb-h">{site.bookingOpen ? <>Book straight into Owen&rsquo;s diary</> : <>Book with Owen</>}</h2>
            <p>
              {site.bookingOpen
                ? "Pick the package and a free slot. You only see times Owen can do, and he confirms before the day."
                : "Call or text Owen to book. Online booking opens soon."}{" "}
              Based between Brackley and Buckingham, covering {site.counties.slice(0, -1).join(", ")} and {site.counties.at(-1)}. {site.fuelNote} {site.payment}
            </p>
          </div>
          <div className="bb-actions">
            <a href={bookHref} className="btn btn-foam btn-big">
              Book a clean
            </a>
            <a href={tel} className="btn btn-line-dark btn-big">
              Or call <span className="num">{site.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

