// Word for word from ojvaleting.org/reviews and the home page (16 Nov 2026), names and months
// as Owen published them. Only light fixes: stray spaces and the emoji removed.
// CONFIRM: link to Google reviews once the Business Profile is live (site.googleReviews).

export type Review = { text: string; name: string; when: string; service?: string };

export const reviews: Review[] = [
  {
    text: "Owen came to valet our caravan before sale. It was green after spending a couple of winters outside. It looked as good as new after Owen was finished with it!",
    name: "Katy J",
    when: "June 2026",
    service: "Caravan",
  },
  {
    text: "I got a scratch and a few bush marks polished out by OJvaleting and I wouldn't ever notice they were there! Looks brand new again, thank you Owen. Highly recommend.",
    name: "Helen B",
    when: "June 2026",
    service: "paint-correction",
  },
  {
    text: "Had my van valeted by OJvaleting! It looks brand new, thanks so much.",
    name: "Dave M",
    when: "June 2026",
  },
  {
    text: "I'm on the maintenance plan with Owen for mine and my partner's cars and they are perfect every time and wouldn't choose anyone else to trust with our vehicles, appreciate the attention to detail and very trustworthy.",
    name: "Steve F",
    when: "May 2026",
    service: "maintenance-valet",
  },
  {
    text: "Owen came and gave my vehicle the ozone treatment and wow the dog smells have gone and it smells brand new again! Thank you, highly recommend.",
    name: "Henry L",
    when: "March 2026",
    service: "deep-clean",
  },
  {
    text: "Just had my car valeted at home today. Full deep clean in and out. Mats, seats, plastics all immaculate. Amazing job. It's like new. Thoroughly recommend. Thanks Owen. Will definitely be booking again. Fantastic friendly service. Great rates.",
    name: "Steve R",
    when: "February 2026",
    service: "deep-clean",
  },
  {
    text: "If you're looking for someone to come to your house and take great care of your car, then look no further than Owen at OJ Valeting. He will spend multiple hours making your car look amazing.",
    name: "Scott R",
    when: "February 2026",
  },
  {
    text: "Highly recommend OJ Valeting. Thanks for sorting my mess of a car, now it's sale ready!",
    name: "Sophie L",
    when: "January 2026",
    service: "deep-clean",
  },
  {
    text: "Amazing job done today by OJ. Definitely recommend OJ Valeting for your car needs. Thank you.",
    name: "Laura R",
    when: "October 2025",
  },
];

export const homeQuote = {
  text: "Owen comes every month to detail our vehicles. The attention to detail is amazing and is super trustworthy, highly recommend.",
  name: "Recent customer review",
};
