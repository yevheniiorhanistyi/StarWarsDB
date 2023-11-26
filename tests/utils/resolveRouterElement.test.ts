import { describe, it, expect } from "vitest";
import { resolveRouterElement } from "../../utils";

describe("resolveRouterElement", () => {
  it("should return the first element of the array if it is an array", () => {
    const result = resolveRouterElement(["value1", "value2"], "defaultValue");
    expect(result).toEqual("value1");
  });

  it("should return the element if it is a string", () => {
    const result = resolveRouterElement("singleValue", "defaultValue");
    expect(result).toEqual("singleValue");
  });

  it("should return the default value if the element is undefined", () => {
    const result = resolveRouterElement(undefined, "defaultValue");
    expect(result).toEqual("defaultValue");
  });

  it("should return the default value if the element is an empty array", () => {
    const result = resolveRouterElement([], "defaultValue");
    expect(result).toEqual("defaultValue");
  });
});
