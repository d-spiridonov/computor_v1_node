import { ITerm, IDiscriminant } from "./types";

export const solveZeroDegreeEquation = (terms: ITerm[]) => {
    let sum = 0
    terms.forEach(term => {
        sum = eval(sum + term.sign + term.num)
    })
    if (parseFloat(sum.toString()) === 0) {
        console.log('The solution is all real numbers')
    } else {
        console.log('There are no solutions')
    }
}

/**
 * find the discriminant using D = b2 - 4ac formula
 * @param terms 
 */
const findDiscriminant = (terms: ITerm[]): IDiscriminant|undefined => {
    let a: ITerm|undefined
    let b: ITerm|undefined
    let c: ITerm|undefined
    terms.forEach(term => {
        if (term.power === 0) {
            c = term
        } else if (term.power === 1) {
            b = term
        } else if (term.power === 2) {
            a = term
        }
    })
    if (!a || !b || !c) return
    // find out b2
    const b2 = eval(b.sign + b.num.toString() + '*' + b.sign + b.num.toString())
    // b2 - 4ac
    const discriminant = eval(b2.toString() + '-4' + '*' + a.sign + a.num.toString() + '*' + c.sign + c.num.toString())
    return {
        a, b, c, disc: discriminant
    }
}

const countRoot = (disc: number) => (disc ** 0.5).toFixed(6)

/**
 * find roots for solving quadratic equation
 * x = (-b sign count_root(D)) / (2a)
 * @param discriminant 
 * @param sign 
 */
const findRootsForQuadraticEquation = (discriminant: IDiscriminant, sign: string = '+') => {
    const twoA = eval(discriminant.a.sign + discriminant.a.num.toString()) * 2
    discriminant.b.sign = discriminant.b.sign == '' ? '-' : ''
    const discRoot = countRoot(discriminant.disc)
    const resUp = eval('(' + discriminant.b.sign + discriminant.b.num.toString() + sign + discRoot.toString() + ')')
    const res = resUp / twoA
    return parseFloat(res.toFixed(6).toString())
}

export const solvePolynomialEquation = (terms: ITerm[]) => {
    const discriminant = findDiscriminant(terms)
    if (!discriminant) return

    // if discriminant > 0, there are 2 solutions
    if (discriminant.disc > 0) {
        const solutions = [
            findRootsForQuadraticEquation(discriminant, '-'),
            findRootsForQuadraticEquation(discriminant)
        ]
        return {
            msg: 'Discriminant is strictly positive, the two solutions are:',
            solutions
        }
    } else if (discriminant.disc == 0) { // there is only 1 solution
        const solutions = [findRootsForQuadraticEquation(discriminant)]
        return {
            msg: 'Discriminant equals zero, the one solution is:',
            solutions
        }
    } else { // if disc < 0, there are no solutiosn
        const solutions = [
            findRootsForQuadraticEquation(discriminant, '-'),
            findRootsForQuadraticEquation(discriminant)
        ]
        return {
            msg: 'Discriminant is strictly negative, there are two complex solutions found.',
            solutions
        }
    }
}