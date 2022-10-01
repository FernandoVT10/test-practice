import sum from "../sum";

describe("Sum function", () => {
  it("should add 2 numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
