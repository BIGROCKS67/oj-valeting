// Owen, WhatsApp 18 Nov 17:01: paint correction £210 / £260 / £310 / £360.
// Owen, WhatsApp 18 Nov 16:52: deep interior XL £160+, basic interior XL £50+ (inside-only rows match).
// Owen, WhatsApp 18 Nov 22:09-22:15: new car protection from £480+ (no size table), basic interior XL £45+, basic exterior small £30.
// Names, times and Owen's one-line descriptions are from his old services page
// (ojvaleting.org/my-services, 16 Nov 2026). Prices by size and add-on prices are from the
// price list he sent on 17 Nov 2026. The "What's included"
// lists are drafts written from what other UK mobile detailers list for the same packages:
// Owen asked for this on the call, and each list shows a Draft tag until he signs it off.

export type Option = { name: string; label: string; choices: string[] };

/** One price table: a row per vehicle size. Prices are Owen's own (price list sent 17 Nov 2026). */
export type PriceTable = { label: string; note?: string; prices: [Size | "Starting from", string][] };
export type Size = "Small" | "Medium" | "Large" | "XL";

// CONFIRM with Owen: which cars count as which size. Shown with a Draft tag until he signs it off.
export const sizeGuide: [Size, string][] = [
  ["Small", "city cars and small hatchbacks, like a Polo or Fiesta"],
  ["Medium", "family hatchbacks and saloons, like a Golf or 3 Series"],
  ["Large", "estates and bigger SUVs, like a Range Rover, Mercedes GLC or 5 Series Touring"],
  ["XL", "7-seaters, big 4x4s, vans and motorhomes"],
];

// Add-ons, word for word from Owen's price list (17 Nov 2026). "+" means from.
export const addOns: Record<string, string> = {
  "Engine bay clean": "£25+",
  "Alloy ceramic coating, 1 or 2 years": "£60+",
  "Exhaust polish": "£30+", // Owen, 21 Nov: one exhaust add-on, £30+ (tips polished and restored merged in)
  "Clay bar with full decontamination wash": "£60+", // Owen, 21 Nov 12:41 (was £50+)
  "Full decontamination wash": "£25+", // Owen, 21 Nov 12:39 (was £40+)
  "Clay bar": "£50+", // Owen, 21 Nov 12:38: on its own, for the full deep clean (decon wash already included)
  "Mould removal": "£40+",
  "Soft top treatment": "£65+",
  "Full window ceramic coating, 12 to 24 months": "£60+",
  "Wax sealant or paste wax": "£20+",
  "Ceramic spray": "£25+",
  "Pet hair removal (depends how bad)": "£25+",
  "Headlight restoration, the pair": "£75+",
  "Vinyl removal": "£150+",
  "Interior plastics polished": "£40+",
  "Interior leather ceramic coating": "£120+",
  "Ozone treatment": "£20+",
  // Owen, call 18 Nov 2026; renamed and seat stains added by Owen, WhatsApp 20 Nov 18:20.
  "Plastic trim restoration": "£30+",
  "Seat stain removal": "£20+",
  "Vehicle cleared (rubbish and personal belongings)": "£10+", // Owen, WhatsApp 22 Nov 20:50
};
export const addOnPrice = (name: string) => addOns[name] ?? "Ask Owen";

export type Category = "Full valets" | "Interior" | "Exterior" | "Paint correction" | "Protection" | "Plans";

export type Service = {
  slug: string;
  name: string;
  category: Category;
  /** one plain line for the menu card */
  blurb: string;
  /** Square Appointments item id, so Book opens this service directly */
  squareId?: string;
  /** A highlighted line shown with the prices, e.g. a related service Owen recommends */
  tip?: string;
  /** Short version of the tip for the price menu card */
  cardTip?: string;
  /** what the page is found by in search */
  searchName: string;
  from: number;
  time: string;
  /** hours to plan for on the booking page; start times are worked out from Owen's hours (hours.ts) */
  jobHours: number;
  /** Owen's own words from his old site; only on services he described himself */
  owenSays?: string;
  note?: string;
  includes: { group: string; items: string[] }[];
  includesConfirmed: boolean;
  /** names from addOns; anything else shows "Ask Owen" */
  extras: string[];
  prices: PriceTable[];
  option?: Option;
  photos: string[];
  goodFor: string;
};

// jobHours: top of Owen's own time range (Owen's job times, 17 Nov 2026). Basic interior/exterior 45 min to 1 hour,
// deep interior 2h, deep exterior 1 to 2 hours (Owen, WhatsApp 17-18 Nov 2026).

export const services: Service[] = [
  {
    slug: "car-valeting",
    name: "Basic Package", // Owen, 21 Nov: capitals on service titles
    category: "Full valets",
    blurb: "A complete inside and out clean, bringing back that fresh, well-maintained look to your vehicle.", // Owen, WhatsApp 22 Nov
    squareId: "Y335SIFHZPY26WGD4L74DGV7",
    searchName: "Mobile car valet",
    from: 45,
    time: "1 to 2 hours",
    jobHours: 2,
    note: "Price may vary subject to condition of vehicle.", // Owen, WhatsApp 22 Nov 22:09
    includes: [{group: "Interior", items: ["Full thorough hoover", "Wipe down of all surfaces and plastics", "All glass cleaned", "Fragrance sprayed"]}, {group: "Exterior", items: ["Pre wash applied", "Alloys and tyres cleaned", "Vehicle snow foamed", "Safe 2 bucket method hand wash", "Car fully dried", "Tyres dressed", "All glass cleaned"]}], // Owen, WhatsApp 23 Nov 11:11 + voice note 11:12
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:47-10:52
      "Wax sealant or paste wax",
      "Ceramic spray",
      "Engine bay clean",
      "Pet hair removal (depends how bad)",
      "Seat stain removal",
    ],
    prices: [
      { label: "Inside and out", prices: [["Small", "£45+"], ["Medium", "£55+"], ["Large", "£65+"], ["XL", "£75+"]] },
      { label: "Inside only", note: "Depends on condition", prices: [["Small", "£30+"], ["Medium", "£35+"], ["Large", "£40+"], ["XL", "£45+"]] },
      { label: "Outside only", prices: [["Small", "£30"], ["Medium", "£35"], ["Large", "£40"], ["XL", "£45+"]] },
    ],
    photos: ["bmw-m4-wash", "owen-porsche-boxster-wash", "vw-golf-r", "porsche-cayenne"],
    goodFor: "a car that's been looked after and needs a proper clean inside and out.",
  },
  {
    slug: "deep-clean",
    name: "Full Deep Clean",
    category: "Full valets",
    blurb: "A thorough top-to-bottom deep clean, with carpets and upholstery shampooed, surfaces steam cleaned and the vehicle fully decontaminated inside and out. Bringing your vehicle back to its best condition.", // Owen, WhatsApp 22 Nov
    squareId: "7QPFGXPL75UJLWTY7WEMRYJR",
    searchName: "Car deep clean",
    from: 150,
    time: "3 to 5 hours",
    note: "Price may vary subject to condition of vehicle.", // Owen, WhatsApp 22 Nov 22:09
    jobHours: 5,
    includes: [{group: "Interior", items: ["Full thorough hoover", "All carpets and carpet areas shampooed, steamed and spot vac'd", "All plastics steamed and then protected", "Leather or fabric seats shampooed and steam spot vac'd", "All glass steamed and cleaned", "Fragrance sprayed"]}, {group: "Exterior", items: ["Full pre wash", "Alloys, tyres and wheel arches deep cleaned", "Tar and iron removed and decontaminated", "Vehicle snow foamed and detail brushed", "Safe 2 bucket hand wash", "Wax sealant applied", "Vehicle dried", "Tyres dressed", "All glass cleaned"]}], // Owen, WhatsApp 23 Nov 11:11 + voice note 11:12
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:47-10:52
      "Ozone treatment",
      "Pet hair removal (depends how bad)",
      "Mould removal",
      "Soft top treatment",
      "Clay bar",
    ],
    prices: [
      { label: "Inside and out", prices: [["Small", "£150+"], ["Medium", "£165+"], ["Large", "£180+"], ["XL", "£200+"]] },
      { label: "Inside only", prices: [["Small", "£130+"], ["Medium", "£140+"], ["Large", "£150+"], ["XL", "£160+"]] },
      { label: "Outside only", prices: [["Small", "£40"], ["Medium", "£45"], ["Large", "£50"], ["XL", "£55"]] },
    ],
    photos: ["owen-steam-cleaning-door", "porsche-red-leather-interior", "land-rover-interior", "ford-interior"],
    goodFor: "a car that's about to be sold, a family or dog car, or one that hasn't had a proper clean in a long time.",
  },
  {
    slug: "paint-correction",
    name: "Stage 1 Paint Correction",
    category: "Paint correction",
    blurb: "Includes a full deep exterior wash and paintwork prepped ready for the stage 1 paint correction to be carried out. This stage 1 paint correction removes 75% to 90% of light swirls, scratches and defects on the paintwork. (Clay bar may also be needed.)", // Owen, WhatsApp 22 Nov
    squareId: "OUN7JPWB65ZLOR6BKFUDUTO2",
    searchName: "Paint correction",
    from: 210,
    time: "3 to 5 hours",
    jobHours: 5,
    includes: [], // Owen, voice note 22 Nov: old lists removed, he is sending new ones
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:54-10:55
      "Headlight restoration, the pair",
      "Exhaust polish",
      "Scratch removal (touch-up pen supplied)",
      "Wax sealant or paste wax",
    ],
    prices: [
      {
        label: "Paint correction",
        note: "Clay bar included",
        prices: [["Small", "£210"], ["Medium", "£260"], ["Large", "£310"], ["XL", "£360"]],
      },
    ],
    photos: ["owen-porsche-boxster-polish", "porsche-911", "garage-gloss-bonnet", "ford-headlight"],
    goodFor: "dark paint that shows every swirl, bush scratches, or paint that has gone flat.",
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic Coating",
    category: "Protection",
    blurb: "If you're looking for the ultimate protection then ceramic coating is the one. Includes a deep exterior clean and full decontamination of paintwork before applying either a 3, 5 or 7 year ceramic coating. It's important to prep the paintwork, alloys and glass professionally before to ensure optimal bond. (May also need a paint correction at a discounted price.)", // Owen, WhatsApp 22 Nov
    squareId: "YOJHVAR5GVHFBCLZETWATB6Z",
    searchName: "Ceramic coating",
    from: 300,
    time: "3 to 5 hours",
    jobHours: 5,
    note: "3, 5 and 7 year options available.",
    includes: [], // Owen, voice note 22 Nov: old lists removed, he is sending new ones
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:54-10:55
      "Full window ceramic coating, 12 to 24 months",
      "Alloy ceramic coating, 1 or 2 years",
      "Interior leather ceramic coating",
      "Plastic trim restoration",
      "Soft top treatment",
      "Exhaust polish",
    ],
    // Owen, 17 Nov 2026: paint may need correcting first, at a discounted price.
    cardTip: "Need a paint correction first? It comes at a discounted price with a coating.",
    tip: "Paint swirled or dull? It may need a paint correction first so the coating goes on to perfect paint. Book the two together and the correction comes at a discounted price. Owen will tell you when he sees the car.",
    // Owen, WhatsApp 18 Nov 17:07: 5 year £330 / £380 / £430 / £480. 3 and 7 year offsets unchanged.
    prices: [
      {
        label: "5 year coating",
        note: "3 year is £30 less, 7 year is £80 more",
        prices: [["Small", "£330"], ["Medium", "£380"], ["Large", "£430"], ["XL", "£480"]],
      },
    ],
    option: { name: "coating_years", label: "How long should it last?", choices: ["3 years", "5 years", "7 years", "Not sure yet"] },
    photos: ["owen-wheel-clean", "owen-polo-sill", "bmw-m4", "hyundai-ioniq-5-n"],
    goodFor: "a new or freshly corrected car you want to keep looking that way, and easier to wash.",
  },
  {
    slug: "maintenance-valet",
    name: "Maintenance Package",
    category: "Plans",
    blurb: "A priority booked maintenance interior and exterior clean every 2, 4 or 6 weeks. This package keeps your vehicle looking like new all year round and comes at a discounted price and a couple of added extras. Please see details for what's included.", // Owen, WhatsApp 22 Nov
    squareId: "BGCFUBL4UQKHY4JFNSSAHAOM",
    searchName: "Maintenance valet plan",
    from: 40,
    time: "1 to 2 hours",
    jobHours: 2,
    note: "Every 2, 4 or 6 weeks.",
    includes: [], // Owen, voice note 22 Nov: old lists removed, he is sending new ones
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:57-11:01
      "Wax sealant or paste wax",
      "Ceramic spray",
      "Pet hair removal (depends how bad)",
      "Seat stain removal",
    ],
    prices: [{ label: "Each visit", prices: [["Small", "£40+"], ["Medium", "£50+"], ["Large", "£60+"], ["XL", "£70+"]] }], // Owen, 19 Nov: "+" on all, quoted on how dirty the car is
    option: { name: "frequency", label: "How often?", choices: ["Every 2 weeks", "Every 4 weeks", "Every 6 weeks"] },
    photos: ["defender-snow-foam", "range-rover", "land-rover-defender-110", "bmw-5-series"],
    goodFor: "keeping a car at its best once it's had a deep clean. Steve F keeps both his household's cars on it.",
  },
  // Owen, voice note 19 Nov 14:55: second plan for nicer cars, every 2 or 4 weeks, with extras such as small scratches
  // sorted. Prices and the exact extras to come from Owen.
  {
    slug: "ultimate-maintenance",
    name: "Ultimate Maintenance Package",
    category: "Plans",
    squareId: "YFKWA2HQR7PXYTRORVYUYIYK",
    blurb: "Designed for anyone who wants to keep their vehicle looking its absolute best all year round. Including everything from the standard Maintenance Package, with a scheduled visit every 2 or 4 weeks, alongside additional specialist treatments and premium extras added to each visit.", // Owen, WhatsApp 22 Nov
    searchName: "Ultimate maintenance valet plan",
    from: 80, // Owen, 19 Nov 16:35
    time: "1.5 to 3 hours",
    jobHours: 3,
    note: "Every 2 or 4 weeks.",
    includes: [], // Owen, voice note 22 Nov: old lists removed, he is sending new ones
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:57-11:01
      "Ceramic spray",
      "Clay bar with full decontamination wash",
      "Engine bay clean",
      "Pet hair removal (depends how bad)",
      "Interior plastics polished",
      "Ozone treatment",
    ],
    prices: [{ label: "Each visit", prices: [["Small", "£80"], ["Medium", "£110"], ["Large", "£140"], ["XL", "£170"]] }],
    option: { name: "frequency", label: "How often?", choices: ["Every 2 weeks", "Every 4 weeks"] },
    photos: ["porsche-taycan-black", "porsche-macan-white", "range-rover", "bmw-5-series"],
    goodFor: "a car you care about that you want kept at its very best, with the little extras taken care of too.",
  },
  {
    slug: "interior-valet",
    name: "Basic Interior Clean",
    squareId: "QHVHCQN4AXLK6WH4HEILDT4Z",
    category: "Interior",
    blurb: "A thorough interior clean, including vacuuming, wiping down all surfaces and cleaning interior windows and glass. Exterior cleaning is not included.", // Owen, WhatsApp 22 Nov
    searchName: "Mobile car interior valet",
    from: 30,
    time: "45 minutes to 1 hour",
    jobHours: 1,
    note: "Price may vary subject to condition of vehicle.", // Owen, WhatsApp 22 Nov 22:09
    includes: [{group: "Interior", items: ["Full thorough hoover", "Wipe down of all surfaces and plastics", "All glass cleaned", "Fragrance sprayed"]}], // Owen, WhatsApp 23 Nov 11:11 + voice note 11:12
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:47-10:52
      "Pet hair removal (depends how bad)",
      "Seat stain removal",
      "Ozone treatment",
      "Interior leather ceramic coating",
    ],
    prices: [
      { label: "Inside only", note: "Depends on condition", prices: [["Small", "£30+"], ["Medium", "£35+"], ["Large", "£40+"], ["XL", "£45+"]] },
    ],
    photos: ["discovery-interior", "ford-interior", "boot-cleaned", "land-rover-interior"],
    goodFor: "a car that looks fine outside but needs the inside sorting: school runs, work vans, dog hair.",
  },
  {
    slug: "exterior-valet",
    name: "Basic Exterior Clean",
    squareId: "NZHA643IUQHGJDWAL24V2XWG",
    category: "Exterior",
    blurb: "A thorough exterior clean, including a pre wash to lift and loosen dirt, a safe hand wash, wheel cleaning and exterior glass cleaning. Interior cleaning is not included.", // Owen, WhatsApp 22 Nov
    searchName: "Mobile car wash and exterior valet",
    from: 30,
    time: "45 minutes to 1 hour",
    jobHours: 1,
    includes: [{group: "Exterior", items: ["Pre wash applied", "Alloys and tyres cleaned", "Vehicle snow foamed", "Safe 2 bucket method hand wash", "Car fully dried", "Tyres dressed", "All glass cleaned"]}], // Owen, WhatsApp 23 Nov 11:11 + voice note 11:12
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:47-10:52
      "Wax sealant or paste wax",
      "Ceramic spray",
      "Exhaust polish",
      "Engine bay clean",
      "Plastic trim restoration",
      "Clay bar with full decontamination wash",
    ],
    prices: [{ label: "Outside only", prices: [["Small", "£30"], ["Medium", "£35"], ["Large", "£40"], ["XL", "£45+"]] }],
    photos: ["vw-golf-r", "range-rover-satin", "owen-polo-roof", "gloss-roof"],
    goodFor: "a quick, safe wash between valets, or before a trip or a sale.",
  },
  {
    slug: "deep-interior",
    name: "Deep Interior Clean",
    squareId: "JIGGKAI27UU5FOWNBFT7M2CO",
    category: "Interior",
    blurb: "A comprehensive interior deep clean, including the removal of all loose items, thorough shampooing and extraction of seats and carpets and steam cleaning of interior plastics and surfaces. Brought back to a brand new condition.", // Owen, WhatsApp 22 Nov
    searchName: "Car interior deep clean",
    from: 130,
    time: "About 2 hours",
    note: "Price may vary subject to condition of vehicle.", // Owen, WhatsApp 22 Nov 22:09
    jobHours: 2,
    includes: [{group: "Interior", items: ["Full thorough hoover", "All carpets and carpet areas shampooed, steamed and spot vac'd", "All plastics steamed and then protected", "Leather or fabric seats shampooed and steam spot vac'd", "All glass steamed and cleaned", "Fragrance sprayed"]}], // Owen, WhatsApp 23 Nov 11:11 + voice note 11:12
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:47-10:52
      "Ozone treatment",
      "Pet hair removal (depends how bad)",
      "Mould removal",
      "Interior plastics polished",
      "Interior leather ceramic coating",
    ],
    prices: [{ label: "Inside only", prices: [["Small", "£130+"], ["Medium", "£140+"], ["Large", "£150+"], ["XL", "£160+"]] }],
    photos: ["owen-steam-cleaning-door", "porsche-red-leather-interior", "land-rover-interior", "discovery-interior"],
    goodFor: "family and dog cars, smells, spills, mould, or a car you've just bought second hand.",
  },
  {
    slug: "deep-exterior",
    name: "Deep Exterior Clean",
    squareId: "36UI4EG27IT4KO6FDC7V623W",
    category: "Exterior",
    blurb: "Ultimate deep exterior clean including a full pre wash to lift and loosen dirt, detail brush all door shuts, boot shut and badges etc so not a spot is missed. Alloys, wheel arches and tyres detail brushed and brought back to a brand new condition. Then a safe 2 bucket hand wash is carried out. Tar, iron and glue removal so paintwork is fully decontaminated. Then vehicle has a wax sealant applied to give extra gloss and protection. Vehicle is then finally dried using an air blow machine and professional drying towels. Tyres then finally dressed.", // Owen, WhatsApp 22 Nov
    searchName: "Car exterior deep clean",
    from: 40,
    time: "1 to 2 hours",
    jobHours: 2,
    includes: [{group: "Exterior", items: ["Full pre wash", "Alloys, tyres and wheel arches deep cleaned", "Tar and iron removed and decontaminated", "Vehicle snow foamed and detail brushed", "Safe 2 bucket hand wash", "Wax sealant applied", "Vehicle dried", "Tyres dressed", "All glass cleaned"]}], // Owen, WhatsApp 23 Nov 11:11 + voice note 11:12
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:47-10:52
      "Clay bar with full decontamination wash",
      "Headlight restoration, the pair",
      "Exhaust polish",
      "Ceramic spray",
    ],
    prices: [{ label: "Outside only", prices: [["Small", "£40"], ["Medium", "£45"], ["Large", "£50"], ["XL", "£55"]] }],
    photos: ["range-rover-satin", "porsche-wheel", "vw-golf-r-rear", "bmw-m4-rear"],
    goodFor: "paint that feels rough or looks dull, or a car getting ready for polishing or a coating.",
  },

  // Owen, voice note 18 Nov 20:02: stage 2 alongside stage 1 (no stage 3). Prices and times to come
  // from Owen; until then every size says Ask Owen. "What's included" is a draft for him to confirm.
  {
    slug: "stage-2-paint-correction",
    name: "Stage 2 Paint Correction",
    category: "Paint correction",
    squareId: "UD2OY4XRMDYG7EOUOSIC2YPS",
    blurb: "Stage 1 paint correction can achieve great results and improve the paintwork to a whole new level. But if you're looking for absolute perfect paintwork then the stage 2 is where it cuts the paintwork back deeper than the top layer to reveal the absolute perfect finish. (Clay bar may also be needed.)", // Owen, WhatsApp 22 Nov
    searchName: "Stage 2 paint correction",
    from: 300, // Owen, WhatsApp 19 Nov 16:32 (edited to £300-£450, 16:36 "changed prices last second")
    time: "4 to 7 hours",
    jobHours: 7,
    includes: [], // Owen, voice note 22 Nov: old lists removed, he is sending new ones
    includesConfirmed: false,
    extras: [ // Owen, voice notes 21 Nov 10:54-10:55
      "Headlight restoration, the pair",
      "Exhaust polish",
      "Scratch removal (touch-up pen supplied)",
      "Wax sealant or paste wax",
    ],
    prices: [{ label: "Stage 2 paint correction", note: "Clay bar and 1 year ceramic included", prices: [["Small", "£300"], ["Medium", "£350"], ["Large", "£400"], ["XL", "£450"]] }],
    photos: ["owen-porsche-boxster-polish", "garage-gloss-bonnet", "porsche-911", "ford-headlight"],
    goodFor: "paint with heavier swirls and scratches that a single polish won't fully take out.",
  },
  // Owen, voice note 18 Nov 20:01: a new car protection detail, a single stage paint correction plus
  // a 5 year ceramic coating (Owen, 19 Nov: was 3 year). Prices and times to come from Owen.
  {
    slug: "new-car-protection",
    name: "New Car Protection Package",
    category: "Protection",
    blurb: "This is the ultimate package for your newly purchased vehicle. This includes a full deep interior clean with leather or fabric protectant applied, a full deep exterior clean, a light stage 1 machine polish and then a 5 year ceramic coating.", // Owen, WhatsApp 22 Nov
    searchName: "New car protection detail",
    from: 430, // Owen, 19 Nov 16:28 (was 480)
    time: "A whole day", // Owen, 19 Nov 16:38
    jobHours: 8,
    includes: [], // Owen, voice note 22 Nov: old lists removed, he is sending new ones
    includesConfirmed: false,
    extras: ["Full window ceramic coating, 12 to 24 months", "Alloy ceramic coating, 1 or 2 years", "Interior leather ceramic coating"],
    prices: [{ label: "New car protection detail", prices: [["Starting from", "£430+"]] }],
    photos: ["defender-110-green", "owen-polo-sill", "owen-wheel-clean", "porsche-taycan-black"], // Owen, 19 Nov: Defender as the main photo
    goodFor: "a new or nearly new car you want protected from day one.",
  },
];

/** Menu order on the home page, and which add-ons sit in the Protection tab */
export const categories: Category[] = ["Full valets", "Interior", "Exterior", "Paint correction", "Protection", "Plans"];
export const protectionAddOns = ["Full window ceramic coating, 12 to 24 months", "Alloy ceramic coating, 1 or 2 years", "Interior leather ceramic coating", "Ceramic spray"];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const gbp = (n: number) => `£${n}`;
/** "from £X", or "Ask Owen" while Owen hasn't priced a service yet (from: 0) */
export const fromText = (n: number) => (n > 0 ? `from £${n}` : "Ask Owen");

// Keep every list (nav, footer, /book/, "Other services") in menu order: valets first, plans last.
services.sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category));

/** Owen, voice note 19 Nov: Services in the menu split into three groups, like Elite Kleanz. Each has its own page at /services/<slug>/ */
export const serviceGroups: { slug: string; name: string; cats: Category[]; intro: string }[] = [
  {
    slug: "valeting",
    name: "Valeting Services",
    cats: ["Full valets", "Interior", "Exterior", "Plans"],
    intro:
      "Regular cleans and full deep cleans, inside, outside or both. Done by hand at your home or work.",
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic Coating Services",
    cats: ["Protection"],
    intro:
      "Long lasting ceramic protection for paint, wheels and glass. It keeps the car glossy and makes every wash after it quicker and easier.",
  },
  {
    slug: "correction",
    name: "Correction Services",
    cats: ["Paint correction"],
    intro:
      "Machine polishing to take out swirls, light scratches and dull, tired paint, bringing back the depth and gloss the car had when it was new.",
  },
];
