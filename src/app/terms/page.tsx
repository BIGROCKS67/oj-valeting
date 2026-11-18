import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Draft } from "@/components/Draft";

// Owen, call 18 Nov 2026: wants terms and conditions on the site and will write his own.
// Until he sends them, this only restates what the site already says about booking and paying.

export const metadata: Metadata = {
  title: "Terms and conditions | OJ Valeting",
  description: "How booking, prices, payment and changes work with OJ Valeting.",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <section className="wrap prose" aria-labelledby="tc-h">
      <h1 id="tc-h">Terms and conditions</h1>
      <p>
        <Draft what="these terms" />
      </p>
      <p>OJ Valeting is run by Owen. These terms cover every booking, whether you book online, by phone or by text.</p>
      <h2>Prices</h2>
      <p>
        Prices on this site are starting prices for each vehicle size. Owen confirms the final price once he&rsquo;s seen
        the vehicle, before he starts. It may change if the vehicle is dirtier than expected, or if it&rsquo;s a bigger size
        than the one booked. {site.honest}
      </p>
      <p>{site.fuelNote}</p>
      <h2>What Owen needs from you</h2>
      <p>{site.needs}</p>
      <h2>Paying</h2>
      <p>{site.payment}</p>
      <h2>Changing or cancelling</h2>
      <p>Text or call Owen on {site.phone} as early as you can.</p>
      <h2>Your details</h2>
      <p>
        How your details are used is on the <Link href="/privacy/">privacy page</Link>.
      </p>
    </section>
  );
}
