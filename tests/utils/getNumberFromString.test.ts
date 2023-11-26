import { describe, it, expect } from "vitest";
import { getNumberFromString } from "../../utils";

describe("getCharacterNumber", () => {
  it("Extracts number from a string", () => {
    const result = getNumberFromString("abc123xyz");
    expect(result).toBe(123);
  });
  it("Returns 1 if no number is found", () => {
    const result = getNumberFromString();
    expect(result).toBe(1);
  });
});
