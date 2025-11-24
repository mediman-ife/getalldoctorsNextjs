export const runtime = 'edge'

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://medimandoctor.sugeevanit25.workers.dev'
  const sitemapUrl = `${base}/sitemap.xml`
  const targets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  ]
  const results = await Promise.allSettled(targets.map((u) => fetch(u)))
  const ok = results.every((r) => r.status === 'fulfilled' && (r as PromiseFulfilledResult<Response>).value.ok)
  return new Response(JSON.stringify({ ok }), { status: ok ? 200 : 207, headers: { 'content-type': 'application/json' } })
}