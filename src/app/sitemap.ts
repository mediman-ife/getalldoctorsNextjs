import type { MetadataRoute } from 'next'
import { fetchDoctors } from '@/services/api'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://medimandoctor.sugeevanit25.workers.dev'

  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.8 },
  ]

  try {
    const ids: string[] = []
    let page = 1
    let hasMore = true
    while (hasMore) {
      const res = await fetchDoctors(page, 100)
      if (res.success && res.data.length > 0) {
        for (const d of res.data) ids.push(d._id)
        hasMore = res.data.length === 100
        page++
      } else {
        hasMore = false
      }
    }
    for (const id of ids) {
      items.push({
        url: `${base}/doctors/${id}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      })
    }
  } catch {}

  return items
}