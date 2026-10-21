// Canonical site origin for metadata, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is live; until then
// Vercel's production URL is used, and localhost in dev.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "EduExcellence";

export const SITE_DESCRIPTION =
  "International study visits and the Educarnival conferences for K-12 school owners, principals and educators. Learn what works abroad and bring it home.";
