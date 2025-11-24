// src/worker.js

const worker = {
  async fetch(request, env, ctx) {
    // Serve all requests from the static assets bundle (out/)
    return env.ASSETS.fetch(request);
  },
};

export default worker;
