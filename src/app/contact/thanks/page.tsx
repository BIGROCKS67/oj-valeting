import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { site, tel } from "@/data/site";

export const metadata: Metadata = {
  title: "Message sent | OJ Valeting",
  robots: { index: false },
  alternates: { canonical: "/contact/thanks/" },
};

export default function Thanks() {
  return (
    <>
      <PageHead id="thanks-h" eyebrow="Message sent" title="Thanks, Owen's Got It">
        <p>He&rsquo;ll text you back with a price as soon as he can. If it&rsquo;s urgent, give him a ring.</p>
      </PageHead>
      <section className="wrap page-body">
        <p className="contact-call">
          <a href={tel} className="btn btn-foam btn-big">
            Call Owen <span className="num">{site.phone}</span>
          </a>
          <Link href="/work/" className="hero-link dark">
            See his work while you wait
          </Link>
        </p>
      </section>
    </>
  );
}
