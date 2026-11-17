import Link from "next/link";
import { site, tel } from "@/data/site";
import { services, gbp } from "@/data/services";
import { wall, captions } from "@/data/photos";
import { reviews, homeQuote } from "@/data/reviews";
import { Pic } from "@/components/Pic";
import { ReviewList } from "@/components/ReviewList";
import { RowButtons } from "@/components/RowButtons";
import { businessLd } from "@/data/schema";

// Foam bubbles that rise once behind the price list: [left %, size px, delay ms]
const suds: [number, number, number][] = [
  [4, 26, 0], [11, 14, 260], [19, 40, 120], [27, 18, 520], [36, 30, 340], [44, 12, 80],
  [53, 22, 600], [61, 36, 200], [69, 16, 440], [77, 28, 40], [85, 20, 380], [93, 34, 180],
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }} />

      <section className="hero" aria-labelledby="hero-h">
        <div className="hero-text">
          <h1 id="hero-h">Mobile car valeting and detailing on your drive, from&nbsp;£45</h1>
          <p className="hero-sub">
            Owen brings the van and all the kit to your home or work, across {site.counties.slice(0, -1).join(", ")} and{" "}
            {site.counties.at(-1)}. Valets, deep cleans, paint correction and ceramic coating.
          </p>
          <div className="hero-cta">
            <a href={site.bookingApp} className="btn btn-foam btn-big">
              Book a clean
            </a>
            <a href={tel} className="btn btn-line btn-big">
              Call <span className="num">{site.phone}</span>
            </a>
          </div>
          <p className="hero-small">Fully insured. Emergency call-outs too.</p>
        </div>
        <figure className="hero-photo">
          <Pic id="oj-van-livery" priority sizes="(min-width: 900px) 45vw, 100vw" alt="The black OJ Valeting van with its blue bubble livery, parked on a gravel drive" />
        </figure>
      </section>

      <section className="livery" id="prices" aria-labelledby="prices-h">
        <div className="suds" aria-hidden="true">
          {suds.map(([x, size, delay], i) => (
            <span key={i} style={{ "--x": `${x}%`, "--s": `${size}px`, "--d": `${delay}ms` } as React.CSSProperties} />
          ))}
        </div>
        <div className="livery-in">
          <div className="livery-head">
            <h2 id="prices-h">Prices</h2>
            <p>
              Every price is a starting price. Owen confirms the final figure once he knows the size and state of the
              vehicle, before he starts. Cars, vans, caravans, motorhomes and horseboxes all welcome.
            </p>
          </div>
          <ol className="pricelist" role="list">
            {services.map((s) => (
              <li key={s.slug}>
                <h3>
                  <Link href={`/${s.slug}/`}>{s.name}</Link>
                </h3>
                <p className="pl-time">{s.note && s.slug === "maintenance-valet" ? `${s.time}, ${s.note.toLowerCase()}` : s.time}</p>
                <p className="pl-price">
                  <span className="pl-from">from</span> <span className="num">{gbp(s.from)}</span>
                </p>
                <p className="pl-says">{s.owenSays}</p>
                <p className="pl-links">
                  <Link href={`/${s.slug}/`}>What&rsquo;s included</Link>
                  <a href={site.bookingApp} className="pl-book">
                    Book the {s.name.toLowerCase()}
                  </a>
                </p>
              </li>
            ))}
          </ol>
          <p className="livery-foot">
            Extras like ozone treatment, dog hair removal, headlight restoration and clay bar can go on any booking.
          </p>
        </div>
      </section>

      <section className="drives" aria-labelledby="drives-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="drives-h">Every car here was cleaned on its owner&rsquo;s drive</h2>
            <p>
              From a Golf R to a Scania horsebox. More on <Link href="/work/">our work</Link> and{" "}
              <a href={site.instagram}>Instagram</a>.
            </p>
            <RowButtons target="drive-row" label="Scroll the driveway photos" />
          </div>
        </div>
        <ul className="drive-row" id="drive-row" role="list" tabIndex={0} aria-label="Cars cleaned on their owners' drives">
          {wall.slice(0, 16).map((id) => (
            <li key={id}>
              <figure>
                <Pic id={id} sizes="(min-width: 900px) 22vw, 70vw" />
                <figcaption>{captions[id]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="owen" aria-labelledby="owen-h">
        <div className="wrap owen-grid">
          <figure className="owen-photo">
            <Pic id="owen-steam-cleaning-door" sizes="(min-width: 900px) 40vw, 100vw" alt="Owen in his OJ Valeting T-shirt, steam cleaning the inside of a car door" />
          </figure>
          <div className="owen-text">
            <h2 id="owen-h">Owen does every job himself</h2>
            <p>
              &ldquo;Whether it&rsquo;s a basic clean or a full deep clean, a paint correction or a ceramic coating, I
              treat every vehicle with the care and precision it deserves, and I use premium products to get there.&rdquo;
            </p>
            <p>
              Owen started OJ Valeting just over a year ago and was doing five or six cars a day by last summer. You
              book him, and he&rsquo;s the one who turns up, in the black van with the bubbles on the side.
            </p>
            <ul className="facts" role="list">
              <li>Fully insured</li>
              <li>Comes to your home or work</li>
              <li>Emergency call-outs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="said" aria-labelledby="said-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="said-h">What customers say</h2>
            <p>
              <Link href="/reviews/">All {reviews.length + 1} reviews</Link>
            </p>
          </div>
          <figure className="big-quote">
            <blockquote>
              <p>&ldquo;{homeQuote.text}&rdquo;</p>
            </blockquote>
            <figcaption>A monthly customer</figcaption>
          </figure>
          <ReviewList items={[reviews[0], reviews[1], reviews[4]]} />
        </div>
      </section>

      <section className="book-band" aria-labelledby="bb-h">
        <div className="wrap bb-grid">
          <div>
            <h2 id="bb-h">Book straight into Owen&rsquo;s diary</h2>
            <p>
              Pick the package and a free slot. You only see times Owen can do, and he confirms before the day. Based between Brackley and Buckingham, covering {site.counties.slice(0, -1).join(", ")} and {site.counties.at(-1)}. {site.fuelNote}
            </p>
          </div>
          <div className="bb-actions">
            <a href={site.bookingApp} className="btn btn-foam btn-big">
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

