import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/config";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// ── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Metadata & SEO ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Afrocentric fashion",
    "African fashion magazine",
    "Nigeria fashion",
    "Kente",
    "African designers",
    "Afrowear",
    "African style",
    "diaspora fashion",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ── Format Detection (Protects your CSS from iOS overrides) ──────────────
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  // ── Verification (For Google Search Console) ─────────────────────────────
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_STRING_HERE", 
  },

  // ── PWA & Apple Native App Feel ──────────────────────────────────────────
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/First%20Cover_2.jpg`,
        width: 1200,
        height: 630,
        alt: "Inaugural cover of Afrowear magazine showcasing modern Afrocentric fashion, featuring a model in a grey zip-up cape with colorful Ankara print accents.",
        type: "image/jpeg",
      },
      {
        url: `${SITE_URL}/Photoshoot%20Image%202.png`,
        width: 1200,
        height: 630,
        alt: "Model wearing a black crown-print tee with bold Bogolan-patterned wide-leg trousers.",
        type: "image/png",
      },
      {
        url: `${SITE_URL}/Photoshoot%20image%203.png`,
        width: 1200,
        height: 630,
        alt: "Model in an ARSTKR mesh jersey with African script iconography, styled with slate trousers and white sneakers.",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      `${SITE_URL}/First%20Cover_2.jpg`, 
      `${SITE_URL}/Photoshoot%20Image%202.png`, 
      `${SITE_URL}/Photoshoot%20image%203.png`
    ],
    site: "@afrowear_world",
    creator: "@afrowear.world",
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  applicationName: SITE_NAME,
  category: "fashion",
};

// ── Full Schema.org markup ───────────────────────────────────────────────────
// WebSite + Organization/Periodical + sameAs social links
const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-NG",
      potentialAction: {
        "@type": "SubscribeAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/#join`,
        },
        description: "Join the Afrowear inaugural issue waitlist",
      },
    },
    {
      "@type": ["Organization", "Periodical"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
      foundingLocation: {
        "@type": "Place",
        name: ["Lagos, Nigeria", "Nigeria"],
      },
      description: SITE_DESCRIPTION,
      sameAs: [
        "https://www.instagram.com/afrowear_com_ng",
        "https://x.com/afrowear_com_ng",
        "https://www.tiktok.com/@afrowear_com_ng",
        "https://www.youtube.com/@afrowear_com_ng",
        "https://www.pinterest.com/afrowear_com_ng"
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-aw-black text-aw-white antialiased selection:bg-aw-gold selection:text-aw-black">
        
        {/* ── Google Analytics ─────────────────────────────────────────────── */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-632X102NJL`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-632X102NJL', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* ── Schema.org Knowledge Graph ─────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />

        {children}
      </body>
    </html>
  );
}