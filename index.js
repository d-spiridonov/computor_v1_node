"use strict";
exports.__esModule = true;
var reduction_1 = require("./src/reduction");
var readArguments = function () {
    var arg = process.argv;
    if (process.argv.length < 3) {
        return null;
    }
    return arg[2];
};
var solve = function () {
    var equation = readArguments();
    console.log(equation);
    if (!equation)
        return;
    var solution = {
        equation: equation,
        solutions: [],
        polynomialDegree: ''
    };
    var expression = solution.equation.replace(/ /g, '').toLowerCase();
    console.log(expression);
    var reducedExpression = reduction_1.reduceEquation(expression);
    console.log(reducedExpression);
};
solve();
