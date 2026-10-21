import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import ScrollToTopButton from "@/components/ScrollToTopButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// Site-wide defaults. Pages override `title`/`description`; OG and Twitter
// cards inherit these unless a page sets its own.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — International Study Visits & Educarnival for K-12 School Leaders`,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: "/",
    title: `${SITE_NAME} — International Study Visits & Educarnival for K-12 School Leaders`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EduExcellence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — International Study Visits & Educarnival`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <body>
        {children}

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />

        {/* Scroll To Top Button */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}