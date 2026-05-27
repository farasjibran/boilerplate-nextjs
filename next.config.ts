import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "my-org",
  project: process.env.SENTRY_PROJECT || "boilerplate-nextjs",
  silent: true,
});
