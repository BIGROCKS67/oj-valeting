// Names, times, "from" prices, Owen's one-line descriptions and every extra are copied from
// his old services page (ojvaleting.org/my-services, 16 Nov 2026). The "What's included"
// lists are drafts written from what other UK mobile detailers list for the same packages:
// Owen asked for this on the call, and each list shows a Draft tag until he signs it off.

export type Option = { name: string; label: string; choices: string[] };

export type Service = {
  slug: string;
  name: string;
  /** what the page is found by in search */
  searchName: string;
  from: number;
  time: string;
  /** start times offered on the booking page */
  starts: string[];
  owenSays: string;
  note?: string;
  includes: { group: string; items: string[] }[];
  includesConfirmed: boolean;
  extras: string[];
  option?: Option;
  photos: string[];
  goodFor: string;
};

const allDay = ["8am"];
const longJob = ["8am", "10am"];
const shortJob = ["8am", "10am", "midday", "2pm"];

export const services: Service[] = [
  {
    slug: "car-valeting",
    name: "Basic package",
    searchName: "Mobile car valet",
    from: 45,
    time: "1 to 2 hours",
    starts: shortJob,
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
      "Wax sealant",
      "Engine bay clean",
      "Headlight restoration",
      "Exhaust tip polishing",
      "Seat and carpet stain removal",
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
    starts: longJob,
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
      "Dog hair removal",
      "Mould removal",
      "Soft top treatment and protection",
      "Vinyl removal",
      "Clay bar",
      "Rubbish removal",
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
    starts: allDay,
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
      "Scratch removal (touch-up pen supplied)",
      "Interior and exterior plastics polished",
      "Exterior trims restored",
      "Stage 2 and 3 correction",
      "Clay bar",
    ],
    photos: ["porsche-911", "garage-gloss-bonnet", "ford-headlight", "porsche-taycan"],
    goodFor: "dark paint that shows every swirl, bush scratches, or paint that has gone flat.",
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic coating",
    searchName: "Ceramic coating",
    from: 220,
    time: "Ask Owen",
    starts: allDay,
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
      "Window and glass ceramic coating",
      "Alloy ceramic coating",
      "Interior leather, fabric and plastic protectant",
      "Clay bar",
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
    starts: shortJob,
    owenSays:
      "My maintenance plan is designed to keep your vehicle looking its best on a regular booked basis. Enjoying a little discount with a few added extras too.",
    note: "Every 1, 2, 4 or 6 weeks.",
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
    extras: [],
    option: { name: "frequency", label: "How often?", choices: ["Every week", "Every 2 weeks", "Every 4 weeks", "Every 6 weeks"] },
    photos: ["range-rover", "land-rover-defender-110", "bmw-5-series", "owen-polo-roof"],
    goodFor: "keeping a car at its best once it's had a deep clean. Steve F keeps both his household's cars on it.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const gbp = (n: number) => `£${n}`;
