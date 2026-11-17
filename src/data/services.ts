// Names, times and Owen's one-line descriptions are from his old services page
// (ojvaleting.org/my-services, 16 Nov 2026). Prices by size and add-on prices are from the
// price list he sent on 17 Nov 2026. The "What's included"
// lists are drafts written from what other UK mobile detailers list for the same packages:
// Owen asked for this on the call, and each list shows a Draft tag until he signs it off.

export type Option = { name: string; label: string; choices: string[] };

/** One price table: a row per vehicle size. Prices are Owen's own (price list sent 17 Nov 2026). */
export type PriceTable = { label: string; note?: string; prices: [Size, string][] };
export type Size = "Small" | "Medium" | "Large" | "XL";

// CONFIRM with Owen: which cars count as which size. Shown with a Draft tag until he signs it off.
export const sizeGuide: [Size, string][] = [
  ["Small", "city cars and small hatchbacks, like a Polo or Fiesta"],
  ["Medium", "family hatchbacks and saloons, like a Golf or 3 Series"],
  ["Large", "estates and SUVs, like a Discovery Sport or 5 Series Touring"],
  ["XL", "7-seaters, big 4x4s, vans and motorhomes"],
];

// Add-ons, word for word from Owen's price list (17 Nov 2026). "+" means from.
export const addOns: Record<string, string> = {
  "Engine bay clean": "£25+",
  "Alloy ceramic coating, up to 2 years": "£80+",
  "Exhaust polish": "£25+",
  "Exhaust tips polished and restored": "£30+",
  "Clay bar with full decontamination wash": "£80",
  "Full decontamination wash": "£40+",
  "Mould removal": "£40+",
  "Soft top treatment": "£65+",
  "Full window ceramic coating, 1 year": "£50+",
  "Wax sealant or paste wax": "£20+",
  "Ceramic spray": "£25+",
  "Pet hair removal (depends how bad)": "£25+",
  "Headlight restoration, the pair": "£75+",
  "Vinyl removal": "£150+",
  "Interior plastics polished": "£40+",
  "Ozone treatment": "£20",
};
export const addOnPrice = (name: string) => addOns[name] ?? "Ask Owen";

export type Service = {
  slug: string;
  name: string;
  /** what the page is found by in search */
  searchName: string;
  from: number;
  time: string;
  /** hours to plan for on the booking page; start times are worked out from Owen's hours (hours.ts) */
  jobHours: number;
  owenSays: string;
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

// jobHours: top of Owen's own time range. Correction and coating are guesses (CONFIRM list).

export const services: Service[] = [
  {
    slug: "car-valeting",
    name: "Basic package",
    searchName: "Mobile car valet",
    from: 45,
    time: "1 to 2 hours",
    jobHours: 2,
    owenSays: "Bring your vehicle back to looking like new with the basic package.",
    note: "Subject to condition, and any type of vehicle welcome.",
    includes: [
      {
        group: "Outside",
        items: [
          "Snow foam pre-wash to lift the dirt before anything touches the paint",
          "Hand wash, two-bucket method",
          "Wheels, tyres and arches cleaned, tyres dressed",
          "Hand dried with microfibre towels",
          "Windows and mirrors cleaned",
        ],
      },
      {
        group: "Inside",
        items: [
          "Seats, carpets, mats and boot hoovered",
          "Dash, console and door cards wiped down",
          "Windows cleaned inside",
        ],
      },
    ],
    includesConfirmed: false,
    extras: [
      "Wax sealant or paste wax",
      "Ceramic spray",
      "Engine bay clean",
      "Pet hair removal (depends how bad)",
      "Headlight restoration, the pair",
      "Exhaust polish",
    ],
    prices: [
      { label: "Inside and out", prices: [["Small", "£45+"], ["Medium", "£55+"], ["Large", "£65+"], ["XL", "£75+"]] },
      { label: "Inside only", note: "Depends on condition", prices: [["Small", "£30+"], ["Medium", "£35+"], ["Large", "£40+"], ["XL", "£45+"]] },
      { label: "Outside only", prices: [["Small", "£25"], ["Medium", "£35"], ["Large", "£40"], ["XL", "£45+"]] },
    ],
    photos: ["owen-wheel-clean", "vw-golf-r", "porsche-cayenne", "boot-cleaned"],
    goodFor: "a car that's been looked after and needs a proper clean inside and out.",
  },
  {
    slug: "deep-clean",
    name: "Full deep clean",
    searchName: "Car deep clean",
    from: 150,
    time: "3 to 5 hours",
    jobHours: 5,
    owenSays: "Bring your vehicle back to looking brand new with the full deep clean package.",
    includes: [
      {
        group: "Inside",
        items: [
          "Everything taken out, then every surface hoovered, including under the seats and in the boot well",
          "Seats and carpets shampooed and extracted",
          "Plastics, vents and door shuts steam cleaned",
          "Leather cleaned and conditioned",
          "Interior glass cleaned",
        ],
      },
      {
        group: "Outside",
        items: [
          "Snow foam and two-bucket hand wash",
          "Wheel faces and barrels cleaned, arches degreased",
          "Iron fallout and tar removed from the paint",
          "Door shuts cleaned",
          "Sealant applied, tyres dressed, glass cleaned",
        ],
      },
    ],
    includesConfirmed: false,
    extras: [
      "Ozone treatment",
      "Pet hair removal (depends how bad)",
      "Mould removal",
      "Interior plastics polished",
      "Soft top treatment",
      "Clay bar with full decontamination wash",
      "Vinyl removal",
    ],
    prices: [
      { label: "Inside and out", prices: [["Small", "£150+"], ["Medium", "£165+"], ["Large", "£180+"], ["XL", "£200+"]] },
      { label: "Inside only", prices: [["Small", "£130+"], ["Medium", "£140+"], ["Large", "£150+"], ["XL", "£155+"]] },
      { label: "Outside only", prices: [["Small", "£35"], ["Medium", "£40"], ["Large", "£45"], ["XL", "£50"]] },
    ],
    photos: ["owen-steam-cleaning-door", "porsche-red-leather-interior", "land-rover-interior", "ford-interior"],
    goodFor: "a car that's about to be sold, a family or dog car, or one that hasn't had a proper clean in a long time.",
  },
  {
    slug: "paint-correction",
    name: "Full paint correction",
    searchName: "Paint correction",
    from: 170,
    time: "Most of a day",
    jobHours: 6,
    owenSays:
      "My paint correction package is the ideal solution for vehicles with paint defects, swirl marks, and minor imperfections.",
    includes: [
      {
        group: "Preparation",
        items: [
          "Snow foam and two-bucket hand wash",
          "Iron fallout and tar removed, then a clay bar to leave the paint smooth",
          "Trim and rubbers masked off",
        ],
      },
      {
        group: "Correction",
        items: [
          "Machine polished to take out swirl marks, light scratches and dullness",
          "Checked panel by panel under light",
          "Protected with sealant afterwards",
        ],
      },
    ],
    includesConfirmed: false,
    extras: [
      "Headlight restoration, the pair",
      "Exhaust tips polished and restored",
      "Interior plastics polished",
      "Scratch removal (touch-up pen supplied)",
      "Stage 2 and 3 correction",
    ],
    prices: [
      {
        label: "Paint correction",
        note: "Add a clay bar for £50",
        prices: [["Small", "£170"], ["Medium", "£190"], ["Large", "£210"], ["XL", "£230"]],
      },
    ],
    photos: ["porsche-911", "garage-gloss-bonnet", "ford-headlight", "porsche-taycan"],
    goodFor: "dark paint that shows every swirl, bush scratches, or paint that has gone flat.",
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic coating",
    searchName: "Ceramic coating",
    from: 270,
    time: "Ask Owen",
    jobHours: 6,
    owenSays: "This gives your vehicle the ultimate long-lasting protection with the ceramic coating option.",
    note: "3, 5 and 7 year options available.",
    includes: [
      {
        group: "Preparation",
        items: [
          "Full wash and decontamination",
          "Clay bar and a machine polish so the coating goes on to clean, corrected paint",
          "Panel wipe to take off any oils before coating",
        ],
      },
      {
        group: "Coating",
        items: [
          "Ceramic coating applied panel by panel",
          "Left to cure, then checked over before handover",
          "Aftercare advice on washing the coated car",
        ],
      },
    ],
    includesConfirmed: false,
    extras: [
      "Full window ceramic coating, 1 year",
      "Alloy ceramic coating, up to 2 years",
      "Interior plastics polished",
    ],
    // CONFIRM: Owen's list says XL £350, less than Large £380. Shown as "Ask Owen" until he confirms.
    prices: [
      {
        label: "5 year coating",
        note: "3 year is £30 less, 7 year is £80 more",
        prices: [["Small", "£300"], ["Medium", "£340"], ["Large", "£380"], ["XL", "Ask Owen"]],
      },
    ],
    option: { name: "coating_years", label: "How long should it last?", choices: ["3 years", "5 years", "7 years", "Not sure yet"] },
    photos: ["bmw-m4", "hyundai-ioniq-5-n", "gloss-roof", "range-rover-sport"],
    goodFor: "a new or freshly corrected car you want to keep looking that way, and easier to wash.",
  },
  {
    slug: "maintenance-valet",
    name: "Maintenance package",
    searchName: "Maintenance valet plan",
    from: 40,
    time: "1 to 2 hours",
    jobHours: 2,
    owenSays:
      "My maintenance plan is designed to keep your vehicle looking its best on a regular booked basis. Enjoying a little discount with a few added extras too.",
    note: "Every 2, 4 or 6 weeks.",
    includes: [
      {
        group: "Each visit",
        items: [
          "Snow foam and hand wash, wheels and tyres cleaned",
          "Hand dried, glass cleaned",
          "Interior hoovered and wiped down",
          "Same day and time each visit where possible",
        ],
      },
    ],
    includesConfirmed: false,
    extras: ["Wax sealant or paste wax", "Ceramic spray", "Pet hair removal (depends how bad)"],
    prices: [{ label: "Each visit", prices: [["Small", "£40"], ["Medium", "£50"], ["Large", "£60"], ["XL", "£70"]] }],
    option: { name: "frequency", label: "How often?", choices: ["Every 2 weeks", "Every 4 weeks", "Every 6 weeks"] },
    photos: ["range-rover", "land-rover-defender-110", "bmw-5-series", "owen-polo-roof"],
    goodFor: "keeping a car at its best once it's had a deep clean. Steve F keeps both his household's cars on it.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const gbp = (n: number) => `£${n}`;
