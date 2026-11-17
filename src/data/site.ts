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
  // (about £10 for a job 45 minutes away). Based between Brackley and Buckingham.
  counties: ["Buckinghamshire", "Northamptonshire", "Oxfordshire", "Bedfordshire", "Warwickshire"],
  towns: ["Brackley", "Buckingham", "Towcester", "Bicester", "Banbury", "Silverstone", "Milton Keynes", "Northampton", "Aylesbury", "Oxford"],
  fuelNote: "Further afield is fine too, with a small fuel charge (about £10 for a job 45 minutes away).",
  // Hours shown on the site live in hours.ts. Bookable hours, days off and notice are set in Square.
  // Owen's Square Appointments booking page (set up 17 Nov 2026). Shows his real free slots,
  // with 30 minutes' travel after each job; he approves each request. Every Book button links here.
  bookingApp: "https://book.squareup.com/appointments/1rs73chx3amn4i/location/LNTAB4BDN55JV/services",
};

export const tel = `tel:${site.phoneIntl}`;
export const sms = (body: string) => `sms:${site.phoneIntl}?&body=${encodeURIComponent(body)}`;
