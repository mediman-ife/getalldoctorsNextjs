const worker = {
  async fetch(request, env) {
    const incoming = new URL(request.url)
    const base = env.REDIRECT_BASE_URL || env.NEXT_PUBLIC_BASE_URL || 'https://doctors.mediman.life'
    const targetURL = new URL(base)
    if (incoming.host === targetURL.host) {
      return new Response('OK', { status: 204 })
    }
    targetURL.pathname = incoming.pathname
    targetURL.search = incoming.search
    return Response.redirect(targetURL.toString(), 301)
  },
};

export default worker;
