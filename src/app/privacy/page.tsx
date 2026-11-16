import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy | OJ Valeting",
  description: "How OJ Valeting uses the details you send through the booking form.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <section className="wrap prose" aria-labelledby="pv-h">
      <h1 id="pv-h">Privacy</h1>
      <p>OJ Valeting is run by Owen, who is responsible for the details you send through this site.</p>
      <h2>What happens to your details</h2>
      <p>
        When you send a booking request, your name, number, email if you give one, address, vehicle and booking choices are
        emailed to Owen at {site.email}. The form is delivered by FormSubmit (formsubmit.co), which passes the message on
        and does not use it for anything else. Owen uses your details only to confirm and carry out the booking and to
        contact you about it.
      </p>
      <h2>How long they are kept</h2>
      <p>Booking emails are kept for 12 months after the last job, then deleted, unless you&rsquo;re on a maintenance plan.</p>
      <h2>Cookies</h2>
      <p>This site sets no cookies and loads nothing from Google, Facebook or any advertising company.</p>
      <h2>Your rights</h2>
      <p>
        You can ask Owen for a copy of your details, or to correct or delete them, by emailing {site.email}. If you&rsquo;re
        unhappy with the answer you can complain to the Information Commissioner&rsquo;s Office at ico.org.uk.
      </p>
    </section>
  );
}
