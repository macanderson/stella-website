import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** robots.txt already advertises /sitemap.xml; before this it 404'd. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
