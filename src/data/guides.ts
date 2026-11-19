// Guides (/guides/<slug>/): plain answers to the questions people type into Google and ask
// ChatGPT, written from Owen's own prices and notes. Same idea as R4R's blog and Peters Agri's
// guides. Every price comes from services.ts. CONFIRM: Owen to read these over.

export type GuideSection = { q: string; a: string[] };

export type Guide = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  updated: string;
  intro: string;
  sections: GuideSection[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "mobile-car-valet-prices",
    title: "Mobile car valet prices, Brackley | OJ Valeting",
    h1: "How much does a mobile car valet cost?",
    description:
      "Owen's 2026 prices for a mobile car valet, deep clean, paint correction and ceramic coating, by car size, around Brackley, Buckingham and Towcester.",
    updated: "November 2026",
    intro:
      "Here's what a mobile valet costs with OJ Valeting, by car size. Owen comes to your home or work, so the price includes him bringing the van and kit to you. All he needs is a tap and a plug socket.",
    sections: [
      {
        q: "How much is a basic mobile valet?",
        a: [
          "A basic valet inside and out starts at £45 for a small car, £55 for a medium, £65 for a large and £75 for an XL (7-seater or van). It takes 1 to 2 hours.",
          "Inside only starts at £30, and outside only starts at £30.",
        ],
      },
      {
        q: "How much is a full deep clean?",
        a: [
          "A full deep clean inside and out is £150 for a small car, £165 medium, £180 large and £200 XL. That's everything out, shampooed, steamed and decontaminated, and it takes 3 to 5 hours.",
          "Inside only starts at £130, outside only at £35.",
        ],
      },
      {
        q: "How much is paint correction?",
        a: [
          "Paint correction with a clay bar included is £210 for a small car, £260 medium, £310 large and £360 XL. It's a machine polish to take out swirls, light scratches and dullness.",
        ],
      },
      {
        q: "How much is ceramic coating?",
        a: [
          "A 5 year ceramic coating is £330 for a small car, £380 medium, £430 large and £480 XL. A 3 year coating is £30 less and a 7 year coating is £80 more.",
        ],
      },
      {
        q: "Is there a cheaper regular option?",
        a: [
          "Yes. The maintenance plan is a booked-in wash and tidy every 2, 4 or 6 weeks: £40 a visit for a small car, £50 medium, £60 large and £70 XL.",
        ],
      },
      {
        q: "What size is my car?",
        a: [
          "Roughly: small is a Polo or Fiesta, medium a Golf or 3 Series, large an estate or SUV, and XL a 7-seater, big 4x4 or van. If you're not sure, pick the nearest and Owen will tell you before he starts.",
        ],
      },
      {
        q: "Is there anything extra to pay?",
        a: [
          "Owen confirms the final price once he's seen the size and state of the vehicle, before he starts, so there are no surprises at the end. Fuel charges may apply further afield.",
          "Extras like ozone treatment (from £20), pet hair removal (from £25) or headlight restoration (from £75 a pair) can be added to any clean.",
        ],
      },
      {
        q: "How do I pay?",
        a: ["Apple Pay, bank transfer or cash on the day."],
      },
    ],
    related: ["car-valeting", "deep-clean", "maintenance-valet"],
  },
  {
    slug: "paint-correction-before-ceramic-coating",
    title: "Paint correction before ceramic coating? | OJ Valeting",
    h1: "Do I need paint correction before a ceramic coating?",
    description:
      "Why swirled or dull paint may need a paint correction before a ceramic coating, what each costs with OJ Valeting, and the discount when you book both.",
    updated: "November 2026",
    intro:
      "A ceramic coating protects the paint as it is on the day it goes on. If the paint is swirled or dull, Owen may suggest correcting it first.",
    sections: [
      {
        q: "Why correct the paint first?",
        a: [
          "A coating is clear. It locks in a glossy finish and makes the car far easier to wash, but it doesn't hide swirl marks or light scratches. Whatever is in the paint underneath stays visible through the coating.",
          "A paint correction is a machine polish that takes out swirls, light scratches and dullness, so the coating goes on to paint that looks its best.",
        ],
      },
      {
        q: "Does every car need it?",
        a: [
          "No. A new car, or one with paint in good shape, can often be coated after a thorough wash and decontamination. Owen looks at the paint and tells you which it needs before he starts.",
        ],
      },
      {
        q: "Is it cheaper to book both?",
        a: [
          "Yes. If the car needs a paint correction before the coating, the correction comes at a discounted price when you book the two together. Owen will tell you the price when he sees the car.",
        ],
      },
      {
        q: "What do they cost on their own?",
        a: [
          "Paint correction, clay bar included: £210 small, £260 medium, £310 large, £360 XL.",
          "Ceramic coating, 5 year: £330 small, £380 medium, £430 large, £480 XL. 3 year is £30 less, 7 year is £80 more.",
        ],
      },
      {
        q: "Can other parts be coated too?",
        a: [
          "Yes: full window ceramic coating for 12 to 24 months from £60, alloy ceramic coating for 1 or 2 years from £60, and interior leather ceramic coating from £120.",
        ],
      },
    ],
    related: ["paint-correction", "ceramic-coating"],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
