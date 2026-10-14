import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SERVICES } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  })

  return [
    page('', 1),
    page('/services', 0.9),
    // The search-intent landing pages: what people type, one page each.
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.9)),
    page('/work', 0.9),
    page('/contact', 0.9),
    page('/approach', 0.8),
    page('/about', 0.8),
  ]
}
