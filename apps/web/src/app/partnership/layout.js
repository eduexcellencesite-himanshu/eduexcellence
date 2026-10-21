// page.js is a client component, so route metadata lives here.
export const metadata = {
  title: "Partner with Educarnival · IIT Delhi 2026 — EduExcellence",
  description:
    "Speaking, exhibition, partnership and recognition opportunities at IIT Delhi Educarnival 2026, the 17th annual international school conference for 500+ school leaders.",
  alternates: { canonical: "/partnership" },
  openGraph: {
    title: "Partner with Educarnival · IIT Delhi 2026",
    description:
      "Speaking, exhibition, partnership and recognition opportunities at IIT Delhi Educarnival 2026.",
    url: "/partnership",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IIT Delhi Educarnival 2026" }],
  },
};

export default function PartnershipLayout({ children }) {
  return children;
}
