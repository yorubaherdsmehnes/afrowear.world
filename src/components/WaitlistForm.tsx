"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useWaitlistForm } from "@/hooks/useWaitlistForm";
import { cn } from "@/lib/utils";
import { FOUNDING_MEMBER_LIMIT } from "@/lib/config";

// Consistent animation variants for smooth transitions
const formVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export default function WaitlistForm() {
  const {
    step, email, setEmail, firstName, setFirstName, phone, setPhone,
    message, errorMsg, isPending,
    handleEmailSubmit, handleUpgradeSubmit, handleSkip,
  } = useWaitlistForm();

  return (
    <div className="w-full min-h-[160px] relative">
      <label className="block font-sans text-eyebrow text-aw-gold tracking-[0.2em] uppercase mb-4">
        {step === "upgrade" ? "Upgrade to VIP" : "Join the Waitlist"}
      </label>

      <AnimatePresence mode="wait">
        {/* ── STEP 1: EMAIL CAPTURE ──────────────────────────────────────── */}
        {step === "email" && (
          <motion.form
            key="step-email"
            variants={formVariants}
            initial="initial" animate="animate" exit="exit"
            transition={{ duration: 0.3 }}
            onSubmit={handleEmailSubmit}
            className="space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus // Auto-focuses when page loads on desktop
              disabled={isPending}
              className={cn(
                "w-full bg-transparent text-aw-white placeholder-aw-subtle font-sans text-sm px-4 py-3.5",
                "border-b transition-all duration-200 outline-none rounded-none",
                errorMsg ? "border-red-500/60 focus:border-red-400" : "border-aw-border focus:border-aw-gold",
                isPending && "opacity-60"
              )}
            />
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
            
            <button
              type="submit"
              disabled={isPending || !email}
              className="w-full flex items-center justify-center gap-2 font-sans text-eyebrow tracking-[0.2em] uppercase px-6 py-4 border border-aw-gold text-aw-gold hover:bg-aw-gold hover:text-aw-black transition-all"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : "Reserve My Copy"}
            </button>
            <p className="font-sans text-[0.65rem] text-aw-subtle text-center">First {FOUNDING_MEMBER_LIMIT} get founding member status.</p>
          </motion.form>
        )}

        {/* ── STEP 2: VIP UPGRADE (NAME & PHONE) ─────────────────────────── */}
        {step === "upgrade" && (
          <motion.form
            key="step-upgrade"
            variants={formVariants}
            initial="initial" animate="animate" exit="exit"
            transition={{ duration: 0.3 }}
            onSubmit={handleUpgradeSubmit}
            className="space-y-4"
          >
            <p className="text-xs text-aw-muted leading-relaxed">
              You're on the list. Want 24-hour early access to the inaugural drop?
            </p>
            
            <div className="space-y-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                autoFocus // Instantly focused after email succeeds
                disabled={isPending}
                className="w-full bg-transparent border-b border-aw-border focus:border-aw-gold text-aw-white text-sm px-4 py-3 outline-none rounded-none transition-colors"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number (SMS)"
                disabled={isPending}
                className="w-full bg-transparent border-b border-aw-border focus:border-aw-gold text-aw-white text-sm px-4 py-3 outline-none rounded-none transition-colors"
              />
            </div>
            
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                disabled={isPending || !firstName || !phone}
                className="w-full flex items-center justify-center gap-2 font-sans text-eyebrow tracking-[0.2em] uppercase px-6 py-4 bg-aw-gold text-aw-black hover:bg-aw-white transition-all disabled:opacity-50"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : "Get VIP Access"}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                disabled={isPending}
                className="text-[0.65rem] uppercase tracking-widest text-aw-subtle hover:text-aw-white py-2"
              >
                No thanks, email is fine
              </button>
            </div>
          </motion.form>
        )}

        {/* ── STEP 3: SUCCESS ────────────────────────────────────────────── */}
        {step === "success" && (
          <motion.div
            key="step-success"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-3 py-4"
          >
            <CheckCircle2 className="text-aw-gold mt-0.5 shrink-0" size={18} />
            <div>
              <p className="font-sans text-sm text-aw-white leading-relaxed">{message}</p>
              <p className="font-sans text-xs text-aw-muted mt-1">Scroll down to explore Issue 01.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}