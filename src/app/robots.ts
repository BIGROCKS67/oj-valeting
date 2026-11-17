import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { isPreview } from "@/data/base";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    // AI search crawlers named outright, as on R4R: they can read and cite the site.
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot"],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
