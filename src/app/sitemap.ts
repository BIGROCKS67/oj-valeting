import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { areas } from "@/data/areas";
import { guides } from "@/data/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...services.map((s) => `/${s.slug}/`), "/book/", "/work/", "/reviews/", "/about/", "/areas/", ...areas.map((a) => `/areas/${a.slug}/`), "/guides/", ...guides.map((g) => `/guides/${g.slug}/`), "/terms/", "/privacy/"];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
