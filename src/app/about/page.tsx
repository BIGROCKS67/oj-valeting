import type { Metadata } from "next";
import Link from "next/link";
import { site, bookHref } from "@/data/site";

// Owen's own words, sent on WhatsApp 18 Nov 2026 (15:36); spelling tidied only. Photo: his steam
// cleaning shot until he sends one of him by his van.

export const metadata: Metadata = {
  title: "About Owen | OJ Valeting",
  description:
    "Owen runs OJ Valeting, a mobile valeting and detailing business based between Brackley and Buckingham. He does every job himself.",
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
        <img src="/photos/about-m.webp" alt="Owen in his OJ Valeting T-shirt, steam cleaning the inside of a car door" fetchPriority="high" />
      </picture>
      <div className="about-hero-in">
      <p className="page-eyebrow">Just me and my business</p>
      <h1 id="about-h">Hi, I&rsquo;m Owen</h1>
      <div className="about-text prose">
        <p>
          I started OJ Valeting just over a year ago and have cleaned over 450 different types of vehicles, and
          counting.
        </p>
        <p>
          Honesty and quality are the heart of everything I do. I&rsquo;ll always give you genuine advice and recommend
          only what your vehicle needs. My OCD and attention to detail is unmatched and you won&rsquo;t be disappointed.
        </p>
        <p>
          I travel nationwide to make sure you get the best results. I&rsquo;m fully insured, and 24 hour emergency
          call-outs are welcome.
        </p>
        <p>I use professional grade products and equipment to get the job completed to the highest quality.</p>
        <p>
          I also take the weather into consideration when carrying out professional work, and if it&rsquo;s needed I
          have a gazebo I can work under for the best results.
        </p>
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
