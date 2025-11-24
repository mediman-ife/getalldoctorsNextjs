const worker = {
  async fetch(request, env) {
    const incoming = new URL(request.url)
    const base = env.NEXT_PUBLIC_BASE_URL || 'https://doctors.mediman.life'
    const target = `${base}${incoming.pathname}${incoming.search}`
    return Response.redirect(target, 301)
  },
};

export default worker;
