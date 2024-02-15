var a = ["initial"];

var dict = {
  pos: 0,
  name: a,
  time: 10,
};

var f2 = function () {
  a.push("added");
  return ["one", "two", ["three", dict]];
};

var f3 = function () {
  dict.pos += 5;
  dict.time *= 2;
};

var f1 = function () {
  a = ["changed"];
  f3();
  return [
    [
      1,
      {
        first: function () {
          return f2();
        },
      },
    ],
  ];
};
