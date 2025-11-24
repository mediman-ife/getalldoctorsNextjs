const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try the exact asset first
    let res = await env.ASSETS.fetch(request);
    if (res.status !== 404) return res;

    // Try extensionless .html (e.g. /doctors/123 -> /doctors/123.html)
    const htmlUrl = new URL(url);
    htmlUrl.pathname = htmlUrl.pathname.endsWith(".html")
      ? htmlUrl.pathname
      : `${htmlUrl.pathname}.html`;
    res = await env.ASSETS.fetch(new Request(htmlUrl, request));
    if (res.status !== 404) return res;

    // Try directory index (e.g. / -> /index.html, /docs -> /docs/index.html)
    const indexUrl = new URL(url);
    indexUrl.pathname = indexUrl.pathname.endsWith("/")
      ? `${indexUrl.pathname}index.html`
      : `${indexUrl.pathname}/index.html`;
    res = await env.ASSETS.fetch(new Request(indexUrl, request));
    if (res.status !== 404) return res;

    return new Response("Not Found", { status: 404 });
  },
};

export default worker;
