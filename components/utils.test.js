import { isEmptyString, randomSelection } from "./utils"

describe("isEmptyString", () => {
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

describe("randomSelection", () => {
  const data = [
    {
      a: 2,
      b: 3
    },
    {
      d: 4
    },
    {
      e: 5
    }
  ]
  it("does not crash on empty arary", () => {
    expect(randomSelection([], 3)).toEqual([]);
  });
  it("returns whole array on size matching", () => {
    expect(randomSelection(data, 3)).toEqual(data);
  });
  it("returns one random element", () => {
    global.Math.random = () => 0.6;
    expect(randomSelection(data, 1)).toEqual([data[1]]);
  });
  it("returns subarray", () => {
    global.Math.random = () => 0.6;
    expect(randomSelection(data, 2)).toEqual([data[1], data[2]]);
  });
});