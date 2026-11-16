import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { isPreview } from "@/data/base";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/book/sent/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
