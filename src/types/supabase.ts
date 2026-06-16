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
          first_name: string | null;
          phone_number: string | null;
          is_vip: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          referral_code?: string;
          referred_by?: string | null;
          status?: "pending" | "founding_member" | "confirmed";
          first_name?: string | null;
          phone_number?: string | null;
          is_vip?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          referral_code?: string;
          referred_by?: string | null;
          status?: "pending" | "founding_member" | "confirmed";
          first_name?: string | null;
          phone_number?: string | null;
          is_vip?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type WaitlistRow = Database["public"]["Tables"]["waitlist"]["Row"];
export type WaitlistInsert = Database["public"]["Tables"]["waitlist"]["Insert"];
