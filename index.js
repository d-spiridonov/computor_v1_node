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
var getPolynomialDegree = function (terms) {
    var power = terms[0].power;
    terms.forEach(function (term) {
        if (power < term.power)
            power = term.power;
    });
    return power;
};
var solve = function () {
    var equation = readArguments();
    if (!equation)
        return;
    var solution = {
        equation: equation,
        solutions: [],
        reducedForm: '',
        polynomialDegree: 0
    };
    var expression = solution.equation.replace(/ /g, '').toLowerCase();
    var terms = reduction_1.getParts(expression);
    solution.reducedForm = reduction_1.getReducedForm(terms);
    solution.polynomialDegree = getPolynomialDegree(terms);
    console.log(solution.polynomialDegree);
};
solve();
