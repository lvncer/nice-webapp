/**
 * Test setup for Bun
 */

// Mock environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

// Note: NODE_ENV は読み取り専用のため、代入できません
// Bunテスト実行時は自動的に "test" に設定されます

// Global test setup
globalThis.fetch = globalThis.fetch || (() => Promise.resolve({} as Response));

// Mock Next.js modules if needed
const mockRouter = {
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => Promise.resolve(),
};

// Type augmentation for globalThis
declare global {
  var __NEXT_ROUTER__: typeof mockRouter;
}

(
  globalThis as typeof globalThis & { __NEXT_ROUTER__: typeof mockRouter }
).__NEXT_ROUTER__ = mockRouter;

// This export makes this file a module, enabling global declarations
export {};
