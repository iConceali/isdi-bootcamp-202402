var matcha = require("./matcha");

var Arroz = require("./Arroz");

matcha.describe("⭐⭐⭐ Arroz ⭐⭐⭐", function () {
  matcha.describe("> constructor", function () {
    matcha.it("should construct", function () {
      var a = new Arroz();

      matcha.expect(a).toBeInstanceOf(Arroz);
      matcha.expect(a.length).toBe(0);
    });
    matcha.it("should construct with multiple values", function () {
      var a = new Arroz(10, 20, 30);

      matcha.expect(a).toBeInstanceOf(Arroz);
      matcha.expect(a.length).toBe(3);
      matcha.expect(a[0]).toBe(10);
      matcha.expect(a[1]).toBe(20);
      matcha.expect(a[2]).toBe(30);
    });

    matcha.it("should construct with one non-numeric value", function () {
      var a = new Arroz(true);

      matcha.expect(a).toBeInstanceOf(Arroz);
      matcha.expect(a.length).toBe(1);
      matcha.expect(a[0]).toBe(true);
    });

    matcha.it("should construct with one numeric value", function () {
      var a = new Arroz(5);

      matcha.expect(a).toBeInstanceOf(Arroz);
      matcha.expect(a.length).toBe(5);
      for (var i = 0; i < a.length; i++) matcha.expect(a[i]).toBe(undefined);
    });
  });

  matcha.describe("⭐⭐⭐ toString ⭐⭐⭐", function () {
    matcha.it("should convert to string", function () {
      var a = new Arroz(10, 20, 30, 40, 50);

      matcha.expect(!!a.toString).toBe(true);

      var string = a.toString();

      matcha.expect(string).toBe("Arroz [10, 20, 30, 40, 50]");
    });
  });

  matcha.describe("⭐⭐⭐ push ⭐⭐⭐", function () {
    matcha.it("should push a value", function () {
      var a = new Arroz(10, 20, 30);

      matcha.expect(!!a.push).toBe(true);

      var length = a.push(40);

      matcha.expect(a.length).toBe(4);
      matcha.expect(a[a.length - 1]).toBe(40);
      matcha.expect(length).toBe(4);
    });

    matcha.it("should push many values", function () {
      var a = new Arroz(10, 20, 30);

      matcha.expect(!!a.push).toBe(true);

      var length = a.push(40, 50, 60, 70);

      matcha.expect(a.length).toBe(7);
      matcha.expect(a[3]).toBe(40);
      matcha.expect(a[4]).toBe(50);
      matcha.expect(a[5]).toBe(60);
      matcha.expect(a[6]).toBe(70);
      matcha.expect(length).toBe(7);
    });
  });

  matcha.describe("⭐⭐⭐ pop ⭐⭐⭐", function () {
    matcha.it("should extract last value", function () {
      var a = new Arroz(10, 20, 30);

      matcha.expect(!!a.pop).toBe(true);

      var value = a.pop();

      matcha.expect(a.length).toBe(2);
      matcha.expect(a[0]).toBe(10);
      matcha.expect(a[1]).toBe(20);
      matcha.expect(a[2]).toBe(undefined);
      matcha.expect(value).toBe(30);
    });
  });

  matcha.describe("⭐⭐⭐ at ⭐⭐⭐", function () {
    matcha.it(
      "should return the value that is in the indicated index",
      function () {
        var a = new Arroz(100, 200, 300, 400, 500);

        matcha.expect(!!a.at).toBe(true);

        var value = a.at(3);

        matcha.expect(a.length).toBe(5);
        matcha.expect(a[0]).toBe(100);
        matcha.expect(a[1]).toBe(200);
        matcha.expect(a[2]).toBe(300);
        matcha.expect(a[3]).toBe(400);
        matcha.expect(a[4]).toBe(500);
        matcha.expect(value).toBe(400);
      }
    );
  });

  matcha.describe("⭐⭐⭐ concat ⭐⭐⭐", function () {
    matcha.it(
      "should return an arroz with the concatenated values",
      function () {
        var a = new Arroz(100, 200, 300);
        var b = new Arroz("pigs", "goats", "sheep");

        matcha.expect(!!a.concat).toBe(true);

        var result = a.concat(b);

        matcha.expect(a.length).toBe(3);
        matcha.expect(b.length).toBe(3);
        matcha.expect(a[0]).toBe(100);
        matcha.expect(a[1]).toBe(200);
        matcha.expect(a[2]).toBe(300);
        matcha.expect(b[0]).toBe("pigs");
        matcha.expect(b[1]).toBe("goats");
        matcha.expect(b[2]).toBe("sheep");
        matcha.expect(result[0]).toBe(100);
        matcha.expect(result[1]).toBe(200);
        matcha.expect(result[2]).toBe(300);
        matcha.expect(result[3]).toBe("pigs");
        matcha.expect(result[4]).toBe("goats");
        matcha.expect(result[5]).toBe("sheep");
        //matcha.expect(result).toBe(100, 200, 300, "pigs", "goats", "sheep");
        matcha.expect(result.length).toBe(6);
      }
    );

    matcha.it("should return an empty arroz", function () {
      var a = new Arroz();
      var b = new Arroz();

      matcha.expect(!!a.concat).toBe(true);

      var result = a.concat(b);

      matcha.expect(a.length).toBe(0);
      matcha.expect(b.length).toBe(0);
      matcha.expect(a[0]).toBe();
      matcha.expect(b[0]).toBe();
      matcha.expect(result[0]).toBe();
    });

    matcha.it(
      "should return an arroz with the concatenated with 4 arrozs + random values",
      function () {
        var a = new Arroz(100, 200, 300);
        var b = new Arroz("pigs", "goats", "sheep");
        var c = new Arroz("apples", "bananas", "oranges");
        var d = new Arroz("lamborghini", "ferrari", "mercedes");

        matcha.expect(!!a.concat).toBe(true);

        var result = a.concat(
          b,
          c,
          d,
          true,
          "hola mundo",
          undefined,
          function fun() {}
        );

        matcha.expect(a.length).toBe(3);
        matcha.expect(b.length).toBe(3);
        matcha.expect(c.length).toBe(3);
        matcha.expect(d.length).toBe(3);
        matcha.expect(a[0]).toBe(100);
        matcha.expect(a[1]).toBe(200);
        matcha.expect(a[2]).toBe(300);
        matcha.expect(b[0]).toBe("pigs");
        matcha.expect(b[1]).toBe("goats");
        matcha.expect(b[2]).toBe("sheep");
        matcha.expect(c[0]).toBe("apples");
        matcha.expect(c[1]).toBe("bananas");
        matcha.expect(c[2]).toBe("oranges");
        matcha.expect(d[0]).toBe("lamborghini");
        matcha.expect(d[1]).toBe("ferrari");
        matcha.expect(d[2]).toBe("mercedes");
        matcha.expect(result[0]).toBe(100);
        matcha.expect(result[1]).toBe(200);
        matcha.expect(result[2]).toBe(300);
        matcha.expect(result[3]).toBe("pigs");
        matcha.expect(result[4]).toBe("goats");
        matcha.expect(result[5]).toBe("sheep");
        matcha.expect(result[6]).toBe("apples");
        matcha.expect(result[7]).toBe("bananas");
        matcha.expect(result[8]).toBe("oranges");
        matcha.expect(result[9]).toBe("lamborghini");
        matcha.expect(result[10]).toBe("ferrari");
        matcha.expect(result[11]).toBe("mercedes");
        matcha.expect(result[12]).toBe(true);
        matcha.expect(result[13]).toBe("hola mundo");
        matcha.expect(result[14]).toBe(undefined);
        //matcha.expect(result[15]).toBe(function fun() {});
        matcha.expect(result.length).toBe(16);
        //console.log(result);
      }
    );
  });

  matcha.describe("⭐⭐⭐ find ⭐⭐⭐", function () {
    matcha.it(
      "should return the first value (returned by the callback function) found in the arroz",
      function () {
        var a = new Arroz(5, 12, 8, 130, 44);

        matcha.expect(!!a.find).toBe(true);

        var value = a.find(function (element) {
          return element > 20;
        });

        matcha.expect(a.length).toBe(5);
        matcha.expect(a[0]).toBe(5);
        matcha.expect(a[1]).toBe(12);
        matcha.expect(a[2]).toBe(8);
        matcha.expect(a[3]).toBe(130);
        matcha.expect(a[4]).toBe(44);
        matcha.expect(value).toBe(130);
      }
    );

    matcha.it(
      "should return the first value (returned by the callback function) found in the arroz",
      function () {
        var a = new Arroz([
          { name: "apples", quantity: 2 },
          { name: "bananas", quantity: 0 },
          { name: "cherries", quantity: 5 },
        ]);

        matcha.expect(!!a.find).toBe(true);

        var value = a.find(function (element) {
          return element.name === "cherries";
        });

        matcha.expect(a.length).toBe(3);
        matcha.expect(a[0]).toBe({ name: "apples", quantity: 2 });
        matcha.expect(value).toBe({ name: "cherries", quantity: 5 });
        console.log(value);
      }
    );
  });

  matcha.describe("⭐⭐⭐ findIndex ⭐⭐⭐", function () {
    matcha.it(
      "should return the index of the value that results in the callback",
      function () {
        var a = new Arroz(5, 12, 8, 130, 44);

        matcha.expect(!!a.findIndex).toBe(true);

        var value = a.findIndex(function (element) {
          return element > 13;
        });

        matcha.expect(a.length).toBe(5);
        matcha.expect(a[0]).toBe(5);
        matcha.expect(a[1]).toBe(12);
        matcha.expect(a[2]).toBe(8);
        matcha.expect(a[3]).toBe(130);
        matcha.expect(a[4]).toBe(44);
        matcha.expect(value).toBe(3);
      }
    );
  });

  matcha.describe("⭐⭐⭐ forEach ⭐⭐⭐", function () {
    matcha.it(
      "should return the index of the value that results in the callback",
      function () {
        var a = new Arroz(10, 20, 30, 40, 50);
        var b = new Arroz();

        matcha.expect(!!a.forEach).toBe(true);

        a.forEach(function (num) {
          b.push(num);
        });

        matcha.expect(a.length).toBe(5);
        matcha.expect(a[0]).toBe(10);
        matcha.expect(a[1]).toBe(20);
        matcha.expect(a[2]).toBe(30);
        matcha.expect(a[3]).toBe(40);
        matcha.expect(a[4]).toBe(50);
        matcha.expect(b[0]).toBe(10);
        matcha.expect(b[1]).toBe(20);
        matcha.expect(b[2]).toBe(30);
        matcha.expect(b[3]).toBe(40);
        matcha.expect(b[4]).toBe(50);
      }
    );
  });

  matcha.describe("⭐⭐⭐ from ⭐⭐⭐", function () {
    matcha.it(
      "should return the index of the value that results in the callback",
      function () {
        var a = new Arroz("papaya");

        matcha.expect(!!a.from).toBe(true);

        var result = a.from();

        matcha.expect(a.length).toBe(1);
        matcha.expect(a[0]).toBe("papaya");
        matcha.expect(result[0]).toBe("p");
        matcha.expect(result[1]).toBe("a");
        matcha.expect(result[2]).toBe("p");
        matcha.expect(result[3]).toBe("a");
        matcha.expect(result[4]).toBe("y");
        matcha.expect(result[5]).toBe("a");
        matcha.expect(result.length).toBe(6);
      }
    );
  });

  matcha.describe("⭐⭐⭐ includes ⭐⭐⭐", function () {
    matcha.it(
      "should return true if it finds the indicated value within the arroz",
      function () {
        var a = new Arroz(1, 2, 3);

        matcha.expect(!!a.includes).toBe(true);

        var result = a.includes(2);

        matcha.expect(a.length).toBe(3);
        matcha.expect(a[0]).toBe(1);
        matcha.expect(a[1]).toBe(2);
        matcha.expect(a[2]).toBe(3);
        matcha.expect(result).toBe(true);
      }
    );

    matcha.it(
      "should return true if it finds the indicated value within the arroz from the indicated index",
      function () {
        var a = new Arroz(1, 2, 3);

        matcha.expect(!!a.includes).toBe(true);

        var result = a.includes(3, -1);

        matcha.expect(a.length).toBe(3);
        matcha.expect(a[0]).toBe(1);
        matcha.expect(a[1]).toBe(2);
        matcha.expect(a[2]).toBe(3);
        matcha.expect(result).toBe(true);
      }
    );
  });

  matcha.describe("⭐⭐⭐ indexOf ⭐⭐⭐", function () {
    matcha.it(
      "should return the index in which the value that we indicate within the array is located (if it exists)",
      function () {
        var a = new Arroz("ant", "bison", "camel", "duck", "bison");

        matcha.expect(!!a.indexOf).toBe(true);

        var result = a.indexOf("bison");

        matcha.expect(a.length).toBe(5);
        matcha.expect(a[0]).toBe("ant");
        matcha.expect(a[1]).toBe("bison");
        matcha.expect(a[2]).toBe("camel");
        matcha.expect(a[3]).toBe("duck");
        matcha.expect(a[4]).toBe("bison");
        matcha.expect(result).toBe(1);
      }
    );

    matcha.it(
      "should return the index in which the value that we indicate is located (if it exists) within the array from the index that we indicate",
      function () {
        var a = new Arroz("ant", "bison", "camel", "duck");

        matcha.expect(!!a.indexOf).toBe(true);

        var result = a.indexOf("camel", 2);

        matcha.expect(a.length).toBe(4);
        matcha.expect(a[0]).toBe("ant");
        matcha.expect(a[1]).toBe("bison");
        matcha.expect(a[2]).toBe("camel");
        matcha.expect(a[3]).toBe("duck");
        matcha.expect(result).toBe(2);
      }
    );
  });
});
