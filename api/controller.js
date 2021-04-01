exports.getCode = (req, res) => {
    var code = [
      "function main(in: ) out: no {",
      "int a = 3;",
      "int b = 4;",
      "int sum = a + b;",
      "print(sum);",
      "}",
    ];
    console.log(code);
    res.json({
        "code": code
    });
}