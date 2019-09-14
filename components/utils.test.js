import { isEmptyString } from "./utils"

describe("isEmptyString test", () => {
  it("for empty string returns true", () => {
    expect(isEmptyString("")).toBe(true);
  });
  it("for non-empty string returns false", () => {
    expect(isEmptyString("Hello World")).toBe(false);
  });
  it("for 0 string returns false", () => {
    expect(isEmptyString("0")).toBe(false);
  });
  it("for undefined returns true", () => {
    expect(isEmptyString(undefined)).toBe(true);
  });
  it("for null returns true", () => {
    expect(isEmptyString(null)).toBe(true);
  });
})