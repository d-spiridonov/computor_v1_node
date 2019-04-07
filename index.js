"use strict";
exports.__esModule = true;
var reduction_1 = require("./src/reduction");
var solve_1 = require("./src/solve");
var readArguments = function () {
    var arg = process.argv;
    if (process.argv.length < 3) {
        console.warn('Please provide arguments');
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
        msg: '',
        polynomialDegree: 0
    };
    var expression = solution.equation.replace(/ /g, '').toLowerCase();
    var terms = reduction_1.getParts(expression);
    solution.reducedForm = reduction_1.getReducedForm(terms);
    solution.polynomialDegree = getPolynomialDegree(terms);
    if (solution.polynomialDegree > 2) {
        console.warn('I can\'nt solve polynomial equations with degree higher than 3');
    }
    else if (solution.polynomialDegree == 0) {
        solve_1.solveZeroDegreeEquation(terms);
    }
    else {
        solution = Object.assign(solution, solve_1.solvePolynomialEquation(terms));
    }
    console.log(solution);
};
solve();
