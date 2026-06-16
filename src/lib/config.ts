// ─── Site ─────────────────────────────────────────────────────────────────────
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://afrowear.world";

export const SITE_NAME = "Afrowear.world";
export const SITE_TAGLINE = "Where the Continent Meets the Runway.";
export const SITE_DESCRIPTION =
  "The first magazine dedicated to the full spectrum of Afrocentric fashion — design, culture, craft, and the people driving it forward.";

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND_GOLD = "#C5A86B";

// ─── Issue ────────────────────────────────────────────────────────────────────
export const ISSUE_LABEL = "Issue 01 · Inaugural";
export const FOUNDING_MEMBER_LIMIT = 500;

// ─── Social links ─────────────────────────────────────────────────────────────
export const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/afrowear.world",
    handle: "@afrowea.world",
  },
  // {
  //   name: "X",
  //   href: "https://x.com/afrowear_com_ng",
  //   handle: "@afrowear_com_ng",
  // },
  {
    name: "TikTok",
    href: "https://tiktok.com/@afrowearworld",
    handle: "@afrowearworld",
  },
  // {
  //   name: "YouTube",
  //   href: "https://youtube.com/@afrowear",
  //   handle: "@afrowear",
  // },
  // {
  //   name: "Pinterest",
  //   href: "https://pinterest.com/afrowear",
  //   handle: "afrowear",
  // },
] as const;

// ─── Copy ─────────────────────────────────────────────────────────────────────
export const EDITORS_NOTE =
  "Africa is not an aesthetic. It is an origin, a philosophy, and a future — and Afrowear exists to document every chapter.";

export const FEATURE = {
  eyebrow: "Feature · Style",
  title: "Kente Beyond the Cloth",
  body: "How a single textile became a global symbol — and what the designers who grew up wearing it think about that transformation.",
  photography: "Emeka Osei",
  words: "Adaeze Nwosu",
};