import { site } from "./site";
import { services } from "./services";

// LocalBusiness on the home page only, where every value is visible. Service-area business:
// no street address (Owen goes to the customer). UI_RULES 13.3.
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
  sameAs: [site.instagram, site.facebook],
  priceRange: "££",
  paymentAccepted: "Cash, Bank transfer",
  areaServed: [
    ...site.counties.map((n) => ({ "@type": "AdministrativeArea", name: n })),
    ...site.towns.map((n) => ({ "@type": "City", name: n })),
  ],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "GBP" },
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
    offers: { "@type": "Offer", priceCurrency: "GBP", price: s.from, priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "GBP" } },
  };
}
