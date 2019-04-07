import { getParts, getReducedForm } from './src/reduction'
import { solveZeroDegreeEquation } from './src/solve'
import { ITerm } from './src/types'

const readArguments = () => {
    const arg = process.argv
    if (process.argv.length < 3) {
        console.warn('Please provide arguments')
        return null
    }
    return arg[2]
}

const getPolynomialDegree = (terms: ITerm[]): number => {
    let power = terms[0].power
    terms.forEach(term => {
        if (power < term.power)
            power = term.power
    })
    return power
}

const solve = () => {
    const equation = readArguments()
    if (!equation)
        return
    const solution = {
        equation,
        solutions: [],
        reducedForm: '',
        polynomialDegree: 0,
    }
    let expression = solution.equation.replace(/ /g, '').toLowerCase()
    const terms = getParts(expression)
    solution.reducedForm = getReducedForm(terms)
    solution.polynomialDegree = getPolynomialDegree(terms)
    if (solution.polynomialDegree > 2) {
        console.warn('I can\'nt solve polynomial equations with degree higher than 3')
    } else if (solution.polynomialDegree == 0) {
        solveZeroDegreeEquation(terms)
    }
}

solve()