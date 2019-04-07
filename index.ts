import { reduceEquation } from './src/reduction'

const readArguments = () => {
    const arg = process.argv
    if (process.argv.length < 3) {
        return null
    }
    return arg[2]
}

const solve = () => {
    const equation = readArguments()
    console.log(equation)
    if (!equation)
        return
    const solution = {
        equation,
        solutions: [],
        polynomialDegree: ''
    }
    let expression = solution.equation.replace(/ /g, '').toLowerCase()
    console.log(expression)
    const reducedExpression = reduceEquation(expression)
    console.log(reducedExpression)
}

solve()