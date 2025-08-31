/**
 * Supabase client tests
 */
import { beforeAll, describe, expect, it } from "bun:test";

describe("Supabase Client", () => {
  beforeAll(() => {
    // Mock environment variables for testing
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  });

  it("should create client without throwing error", async () => {
    const { createClient } = await import("../../lib/supabase/client");

    expect(() => createClient()).not.toThrow();
  });

  it("should return mock client when environment variables are missing in server environment", async () => {
    // Temporarily remove env vars
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const { createClient } = await import("../../lib/supabase/client");

    const client = createClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
    expect(typeof client.auth.getUser).toBe("function");

    // Restore env vars
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
  });
});
