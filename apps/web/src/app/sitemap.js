import { PROGRAMS, detailHref, hasDetailPage, isPast } from "../lib/programs";
import { SITE_URL } from "../lib/site";

const STATIC = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/partnership", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/register", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();

  // Programs with their own detail page. Entries without one point at a page
  // already listed above, so they're skipped to avoid duplicate URLs.
  const programs = PROGRAMS.filter(hasDetailPage).map((p) => ({
    url: `${SITE_URL}${detailHref(p)}`,
    lastModified: now,
    changeFrequency: isPast(p, now) ? "yearly" : "weekly",
    priority: isPast(p, now) ? 0.4 : 0.8,
  }));

  return [
    ...STATIC.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...programs,
  ];
}
