export default {
    async fetch(request, env) {
        // Serve static assets using the ASSETS binding
        // This binding is automatically provided when 'pages_build_output_dir' is set
        return env.ASSETS.fetch(request);
    },
};
