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
  counties: ["Buckinghamshire", "Northamptonshire", "Oxfordshire"],
  // Working hours and start times live in hours.ts.
  // Days off. England bank holidays to Easter 2027 for now. CONFIRM with Owen: holidays and Christmas.
  closedDates: ["2026-12-25", "2026-12-26", "2026-12-28", "2027-01-01", "2027-03-26", "2027-03-29"],
  bookAheadDays: 42,
  minNoticeDays: 1,
  // Owen's Square Appointments booking page (set up 17 Nov 2026). Shows his real free slots,
  // with 30 minutes' travel after each job; he approves each request. Empty = email requests only.
  bookingApp: "https://book.squareup.com/appointments/1rs73chx3amn4i/location/LNTAB4BDN55JV/services",
};

export const tel = `tel:${site.phoneIntl}`;
export const sms = (body: string) => `sms:${site.phoneIntl}?&body=${encodeURIComponent(body)}`;
