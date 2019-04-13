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
/**
 * find the discriminant using D = b2 - 4ac formula
 * @param terms
 */
var findDiscriminant = function (terms) {
    var a;
    var b;
    var c;
    terms.forEach(function (term) {
        if (term.power === 0) {
            c = term;
        }
        else if (term.power === 1) {
            b = term;
        }
        else if (term.power === 2) {
            a = term;
        }
    });
    if (!a || !b || !c)
        return;
    // find out b2
    var b2 = eval(b.sign + b.num.toString() + '*' + b.sign + b.num.toString());
    // b2 - 4ac
    var discriminant = eval(b2.toString() + '-4' + '*' + a.sign + a.num.toString() + '*' + c.sign + c.num.toString());
    return {
        a: a, b: b, c: c, disc: discriminant
    };
};
var countRoot = function (disc) { return parseFloat((Math.pow(disc, 0.5)).toFixed(6)); };
/**
 * find roots for solving quadratic equation
 * x = (-b sign count_root(D)) / (2a)
 * @param discriminant
 * @param sign
 */
var findRootsForQuadraticEquation = function (discriminant, sign) {
    if (sign === void 0) { sign = '+'; }
    var twoA = eval(discriminant.a.sign + discriminant.a.num.toString()) * 2;
    discriminant.b.sign = discriminant.b.sign == '' ? '-' : '';
    var discRoot = countRoot(discriminant.disc);
    var resUp = eval('(' + discriminant.b.sign + discriminant.b.num.toString() + sign + discRoot.toString() + ')');
    var res = resUp / twoA;
    return parseFloat(res.toFixed(6).toString());
};
var findRootsForQuadraticEquationComplex = function (discriminant, sign) {
    if (sign === void 0) { sign = '+'; }
    var twoA = eval(discriminant.a.sign + discriminant.a.num.toString()) * 2;
    discriminant.b.sign = discriminant.b.sign == '' ? '-' : '';
    var discRoot = countRoot(discriminant.disc * -1);
    var resUp = eval(discriminant.b.sign + discriminant.b.num.toString());
    var first = resUp / twoA;
    var second = discRoot / twoA;
    return first + ' ' + sign + ' i * ' + second;
};
exports.solvePolynomialEquation = function (terms) {
    var discriminant = findDiscriminant(terms);
    if (!discriminant)
        return;
    // if discriminant > 0, there are 2 solutions
    if (discriminant.disc > 0) {
        var solutions = [
            // create a copy fo the object
            findRootsForQuadraticEquation(JSON.parse(JSON.stringify(discriminant)), '-'),
            findRootsForQuadraticEquation(JSON.parse(JSON.stringify(discriminant))),
        ];
        return {
            msg: 'Discriminant is strictly positive, the two solutions are:',
            solutions: solutions
        };
    }
    else if (discriminant.disc == 0) { // there is only 1 solution
        var solutions = [findRootsForQuadraticEquation(discriminant)];
        return {
            msg: 'Discriminant equals zero, the one solution is:',
            solutions: solutions
        };
    }
    else { // if disc < 0, there are no solutions
        var solutions = [
            findRootsForQuadraticEquationComplex(discriminant),
            findRootsForQuadraticEquationComplex(discriminant, '-')
        ];
        return {
            msg: 'Discriminant is strictly negative, there are two complex solutions found.',
            solutions: solutions
        };
    }
};
