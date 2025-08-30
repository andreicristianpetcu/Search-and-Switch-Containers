module.exports = {
  // Global options
  verbose: true,

  // Build options
  build: {
    overwriteDest: true,
  },

  // Sign options (for AMO submission)
  sign: {
    // These should be set via environment variables:
    // WEB_EXT_API_KEY and WEB_EXT_API_SECRET
    // Get them from: https://addons.mozilla.org/developers/addon/api/key/
    channel: 'listed', // 'listed' for public AMO, 'unlisted' for self-distribution
  },

  // Run options (for development)
  run: {
    startUrl: ['about:debugging#/runtime/this-firefox'],
  },

  // Lint options
  lint: {
    pretty: true,
    warningsAsErrors: false,
  },
};
