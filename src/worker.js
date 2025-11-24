const worker = {
  async fetch(request, env) {
    const incoming = new URL(request.url)
    let base = env.REDIRECT_BASE_URL || env.NEXT_PUBLIC_BASE_URL || 'https://doctors.mediman.life'
    if (!/^https?:\/\//.test(base)) base = `https://${base}`
    const target = new URL(base)
    if (incoming.host === target.host) return new Response('OK', { status: 204 })
    target.pathname = incoming.pathname
    target.search = incoming.search
    return Response.redirect(target.toString(), 301)
  },
};

export default worker;
