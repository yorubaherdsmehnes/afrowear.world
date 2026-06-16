/**
 * Auto-generate this file from your live Supabase schema by running:
 *   npm run db:types
 *
 * This is a hand-written baseline. Once your DB is live, replace it.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;                    // uuid
          email: string;                 // text, unique
          created_at: string;            // timestamptz
          referral_code: string;         // text, unique, auto-generated
          referred_by: string | null;    // text, references waitlist(referral_code)
          status: "pending" | "founding_member" | "confirmed";
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          referral_code?: string;
          referred_by?: string | null;
          status?: "pending" | "founding_member" | "confirmed";
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          referral_code?: string;
          referred_by?: string | null;
          status?: "pending" | "founding_member" | "confirmed";
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience type aliases
export type WaitlistRow = Database["public"]["Tables"]["waitlist"]["Row"];
export type WaitlistInsert = Database["public"]["Tables"]["waitlist"]["Insert"];