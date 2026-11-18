import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Privacy | OJ Valeting",
  description: "How OJ Valeting uses the details you give when you book.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <>
    <PageHead id="pv-h" title="Privacy" />
    <section className="wrap prose">
      <p>OJ Valeting is run by Owen, who is responsible for the details you send through this site.</p>
      <h2>What happens to your details</h2>
      <p>
        Online bookings are taken through Square Appointments (squareup.com), which holds your name, number, email,
        address and booking so Owen can see them in his diary and send you reminders. Square&rsquo;s own privacy notice
        covers how it stores them. Owen uses your details only to confirm and carry out the booking and to contact you
        about it.
      </p>
      <h2>How long they are kept</h2>
      <p>Booking details are kept for 12 months after the last job, then deleted, unless you&rsquo;re on a maintenance plan.</p>
      <h2>Cookies</h2>
      <p>
        This site sets no cookies and loads nothing from Google, Facebook or any advertising company. The Square booking
        page is run by Square and has its own cookie settings.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask Owen for a copy of your details, or to correct or delete them, by emailing {site.email}. If you&rsquo;re
        unhappy with the answer you can complain to the Information Commissioner&rsquo;s Office at ico.org.uk.
      </p>
    </section>
    </>
  );
}
