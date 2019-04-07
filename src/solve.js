"use strict";
exports.__esModule = true;
exports.solveZeroDegreeEquation = function (terms) {
    var sum = 0;
    terms.forEach(function (term) {
        sum = eval(sum + term.sign + term.num);
    });
    if (parseFloat(sum.toString()) === 0) {
        console.log('The solution is all real numbers');
    }
    else {
        console.log('There are no solutions');
    }
};
