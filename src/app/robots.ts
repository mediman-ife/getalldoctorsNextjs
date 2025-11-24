import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://medimandoctor.sugeevanit25.workers.dev'
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [`${base}/sitemap.xml`],
  }
}