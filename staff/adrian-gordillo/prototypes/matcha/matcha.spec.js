var assert = require("./assert");

var matcha = require("./matcha");

console.log("matcha");

console.log("> describe");

matcha.logs.length = 0;

var run = false;

assert.equalsValue(!!matcha.describe, true);

matcha.describe("describe title", function () {
  run = true;
});

assert.equalsValue(run, true);
assert.equalsValue(matcha.logs[0], "describe title");

console.log("> it");

matcha.logs.length = 0;

var run = false;

assert.equalsValue(!!matcha.it, true);

matcha.it("it title", function () {
  run = true;
});

assert.equalsValue(run, true);
assert.equalsValue(matcha.logs[0], "* it title");

console.log("> expect toBe (happy path)");

assert.equalsValue(!!matcha.expect, true);

matcha.logs.length = 0;

var result = matcha.expect(10).toBe(10);

assert.equalsValue(result, true);
assert.equalsValue(matcha.logs[0], "✅ 10 to be 10");

console.log("> expect toBe (unhappy path)");

assert.equalsValue(!!matcha.expect, true);

matcha.logs.length = 0;

var result = matcha.expect(10).toBe(20);

assert.equalsValue(result, false);
assert.equalsValue(matcha.logs[0], "❌ 10 to be 20");

console.log("> expect toBeInstanceOf (happy path)");

assert.equalsValue(!!matcha.expect, true);

matcha.logs.length = 0;

var d = new Date(2024, 0, 10);

var result = matcha.expect(d).toBeInstanceOf(Date);

assert.equalsValue(result, true);
assert.equalsValue(
  matcha.logs[0],
  "✅ Wed Jan 10 2024 00:00:00 GMT+0100 (hora estándar de Europa central) to be instance of Date"
);

console.log("> expect toBeInstanceOf (unhappy path)");

assert.equalsValue(!!matcha.expect, true);

matcha.logs.length = 0;

var d = new Date(2024, 0, 10);

var result = matcha.expect(d).toBeInstanceOf(Array);

assert.equalsValue(result, false);
assert.equalsValue(
  matcha.logs[0],
  "❌ Wed Jan 10 2024 00:00:00 GMT+0100 (hora estándar de Europa central) to be instance of Array"
);
