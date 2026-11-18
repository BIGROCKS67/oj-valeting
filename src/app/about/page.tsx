import type { Metadata } from "next";
import Link from "next/link";
import { site, bookHref } from "@/data/site";
import { Pic } from "@/components/Pic";
import { PageHead } from "@/components/PageHead";

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
    <PageHead id="about-h" eyebrow="Just me and my business" title={<>Hi, I&rsquo;m Owen</>} />
    <section className="wrap about">
      <figure className="about-photo">
        <Pic id="owen-steam-cleaning-door" priority sizes="(min-width: 900px) 40vw, 100vw" alt="Owen in his OJ Valeting T-shirt, steam cleaning the inside of a car door" />
      </figure>
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
        <p>I&rsquo;m super proud of how it&rsquo;s going and the support is much appreciated.</p>
        <p>Look forward to meeting you.</p>
        <p className="about-cta">
          <a href={bookHref} className="btn btn-foam btn-big">
            Book a clean
          </a>{" "}
          <Link href="/work/">See the work</Link> or <a href={site.instagram}>follow on Instagram</a>.
        </p>
      </div>
    </section>
    </>
  );
}
