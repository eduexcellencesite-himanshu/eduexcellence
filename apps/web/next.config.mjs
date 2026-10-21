const isDev = process.env.NODE_ENV !== "production";

// Origin the browser talks to for form submissions (NEXT_PUBLIC_API_URL is
// `https://host/api`; CSP wants just the origin). Falls back to the Vercel API
// project so a missing env var never blocks the forms.
const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || "https://eduexcellance-web-2pa1.vercel.app/api").origin;
  } catch {
    return "https://eduexcellance-web-2pa1.vercel.app";
  }
})();

// Third parties actually embedded on the site:
// - Cloudflare Turnstile (partnership form): script + iframe + verification call
// - YouTube embeds (study-visit pages)
// - Google Maps embeds (contact, partnership)
// - Event video hosted on eduexcellence.in (study-visit pages)
const csp = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; Turbopack dev also needs eval.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
  // MUI/emotion and next/font emit inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' https://eduexcellence.in",
  `connect-src 'self' ${apiOrigin} https://challenges.cloudflare.com`,
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Not in dev: it would upgrade the http://localhost:5000 API calls to https.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75, 82, 85, 90],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // The old sponsor pages are superseded by /partnership.
  async redirects() {
    return [
      { source: "/become-a-sponser", destination: "/partnership", permanent: true },
      { source: "/sponsor", destination: "/partnership", permanent: true },
    ];
  },
  // Dev-only: proxy /api through the web server so a single public tunnel (ngrok etc.)
  // reaches both apps. Run with DEV_API_PROXY=http://localhost:5000 and NEXT_PUBLIC_API_URL=/api.
  async rewrites() {
    const target = process.env.DEV_API_PROXY;
    return isDev && target ? [{ source: "/api/:path*", destination: `${target}/api/:path*` }] : [];
  },
};

export default nextConfig;
