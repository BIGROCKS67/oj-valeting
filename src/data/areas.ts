// Town pages (/areas/<slug>/). Same idea as the R4R and Peters Agri town pages: one page per town
// Owen really covers, with only facts we have from him. Drive times are rough, from his base
// near Finmere (MK18). Villages are real places on the way, not a claim that he has worked there.

export type Area = {
  slug: string;
  town: string;
  county: string;
  drive: string;
  villages: string[];
  intro: string;
};

export const areas: Area[] = [
  {
    slug: "brackley",
    town: "Brackley",
    county: "Northamptonshire",
    drive: "about 10 minutes",
    villages: ["Evenley", "Turweston", "Croughton", "Syresham", "Westbury"],
    intro:
      "Brackley is on Owen's doorstep, so it's one of the easiest places for him to fit a job in. He comes to your drive or workplace with the van and all the kit. All he needs is a tap and a plug socket.",
  },
  {
    slug: "buckingham",
    town: "Buckingham",
    county: "Buckinghamshire",
    drive: "about 10 minutes",
    villages: ["Maids Moreton", "Tingewick", "Gawcott", "Akeley", "Steeple Claydon"],
    intro:
      "Owen is based just outside Buckingham, so the town and the villages around it are home ground. Valets, deep cleans, polishing and ceramic coating, all done on your drive.",
  },
  {
    slug: "towcester",
    town: "Towcester",
    county: "Northamptonshire",
    drive: "about 25 minutes",
    villages: ["Silverstone", "Paulerspury", "Greens Norton", "Roade", "Blisworth"],
    intro:
      "Owen covers Towcester and the villages along the A5 and A43 regularly, including Silverstone, Paulerspury and Roade. He comes to you, so there's no dropping the car off.",
  },
  {
    slug: "bicester",
    town: "Bicester",
    county: "Oxfordshire",
    drive: "about 15 minutes",
    villages: ["Launton", "Ambrosden", "Bucknell", "Stratton Audley", "Chesterton"],
    intro:
      "Bicester is a short run down the A421 for Owen, so Oxfordshire jobs around the town are easy to book in. Everything is done at your home or work.",
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
