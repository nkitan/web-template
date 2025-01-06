import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* publicly available config options go here */
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    APP_VERSION: process.env.APP_VERSION,
    APP_NAME: process.env.APP_NAME,
    APP_REPO: process.env.APP_REPO,
    REFRESH_TOKEN_EXPIRY_INTERVAL: `${2 * 24 * 60 * 60}`,
    ACCESS_TOKEN_EXPIRY_INTERVAL: `${10}`
  },
};

export default nextConfig;