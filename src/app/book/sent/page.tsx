import type { Metadata } from "next";
import Link from "next/link";
import { site, tel, sms } from "@/data/site";
import { Pic } from "@/components/Pic";

export const metadata: Metadata = {
  title: "Booking request sent | OJ Valeting",
  description: "Your booking request has reached Owen.",
  robots: { index: false },
  alternates: { canonical: "/book/sent/" },
};

export default function Sent() {
  return (
    <section className="wrap sent" aria-labelledby="sent-h">
      <div>
        <h1 id="sent-h">Thanks, your booking request is with Owen</h1>
        <p>
          He&rsquo;ll text you on the number you gave to confirm the day, the start time and the price. If he&rsquo;s out on
          a job, that may be at the end of the day.
        </p>
        <p>
          Got a photo of the car, or a mark you want him to look at? Text it to{" "}
          <a href={sms("Hi Owen, I've just booked on the website. Here's a photo of the car.")} className="num">
            {site.phone}
          </a>
          .
        </p>
        <p>
          Need to change something? <a href={tel}>Call Owen</a> or <Link href="/book/">send a new request</Link>.
        </p>
      </div>
      <figure>
        <Pic id="oj-van-rear" sizes="(min-width: 900px) 30vw, 100vw" alt="The back of the OJ Valeting van with Owen's number on it" />
      </figure>
    </section>
  );
}
