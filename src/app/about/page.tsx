import type { Metadata } from "next";
import Link from "next/link";
import { site, bookHref } from "@/data/site";
import { Pic } from "@/components/Pic";
import { Draft } from "@/components/Draft";

// Owen, call 18 Nov 2026: an About page with a photo of him by his van and a short "Hi, I'm Owen"
// paragraph on his experience and how he started. He is sending both. Until then this uses facts he has
// already given (sales call 16 Nov, WhatsApp 17 Nov) and his steam cleaning photo, with a Draft tag.

export const metadata: Metadata = {
  title: "About Owen | OJ Valeting",
  description:
    "Owen runs OJ Valeting, a mobile valeting and detailing business based between Brackley and Buckingham. He does every job himself.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <section className="wrap about" aria-labelledby="about-h">
      <figure className="about-photo">
        <Pic id="owen-steam-cleaning-door" priority sizes="(min-width: 900px) 40vw, 100vw" alt="Owen in his OJ Valeting T-shirt, steam cleaning the inside of a car door" />
      </figure>
      <div className="about-text prose">
        <h1 id="about-h">Hi, I&rsquo;m Owen</h1>
        <p>
          <Draft what="this page" />
        </p>
        <p>
          I started OJ Valeting just over a year ago, and by last summer I was doing five or six cars a day. I&rsquo;ve
          cleaned over 450 vehicles since, from city cars to Range Rovers, motorbikes, caravans and a Scania horsebox.
        </p>
        <p>
          I&rsquo;m based between Brackley and Buckingham and I come to you, at home or at work. You book me, and I&rsquo;m
          the one who turns up and does the job. I bring a waterproof gazebo, so rain won&rsquo;t stop me. All I need is a
          tap and a plug socket.
        </p>
        <p>
          I&rsquo;ll always tell you honestly what your car needs and quote for that, not just the most expensive package.
          I&rsquo;m fully insured, and I do emergency call-outs too.
        </p>
        <p className="about-cta">
          <a href={bookHref} className="btn btn-foam btn-big">
            Book a clean
          </a>{" "}
          <Link href="/work/">See the work</Link> or <a href={site.instagram}>follow on Instagram</a>.
        </p>
      </div>
    </section>
  );
}
