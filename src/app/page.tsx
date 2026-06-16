import TopBanner from "@/components/TopBanner";
import HeroCover from "@/components/HeroCover";
import WaitlistForm from "@/components/WaitlistForm";
import EditorsNote from "@/components/EditorsNote";
import FeatureArticle from "@/components/FeatureArticle";
import Footer from "@/components/Footer";
import { SITE_TAGLINE, SITE_DESCRIPTION, ISSUE_LABEL } from "@/lib/config";

/**
 * Root page — split-pane editorial layout.
 *
 * Desktop: two-column flex
 *   Left  — sticky magazine cover (HeroCover), 50vw
 *   Right — scrollable content column, 50vw
 *
 * Mobile: single column, stacked top-to-bottom
 *   TopBanner → HeroCover (tall hero) → content → Footer
 *
 * The TopBanner sits outside the split layout so it spans full width.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-aw-black flex flex-col">
      {/* ── Full-width announcement bar ────────────────────────────────────── */}
      <TopBanner />

      {/* ── Split layout ───────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* ── Left: Sticky cover ─────────────────────────────────────────── */}
        {/* On desktop this takes exactly half the viewport width and stays   */}
        {/* fixed while the right column scrolls past it.                     */}
        <div className="lg:w-1/2 lg:flex-shrink-0">
          <HeroCover />
        </div>

        {/* ── Right: Scrollable content ──────────────────────────────────── */}
        <main className="lg:w-1/2 flex flex-col" id="main-content">
          {/* Hero copy + waitlist form */}
          <section
            className="flex flex-col justify-center px-8 md:px-12 lg:px-14 pt-14 pb-10 min-h-[60vh] lg:min-h-screen"
            aria-labelledby="hero-headline"
          >
            {/* 
    THE SCALE WRAPPER: 
    This locks the origin to the left and scales the entire block by 1.3x only on lg screens. 
  */}
            <div className="lg:scale-[1.3] lg:origin-left lg:w-[76.9%]">
              {/* Issue badge */}
              <p className="font-sans text-eyebrow tracking-[0.2em] uppercase text-aw-gold mb-6 inline-flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-aw-gold"
                  aria-hidden="true"
                />
                {ISSUE_LABEL}
              </p>

              {/* Display headline */}
              <h1
                id="hero-headline"
                className="font-serif text-display-xl text-aw-white leading-[1.05] tracking-tight mb-6"
              >
                Where the{" "}
                <em className="italic text-aw-gold not-italic uppercase pl-1 pr-1 lg:pl-2 lg:pr-2">Afican Fashion</em>{" "}
                Meets the World.
              </h1>

              {/* Standfirst */}
              <p className="font-sans text-sm text-aw-muted leading-relaxed max-w-sm mb-10">
                {SITE_DESCRIPTION}
              </p>

              {/* Email capture */}
              <div className="max-w-sm">
                <WaitlistForm />
              </div>
            </div>
          </section>

          {/* Editor's Note gold band */}
          <EditorsNote />

          {/* Feature article teaser */}
          <section
            className="px-8 md:px-12 lg:px-14 pt-4 pb-12"
            aria-label="Feature preview"
          >
            <FeatureArticle />
          </section>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
