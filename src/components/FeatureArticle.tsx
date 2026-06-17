import Image from "next/image";
import motif from "../../public/African pattern.png";
import crownBlackTee from "../../public/Photoshoot Image 2.png";
import arstkrtWhiteTee from "../../public/Photoshoot image 3.png";

export default function FeatureArticle() {
  return (
    <>
      {/* Kente cover image teaser — dark patterned block from mockup */}
      <div
        className="w-full h-55 mb-10 relative object-cover "
        aria-hidden="true"
      >
        {/* Kente-inspired diagonal stripe pattern — pure CSS, no image dependency */}
        <div className="absolute inset-0 bg-transparent">
          <Image
            src={motif}
            alt="Modernized version of a native african print pattern"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      <article className="max-w-xl space-y-4 pb-16 text-center mx-auto">
        {/* Gold rule */}
        <div className="w-30 h-px bg-aw-gold mb-6 mx-auto" aria-hidden="true" />

        {/* Eyebrow */}
        <p className="font-sans text-eyebrow tracking-[0.2em] uppercase text-aw-gold">
          Feature · Style
        </p>

        {/* Headline */}
        <h2 className="font-serif text-display-md text-aw-white leading-tight mb-6">
          <em className="italic text-aw-gold">Kente</em> Beyond the Cloth
        </h2>

        {/* Image 1 */}
        <div
          className="w-full relative overflow-hidden mx-auto"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={crownBlackTee}
            alt="Model wearing a black crown-print tee with bold Bogolan-patterned wide-leg trousers"
            fill
            className="object-cover object-top pl-10 pr-10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Copy block 1 */}
        <p className="font-sans text-sm text-aw-muted leading-relaxed pt-2">
          The crown doesn't need a throne — it needs the right fabric. This look
          pairs a structured crown-print jersey tee cut from performance drifit
          with wide-leg Palazzo trousers whose geometric circles and triangles
          aren't just for decoration. The designers who grew up wearing cloth
          like this aren't referencing a tradition. They are continuing one.
        </p>

        {/* Image 2 */}
        <div
          className="w-full relative overflow-hidden mt-8 mx-auto"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={arstkrtWhiteTee}
            alt="Model in an ARSTKR mesh jersey with African script iconography, styled with slate trousers and white sneakers"
            fill
            className="object-cover object-top pl-10 pr-10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Copy block 2 */}
        <p className="font-sans text-sm text-aw-muted leading-relaxed pt-2">
          ARSTKRT reads across the chest in bold letterforms flanked by Native
          African patterns — the ancient script that colonialism almost erased.
          Worn here over slate trousers with clean white Air Forces, it makes
          the case quietly: Afrocentric fashion isn't about looking back. It's
          about knowing exactly where you came from so you can move forward
          without apology.
        </p>

        {/* Credits */}
        <div className="pt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 border-t border-aw-border">
          <a
            key="crownBlackTee"
            href="https://www.arstkrt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="font-sans text-eyebrow tracking-widest text-aw-subtle uppercase pt-3 hover:text-aw-gold/70
              transition-colors duration-200 text-[0.7rem]"
            >
              Designs — ARSTKRT
            </span>
          </a>
          <a
            key="arstkrtBlackTee"
            href="https://www.arstkrt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="font-sans text-eyebrow tracking-widest text-aw-subtle uppercase pt-3 hover:text-aw-gold/70
              transition-colors duration-200 text-[0.7rem]"
            >
              Photography — ARSTKRT
            </span>
          </a>
          {/* <span className="font-sans text-eyebrow tracking-widest text-aw-subtle uppercase pt-3">
            Photography — ###
          </span>*/}
          <a
            key="arstkrtBlackTee"
            href="https://www.afrowear.world"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-sans text-eyebrow tracking-widest text-aw-subtle uppercase pt-3 text-[0.7rem]">
              Words — Afrowear.world
            </span>
          </a>
        </div>
      </article>
    </>
  );
}
