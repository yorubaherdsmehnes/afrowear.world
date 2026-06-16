"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

// ─── Types ───────────────────────────────────────────────────

type WaitlistInsert = {
  email: string;
  referred_by: string | null;
};

type WaitlistUpdate = {
  first_name: string | null;
  phone_number: string | null;
  is_vip: boolean;
};

// ─── STEP 1: Secure the initial lead ─────────────────────────

export async function registerWaitlist(formData: FormData): Promise<ActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const referredBy = (formData.get("ref") as string) || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const payload: WaitlistInsert = {
    email,
    referred_by: referredBy,
  };

  const { error } = await supabase
    .from("waitlist")
    .insert([payload] as any);

  if (error) {
    if (error.code === "23505") {
      return { success: true, message: "You're already on the list. We'll be in touch." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true, message: "Email secured." };
}

// ─── STEP 2: The VIP Upgrade (Name & Phone) ──────────────────

export async function upgradeWaitlist(formData: FormData): Promise<ActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const firstName = (formData.get("firstName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();

  if (!email) return { success: false, error: "Email reference lost." };

  const payload: WaitlistUpdate = {
    first_name: firstName || null,
    phone_number: phone || null,
    is_vip: !!phone,
  };

  const { error } = await supabase
    .from("waitlist")
    .update(payload as any)
    .eq("email", email);

  if (error) {
    return { success: false, error: "Failed to upgrade. You are still on the email list!" };
  }

  return { success: true, message: "VIP Access Confirmed." };
}