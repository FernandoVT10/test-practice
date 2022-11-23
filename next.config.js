// eslint-disable-next-line
const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: "./src/tsconfig.json"
  },
  experimental: {
    appDir: true
  },
  compiler: {
    reactRemoveProperties: true
  }
};

module.exports = (phase) => {
  if(phase === PHASE_PRODUCTION_BUILD && process.env.BUILD_TYPE === "test"
    || phase === PHASE_DEVELOPMENT_SERVER) {
    // don't get rid of data-test attributes for testing with cypress
    nextConfig.compiler.reactRemoveProperties = false;
  }


  return nextConfig;
};
