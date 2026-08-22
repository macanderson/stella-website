import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Generated so the sitemap URL can never drift from SITE.url again. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
