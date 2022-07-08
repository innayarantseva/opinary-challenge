import { getPercentage } from "./Poll";

test("percentage calculates correctly", () => {
  expect(getPercentage(4, 1)).toBe(" — 25%");
  expect(getPercentage(100, 10)).toBe(" — 10%");
  expect(getPercentage(100, 0.1)).toBe(" — 0.1%");
});
