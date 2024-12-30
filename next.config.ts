import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    APP_VERSION: "0.1",
    APP_NAME: "Web Template",
    APP_REPO: "https://github.com/nkitan/web-template"
  },
};

export default nextConfig;