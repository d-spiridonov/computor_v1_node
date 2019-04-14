import { getParts, getReducedForm } from './src/reduction'
import { solveZeroDegreeEquation, solvePolynomialEquation } from './src/solve'
import { ITerm, ISolution } from './src/types'

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

const isExpressionValid = (terms: ITerm[]) => {
    let isExpressionValid = true
    isExpressionValid = !terms.find(term => 
        isNaN(term.num) || isNaN(term.power))
    return isExpressionValid
}

const getSolutions = (solutions: string[]): string|null => {
    if (!solutions.length) {
        return null
    } else if (solutions.length == 1) {
        return solutions[0]
    } else {
        return `${solutions[0]}\n${solutions[1]}`
    }
}

const printSolution = (solution: ISolution) => {
    const message = `Reduced form: ${solution.reducedForm}
Polynomial degree: ${solution.polynomialDegree}
${solution.msg}
${getSolutions(solution.solutions)}`
    console.log(message)
}

const solve = () => {
    const equation = readArguments()
    if (!equation) {
        console.warn('Please provide a valid equation')
        return
    }
    let solution = {
        equation,
        solutions: [],
        reducedForm: '',
        msg: '',
        polynomialDegree: 0,
    }
    let expression = solution.equation.replace(/ /g, '').toLowerCase()
    const terms = getParts(expression)

    if (!isExpressionValid(terms)) {
        console.warn('Invalid expression. I can\'t solve.')
        return
    }
    solution.reducedForm = getReducedForm(terms)
    solution.polynomialDegree = getPolynomialDegree(terms)
    if (solution.polynomialDegree > 2) {
        console.warn('I can\'t solve polynomial equations with degree higher than 2.')
    } else if (solution.polynomialDegree == 0) {
        solution.solutions = solveZeroDegreeEquation(terms)
    } else {
        solution = Object.assign(solution, solvePolynomialEquation(terms))
    }
    printSolution(solution)
}

solve()