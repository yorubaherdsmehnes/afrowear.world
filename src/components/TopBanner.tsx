import { ISSUE_LABEL } from "@/lib/config";

/**
 * Thin announcement bar at the very top of the page.
 * Visible on all breakpoints — matches the "ISSUE 01 · COMING SOON" pill
 * seen in the mobile mockup header.
 */
export default function TopBanner() {
  return (
    <div className="w-full bg-aw-surface border-b border-aw-border">
      <div className="flex items-center justify-center gap-2.5 px-4 py-2">
        {/* Pulsing gold dot — signals something live/active */}
        <span
          className="h-1.5 w-1.5 rounded-full bg-aw-gold animate-pulse-gold"
          aria-hidden="true"
        />
        <p className="font-sans text-eyebrow text-aw-gold tracking-[0.2em] uppercase">
          {ISSUE_LABEL} · Coming Soon
        </p>
      </div>
    </div>
  );
}