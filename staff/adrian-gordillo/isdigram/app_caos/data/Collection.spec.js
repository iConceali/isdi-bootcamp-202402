describe("Collection", function () {
  describe("constructor", function () {
    it("creates a collection", function () {
      var cars = new Collection("cars");

      expect(cars).toBeInstanceOf(Collection);
    });
  });

  describe("_generateId", function () {
    it("generates a random id", function () {
      var cars = new Collection("cars");

      var id1 = cars._generateId();

      expect(typeof id1).toBe("string");

      var id2 = cars._generateId();

      expect(typeof id2).toBe("string");

      expect(id1 === id2).toBe(false);
    });
  });

  // TODO test all methods
});
