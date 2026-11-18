// Everything here is from Owen's old site (ojvaleting.org, read 16 Nov 2026) or the sales call
// the same day. Anything not yet confirmed by Owen is on the CONFIRM list in HANDOVER.md.

export const site = {
  name: "OJ Valeting",
  owner: "Owen",
  url: "https://ojvalet.co.uk", // ojvaleting.org and ojvalet.com redirect here
  phone: "07708 600114",
  phoneIntl: "+447708600114",
  email: "Ojsvaleting@gmail.com",
  instagram: "https://www.instagram.com/ojvaleting_",
  instagramHandle: "@ojvaleting_",
  facebook: "https://www.facebook.com/profile.php?id=61581228436016",
  // Owen, WhatsApp 17 Nov 2026: these five counties locally, further afield with a fuel charge
  //. Based between Brackley and Buckingham.
  counties: ["Buckinghamshire", "Northamptonshire", "Oxfordshire", "Bedfordshire", "Warwickshire"],
  towns: ["Brackley", "Buckingham", "Towcester", "Bicester", "Banbury", "Silverstone", "Milton Keynes", "Northampton", "Aylesbury", "Oxford"],
  // Owen, 17 Nov 2026 (late): Apple Pay, bank transfer and cash.
  payment: "Pay by Apple Pay, bank transfer or cash on the day.",
  // Owen, WhatsApp 17 Nov 2026: say this on the site and in booking.
  needs: "Owen needs a tap and a plug socket he can use at yours. He brings a waterproof gazebo, so rain won't stop the job.",
  // Owen, WhatsApp 17 Nov 2026.
  honest: "Owen tells you honestly what your car needs and quotes for that every time, not just the most expensive package.",
  // Owen, 17 Nov 2026: say nationwide.
  fuelNote: "Nationwide too: further afield is fine, with a small fuel charge.",
  // Hours shown on the site live in hours.ts. Bookable hours, days off and notice are set in Square.
  // Owen's Square Appointments booking page (set up 17 Nov 2026). Shows his real free slots,
  // with 30 minutes' travel after each job; he approves each request. Every Book button links here.
  // Owen, 17 Nov 2026: online booking paused until he is ready to go live. While false, every
  // Book button goes to /book/, which says call or text. Set true (and switch Square back on) to reopen.
  bookingOpen: false,
  // Home page photo: public/photos/hero-d.(avif|webp) on big screens, hero-m on phones, both graded
  // crops of Owen's Taycan (owen-28). Swap for a video loop if Owen films one.
  bookingApp: "https://book.squareup.com/appointments/1rs73chx3amn4i/location/LNTAB4BDN55JV/services",
  // Google Business Profile, as shown on Maps 17 Nov 2026. Update the count as reviews come in.
  google: { rating: "5.0", count: 13, url: "https://maps.google.com/?cid=380385847269804503" },
};

/** Book straight into one service in Square, or the full list if it isn't there yet */
export const bookUrl = (squareId?: string) =>
  !site.bookingOpen ? "/book/" : squareId ? `${site.bookingApp}/${squareId}` : site.bookingApp;

/** Where a general Book button goes: Square when booking is open, /book/ while it is paused */
export const bookHref = bookUrl();

export const tel = `tel:${site.phoneIntl}`;
export const sms = (body: string) => `sms:${site.phoneIntl}?&body=${encodeURIComponent(body)}`;
