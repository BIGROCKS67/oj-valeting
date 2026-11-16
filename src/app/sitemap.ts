import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...services.map((s) => `/${s.slug}/`), "/book/", "/work/", "/reviews/", "/privacy/"];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
