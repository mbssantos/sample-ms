const helpers = require("./helpers");

describe("Helpers", () => {
  describe("Reverse string", () => {
    describe("Reverse works for small strings", () => {
      expect(helpers.reverseString("abc").toBe("cba"))
    })
    describe("Reverse works for strings with spaces", () => {
      expect(helpers.reverseString("a b c").toBe("c b a"))
    })
  })
  describe("sum", () => {
    describe("Sum should work with ints", () => {
      expect(helpers.sum(1,2).toBe(3))
    })
  })
})
