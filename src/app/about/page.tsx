import type { Metadata } from "next";
import Link from "next/link";
import { site, bookHref } from "@/data/site";

// Owen's own words, sent on WhatsApp 20 Nov 2026 (16:41). Photo: Owen by his van (19 Nov).

export const metadata: Metadata = {
  title: "About Owen | OJ Valeting",
  description:
    "Owen runs OJ Valeting, a fully insured mobile detailing and valeting business in Buckinghamshire. Over 450 vehicles worked on, every job done by Owen himself.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <>
    {/* Owen, voice note 19 Nov: photo across the whole width behind the text, like the home page.
        about-w is a wide composite (photo right, dark soft fill left); about-m is the plain photo for phones.
        Swap both when Owen sends a new photo. */}
    <section className="about-hero" aria-labelledby="about-h">
      <picture className="about-hero-pic">
        <source media="(min-width: 900px)" type="image/avif" srcSet="/photos/about-w.avif" />
        <source media="(min-width: 900px)" type="image/webp" srcSet="/photos/about-w.webp" />
        <source type="image/avif" srcSet="/photos/about-m.avif" />
        <img src="/photos/about-m.webp" alt="Owen in his OJ Valeting cap and T-shirt, standing in front of the OJ Valeting van" fetchPriority="high" />
      </picture>
      <div className="about-hero-in">
      <p className="page-eyebrow">Just me and my business</p>
      <h1 id="about-h">Hi, I&rsquo;m Owen</h1>
      <div className="about-text prose">
        {/* Owen's own About text, WhatsApp 20 Nov 16:41. Weather/gazebo line kept from 19 Nov. */}
        <p className="about-lead">Professional valeting and detailing, with a passion for perfection.</p>
        <p>
          I started OJ Valeting just over a year ago from a genuine passion for cars and a love for bringing vehicles
          back to their best. Since then, I&rsquo;ve had the pleasure of working on over 450 different vehicles, and
          I&rsquo;m proud of how far the business has come.
        </p>
        <p>
          For me, detailing is about more than just cleaning cars. I love seeing the transformation, taking pride in
          the smallest details and knowing every customer drives away happy with the results.
        </p>
        <p>
          Honesty, quality and attention to detail are at the heart of everything I do. I use professional grade
          products and equipment, never cut corners and always recommend what&rsquo;s best for your vehicle.
        </p>
        <p>
          As a fully insured mobile valeting and detailing business, I bring professional vehicle care directly to
          you, wherever you are. I also take the weather into consideration, and if it&rsquo;s needed I have a gazebo
          I can work under for the best results.
        </p>
        <p>
          My goal is simple: to deliver outstanding results, provide a service you can trust and treat every vehicle
          as if it were my own.
        </p>
        <p>Thank you for supporting OJ Valeting!</p>
        <p className="about-sign">Owen, owner of OJ Valeting</p>
        <p className="about-cta">
          <a href={bookHref} className="btn btn-foam btn-big">
            Book a clean
          </a>{" "}
          <Link href="/work/">See the work</Link>
          <a href={site.instagram}>Follow on Instagram</a>
        </p>
      </div>
      </div>
    </section>
    </>
  );
}
