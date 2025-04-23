import { MetadataRoute } from "next";
import { dataService } from "@/data/data-services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ikovaline.com";

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/mentions-legales",
    "/nos-services",
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const dynamicUrls = dataService.map((service) => ({
    url: `${baseUrl}/nos-services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...dynamicUrls];
}
