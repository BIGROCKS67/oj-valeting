import dims from "./photo-dims.json";

// All photos are Owen's own, from his old site's portfolio (ojvaleting.org/portfolio).
// Captions name the vehicle only: the old site gave no towns or dates. CONFIRM list asks for them.

export const captions: Record<string, string> = {
  "oj-van-livery": "The OJ Valeting van",
  "oj-van-rear": "The OJ Valeting van",
  "owen-steam-cleaning-door": "Owen steam cleaning a door card",
  "owen-wheel-clean": "Owen cleaning the wheels on a VW Polo",
  "owen-polo-roof": "Owen drying the roof of a VW Polo",
  "owen-polo-sill": "Owen on the sills of a VW Polo",
  "owen-porsche-boxster-wash": "Owen washing a Porsche Boxster",
  "owen-porsche-boxster-polish": "Owen machine polishing a Porsche Boxster",
  "vw-golf-r-rear": "VW Golf R",
  "vw-golf-r": "VW Golf R",
  "mitsubishi-evo-vi": "Mitsubishi Lancer Evo VI",
  "porsche-cayenne": "Porsche Cayenne",
  "bmw-5-series": "BMW 5 Series",
  "porsche-911": "Porsche 911",
  "porsche-718-boxster": "Porsche 718 Boxster",
  "porsche-macan": "Porsche Macan",
  "bmw-m4-rear": "BMW M4",
  "bmw-m4": "BMW M4",
  "hyundai-ioniq-5-n": "Hyundai Ioniq 5 N",
  "range-rover": "Range Rover",
  "land-rover-defender-110": "Land Rover Defender 110",
  "opel-manta": "Opel Manta",
  "opel-manta-rear": "Opel Manta",
  "porsche-red-leather-interior": "Red leather, Porsche Macan",
  "engine-bay": "Engine bay, Range Rover",
  "gloss-roof": "Gloss black roof",
  "ford-headlight": "Headlight, Ford Focus",
  "touring-caravan": "Touring caravan",
  motorhome: "Motorhome",
  "scania-horsebox": "Scania horsebox",
  tesla: "Tesla",
  "mitsubishi-evo-trailer": "Mitsubishi Lancer Evo, on its trailer",
  "garage-gloss-bonnet": "Bonnet reflections, in the garage",
  "porsche-taycan": "Porsche Taycan",
  "range-rover-sport": "Range Rover Sport",
  "land-rover-defender-90": "Land Rover Defender 90",
  "mercedes-cle-cabriolet": "Mercedes CLE Cabriolet",
  "porsche-wheel": "Porsche wheel",
  "ford-interior": "Ford interior",
  "land-rover-interior": "Land Rover interior",
  "discovery-interior": "Land Rover Discovery interior",
  "boot-cleaned": "Seven-seater boot",
  "seat-headlight": "Headlight, SEAT",
  "range-rover-satin": "Range Rover, satin grey",
};

export type Photo = { id: string; w: number; h: number; alt: string };

export function photo(id: string): Photo {
  const d = (dims as Record<string, number[]>)[id];
  if (!d) throw new Error(`No photo ${id}`);
  return { id, w: d[0], h: d[1], alt: captions[id] ?? "" };
}

/** The driveway wall on the home page and /work/. Order: mixes car types and colours. */
export const wall = [
  "vw-golf-r-rear",
  "scania-horsebox",
  "porsche-911",
  "mitsubishi-evo-vi",
  "range-rover",
  "porsche-red-leather-interior",
  "bmw-m4",
  "opel-manta",
  "touring-caravan",
  "porsche-718-boxster",
  "land-rover-defender-110",
  "engine-bay",
  "hyundai-ioniq-5-n",
  "porsche-taycan",
  "motorhome",
  "land-rover-defender-90",
  "porsche-macan",
  "mitsubishi-evo-trailer",
  "range-rover-sport",
  "mercedes-cle-cabriolet",
  "tesla",
  "bmw-m4-rear",
  "garage-gloss-bonnet",
  "opel-manta-rear",
];
