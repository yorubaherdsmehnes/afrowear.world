"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_NAME, SOCIALS } from "@/lib/config";
import firstCoverImg from "../../public/First Cover.png";

/**
 * The imposing left-side magazine cover.
 *
 * Desktop: sticky, fills 100vh, stays locked while right column scrolls.
 * Mobile:  displayed as a tall hero image above the fold (70vh).
 *
 * The Ken Burns animation (slow zoom-out) creates the cinematic entrance.
 * A vignette gradient darkens the edges to draw eyes to the cover center.
 * The social handles from the cover are overlaid at the bottom-left,
 * matching the magazine's own printed social row.
 */
export default function HeroCover() {
  return (
    <section
      className="
        relative
        h-[70vh] lg:h-screen
        w-full
        overflow-hidden
        bg-aw-black
        lg:sticky lg:top-0
        lg:border-r-1
        lg:border-aw-gold/30
      "
      aria-label={`${SITE_NAME} Magazine Cover`}
    >
      {/* ── Cover Image ──────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src={firstCoverImg}
          alt="Afrowear Inaugural Issue Cover — a model in structured Afrocentric garments against a dark editorial backdrop"
          fill
          priority
          placeholder="blur"
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      {/* ── Vignette overlay ─────────────────────────────────────────────── */}
      {/* Darkens edges, spotlights the cover center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Gradient fade into the right column on desktop */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, transparent 70%, rgba(10,10,10,0.9) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Gradient fade into the right section on mobile */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Social handles overlay (bottom-left) ─────────────────────────── */}
      {/* Mirrors the social handles printed on the actual magazine cover */}
      <div className="absolute bottom-10 left-7 flex flex-col gap-1 z-10">
        {SOCIALS.slice(0, 3).map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-sans text-[0.8rem] tracking-widest uppercase
              text-white/50 hover:text-aw-gold/70
              transition-colors duration-200
            "
          >
            {social.handle}
          </a>
        ))}
        <span className="font-serif text-[1.0rem] tracking-widest uppercase">
          AFROWEAR.WORLD
        </span>
      </div>
    </section>
  );
}
