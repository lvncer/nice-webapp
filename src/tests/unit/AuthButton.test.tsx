/**
 * AuthButton component tests
 */
import { describe, expect, it } from "bun:test";

describe("AuthButton", () => {
  it("should import without errors", async () => {
    const AuthButton = await import("../../components/AuthButton");
    expect(AuthButton.default).toBeDefined();
  });

  it("should be a function component", async () => {
    const AuthButton = await import("../../components/AuthButton");
    expect(typeof AuthButton.default).toBe("function");
  });
});
