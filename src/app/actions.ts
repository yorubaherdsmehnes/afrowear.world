"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from '../types/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

// STEP 1: Secure the initial lead
export async function registerWaitlist(formData: FormData): Promise<ActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const referredBy = (formData.get("ref") as string) || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await supabase
    .from("waitlist")
    .insert([{ email, referred_by: referredBy }]);

  if (error) {
    if (error.code === "23505") {
      return { success: true, message: "You're already on the list. We'll be in touch." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true, message: "Email secured." };
}

// STEP 2: The VIP Upgrade (Name & Phone)
export async function upgradeWaitlist(formData: FormData): Promise<ActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const firstName = (formData.get("firstName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();

  if (!email) return { success: false, error: "Email reference lost." };

  const { error } = await supabase
    .from("waitlist")
    .update({ 
      first_name: firstName || null, 
      phone_number: phone || null,
      is_vip: !!phone // Mark them as VIP if they gave a phone number
    })
    .eq("email", email);

  if (error) {
    return { success: false, error: "Failed to upgrade. You are still on the email list!" };
  }

  return { success: true, message: "VIP Access Confirmed." };
}