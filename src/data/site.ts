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
  needs: "Owen needs a tap and a plug socket he can use at yours. Owen does have a waterproof gazebo, so light rain won't stop the job.",
  // Owen, 19 Nov 2026 (replaces 18 Nov £50-over-£150 rule): 20% deposit on every service, non-refundable, like Elite Kleanz's terms.
  // Was: £50 deposit on bookings over £150, taken off the final price; lost if they
  // cancel less than 48 hours before the booking.
  deposit: "Every booking needs a 20% deposit to secure the date, and it comes off the final price. Deposits can't be refunded or moved to another booking if you cancel or don't keep the appointment. If Owen has to cancel, because of the weather for example, he'll rebook you at the earliest date he can or give you a full refund.",
  // Owen, WhatsApp 17 Nov 2026.
  honest: "Owen tells you honestly what your car needs and quotes for that every time, not just the most expensive package.",
  // Owen, 17 Nov 2026: say nationwide.
  fuelNote: "Nationwide too: further afield is fine, with a small fuel charge.",
  // Hours shown on the site live in hours.ts. Bookable hours, days off and notice are set in Square.
  // Owen's Square Appointments booking page (set up 17 Nov 2026). Shows his real free slots,
  // with 30 minutes' travel after each job; he approves each request. Every Book button links here.
  // Owen, 17 Nov 2026: online booking paused until he is ready to go live. While false, every
  // Book button goes to /book/, which says call or text. Set true (and switch Square back on) to reopen.
  bookingOpen: true,
  // Home page photo: public/photos/hero-d.(avif|webp) on big screens, hero-m on phones, both graded
  // crops of Owen's Taycan (owen-28). Swap for a video loop if Owen films one.
  bookingApp: "https://book.squareup.com/appointments/1rs73chx3amn4i/location/LNTAB4BDN55JV/services",
  // Google Business Profile, as shown on Maps 17 Nov 2026. Update the count as reviews come in.
  google: { rating: "5.0", count: 13, url: "https://maps.google.com/?cid=380385847269804503", review: "https://g.page/r/CddJGqjpZkcFEBM/review" },
};

/** Square eGift card order page (set up 23 Nov 2026: £25, £50, £100, £150) */
export const giftUrl = "https://app.squareup.com/gift/ML8QY5NRCAAJG/order";

/** Book straight into one service in Square, or the full list if it isn't there yet */
export const bookUrl = (squareId?: string) =>
  !site.bookingOpen ? "/book/" : squareId ? `${site.bookingApp}/${squareId}` : site.bookingApp;

/** Where a general Book button goes: Square when booking is open, /book/ while it is paused */
export const bookHref = bookUrl();

export const tel = `tel:${site.phoneIntl}`;
export const sms = (body: string) => `sms:${site.phoneIntl}?&body=${encodeURIComponent(body)}`;
