"use strict";
exports.__esModule = true;
var reduction_1 = require("./src/reduction");
var readArguments = function () {
    var arg = process.argv;
    console.log(process.argv.length);
    if (process.argv.length < 3)
        console.log('Please specify file path');
    return arg[3];
};
var solve = function () {
    console.log('test');
    var solution = {
        equation: readArguments(),
        solutions: [],
        polynomialDegree: ''
    };
    var expression = solution.equation.replace(' ', '').toLowerCase();
    var reducedExpression = reduction_1.reduceEquation(expression);
    console.log(reducedExpression);
};
solve();
