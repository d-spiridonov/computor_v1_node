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
        reducedForm: '',
        polynomialDegree: ''
    };
    var expression = solution.equation.replace(/ /g, '').toLowerCase();
    var parts = reduction_1.getParts(expression);
    console.log(parts);
    solution.reducedForm = reduction_1.getReducedForm(parts);
    console.log(solution.reducedForm);
};
solve();
