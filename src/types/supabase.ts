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
          id: string;
          email: string;
          created_at: string;
          referral_code: string;
          referred_by: string | null;
          status: "pending" | "founding_member" | "confirmed";
          first_name: string | null; // ← add
          phone_number: string | null; // ← add
          is_vip: boolean; // ← add
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          referral_code?: string;
          referred_by?: string | null;
          status?: "pending" | "founding_member" | "confirmed";
          first_name?: string | null; // ← add
          phone_number?: string | null; // ← add
          is_vip?: boolean; // ← add
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          referral_code?: string;
          referred_by?: string | null;
          status?: "pending" | "founding_member" | "confirmed";
          first_name?: string | null; // ← add
          phone_number?: string | null; // ← add
          is_vip?: boolean; // ← add
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
