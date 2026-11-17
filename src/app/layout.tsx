import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { site, tel, sms, bookHref } from "@/data/site";
import { services } from "@/data/services";
import { asset, isPreview } from "@/data/base";
import { hoursList, season } from "@/data/hours";
import { Motion } from "@/components/Motion";

// Turns motion on before first paint (no flash), and off again after 3s if the page script never ran.
const motionBoot = `try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: no-preference)").matches&&"IntersectionObserver"in window){d.classList.add("motion");setTimeout(function(){if(!window.__motion)d.classList.remove("motion")},3000)}}catch(e){}`;

const archivo = localFont({
  src: "../fonts/archivo-latin-standard-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Bing Webmaster Tools (Jack's account), added 17 Nov 2026. Keep it.
  verification: { other: { "msvalidate.01": "41E604313DBE1C6486CD9A5F3A4A5002" } },
  title: "OJ Valeting | Mobile Car Valeting, Brackley & Buckingham",
  description:
    "Owen comes to your home or work with the OJ Valeting van. Valets from £45, deep cleans from £150, paint correction and ceramic coating. Brackley, Buckingham, Towcester and beyond.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    images: [{ url: asset("/og.jpg"), width: 1200, height: 630, alt: "The OJ Valeting van on a customer's drive" }],
  },
  icons: {
    icon: [
      { url: asset("/favicon.png"), sizes: "48x48", type: "image/png" },
      { url: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  ...(isPreview && { robots: { index: false, follow: false } })
};

export const viewport: Viewport = {
  themeColor: "#f6f9fc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={archivo.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <Motion />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-head">
          <div className="head-in">
            <Link href="/" className="brand" aria-label="OJ Valeting, home">
              <img src={asset("/logo.png")} width={1078} height={503} alt="OJ Valeting" />
            </Link>
            <nav aria-label="Main" className="nav">
              <details className="nav-menu">
                <summary>Menu</summary>
                <ul>
                  <li>
                    <Link href="/#prices">Prices</Link>
                  </li>
                  {services.map((s) => (
                    <li key={s.slug} className="nav-svc">
                      <Link href={`/${s.slug}/`}>{s.name}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/work/">Our work</Link>
                  </li>
                  <li>
                    <Link href="/reviews/">Reviews</Link>
                  </li>
                  <li>
                    <Link href="/areas/">Areas covered</Link>
                  </li>
                </ul>
              </details>
              <ul className="nav-wide">
                <li>
                  <Link href="/#prices">Prices</Link>
                </li>
                <li>
                  <Link href="/work/">Our work</Link>
                </li>
                <li>
                  <Link href="/reviews/">Reviews</Link>
                </li>
              </ul>
            </nav>
            <a href={tel} className="head-call">
              <span className="head-call-l">Call Owen</span> <span className="num">{site.phone}</span>
            </a>
            <a href={bookHref} className="btn btn-foam head-book">
              Book a clean
            </a>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="site-foot">
          <div className="foot-in">
            <div className="foot-a">
              <img src={asset("/logo-mark.png")} width={434} height={368} alt="" className="foot-mark" loading="lazy" />
              <p className="foot-name">OJ Valeting</p>
              <p>
                Mobile valeting and detailing by Owen, at your home or place of work across{" "}
                {site.counties.slice(0, -1).join(", ")} and {site.counties.at(-1)}. Fully insured. Emergency call-outs
                too.
              </p>
              <p className="foot-base">Based in Buckingham, Buckinghamshire MK18</p>
            </div>
            <div>
              <p className="foot-h">Get in touch</p>
              <ul>
                <li>
                  <a href={tel} className="num">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={sms("Hi Owen, ")}>Text Owen</a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <a href={site.instagram}>Instagram {site.instagramHandle}</a>
                </li>
                <li>
                  <a href={site.facebook}>Facebook</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="foot-h">{season}</p>
              <dl className="hours-list">
                {hoursList.map(([d, t]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{t}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="foot-h">Services</p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}/`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="foot-h">More</p>
              <ul>
                <li>
                  <a href={bookHref}>Book a clean</a>
                </li>
                <li>
                  <Link href="/work/">Our work</Link>
                </li>
                <li>
                  <Link href="/reviews/">Reviews</Link>
                </li>
                <li>
                  <Link href="/areas/">Areas covered</Link>
                </li>
                <li>
                  <Link href="/guides/">Guides and prices</Link>
                </li>
                <li>
                  <Link href="/privacy/">Privacy</Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="legal">
            OJ Valeting, run by Owen. This site sets no cookies and loads nothing from Google or Facebook.
          </p>
        </footer>

        <nav className="action-bar" aria-label="Quick contact">
          <a href={tel}>Call</a>
          <a href={sms("Hi Owen, ")}>Text</a>
          <a href={bookHref} className="ab-book">
            Book a clean
          </a>
        </nav>
      </body>
    </html>
  );
}
