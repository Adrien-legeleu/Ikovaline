import { MetadataRoute } from 'next';
import { dataService } from '@/data/data-services';
import { blogMetadata } from '@/lib/blogMetadata';
import { dataAgenceGlobal } from '@/data/data-agence-global';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ikovaline.com';

  const staticRoutes = [
    { route: '', priority: 1.0 },
    { route: '/about', priority: 0.8 },
    { route: '/contact', priority: 0.8 },
    { route: '/mentions-legales', priority: 0.8 },
    { route: '/nos-services', priority: 0.8 },
    { route: '/blog', priority: 0.8 },
  ];

  const staticUrls = staticRoutes.map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority,
  }));

  const dynamicUrls = dataService.map((service) => ({
    url: `${baseUrl}/nos-services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const dynamicUrlsBlog = Object.keys(blogMetadata).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  const dynamicUrlsAgences = dataAgenceGlobal.map((city) => ({
    url: `${baseUrl}/${city.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [
    ...staticUrls,
    ...dynamicUrls,
    ...dynamicUrlsBlog,
    ...dynamicUrlsAgences,
  ];
}
