import { site } from "./site";
import { services } from "./services";
import { hoursList } from "./hours";

const to24 = (t: string) => { const m = t.match(/(\d+)(am|pm)/); if (!m) return null; let h = +m[1] % 12; if (m[2] === "pm") h += 12; return `${String(h).padStart(2, "0")}:00`; };

// LocalBusiness on the home page only, where every value is visible. Service-area business:
// no street address (Owen goes to the customer), just his postal town. UI_RULES 13.3.
export const businessLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: `${site.url}/`,
  telephone: site.phoneIntl,
  email: site.email,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/logo.png`,
  address: { "@type": "PostalAddress", addressLocality: "Buckingham", addressRegion: "Buckinghamshire", postalCode: "MK18", addressCountry: "GB" },
  hasMap: site.google.url,
  founder: { "@type": "Person", name: "Owen", jobTitle: "Owner and valeter" },
  contactPoint: { "@type": "ContactPoint", telephone: site.phoneIntl, contactType: "bookings", areaServed: "GB", availableLanguage: "English" },
  openingHoursSpecification: hoursList.flatMap(([d, t]) => {
    const [o, c] = t.split(" to ").map(to24);
    return o && c ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${d}`, opens: o, closes: c }] : [];
  }),
  sameAs: [site.instagram, site.facebook, site.google.url],
  priceRange: "££",
  paymentAccepted: "Cash, Bank transfer, Apple Pay",
  areaServed: [
    ...site.counties.map((n) => ({ "@type": "AdministrativeArea", name: n })),
    ...site.towns.map((n) => ({ "@type": "City", name: n })),
  ],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    ...(s.from > 0 ? { priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "GBP" } } : {}),
    itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/${s.slug}/` },
  })),
};

export function serviceLd(slug: string) {
  const s = services.find((x) => x.slug === slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/${s.slug}/#service`,
    name: s.name,
    serviceType: s.searchName,
    description: s.owenSays ?? s.blurb,
    url: `${site.url}/${s.slug}/`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: [
    ...site.counties.map((n) => ({ "@type": "AdministrativeArea", name: n })),
    ...site.towns.map((n) => ({ "@type": "City", name: n })),
  ],
    // Only state a price once Owen has set one (new services show "Ask Owen" until then)
    ...(s.from > 0
      ? { offers: { "@type": "Offer", priceCurrency: "GBP", price: s.from, priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "GBP" } } }
      : {}),
  };
}

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: `${site.url}/`,
  publisher: { "@id": `${site.url}/#business` },
  inLanguage: "en-GB",
};
