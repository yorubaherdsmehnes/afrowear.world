import { EDITORS_NOTE } from "@/lib/config";

/**
 * The gold "Editor's Note" banner block.
 * Acts as a visual palate cleanser between the hero form and the feature teaser.
 * Matches the gold-background quote section in both desktop and mobile mockups.
 */
export default function EditorsNote() {
  return (
    <aside
      aria-label="Editor's Note"
      className="w-full bg-aw-gold px-8 py-9 my-12"
    >
      {/* Eyebrow */}
      <p className="font-sans text-eyebrow tracking-[0.2em] uppercase text-aw-black/60 mb-5">
        Editor&apos;s Note
      </p>

      {/* Pull quote */}
      <blockquote>
        <p className="font-serif text-lg md:text-xl leading-relaxed text-aw-black italic">
          &ldquo;{EDITORS_NOTE}&rdquo;
        </p>
        <footer className="mt-5 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-aw-black/60">
          — The Afrowear Team
        </footer>
      </blockquote>
    </aside>
  );
}