import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for build time
    if (typeof window === "undefined") {
      return {
        auth: {
          signUp: () =>
            Promise.resolve({ error: new Error("Environment not configured") }),
          signInWithPassword: () =>
            Promise.resolve({ error: new Error("Environment not configured") }),
          signInWithOAuth: () =>
            Promise.resolve({ error: new Error("Environment not configured") }),
          getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        },
      } as unknown as SupabaseClient;
    }
    throw new Error("Missing Supabase environment variables");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
