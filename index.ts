import { reduceEquation } from './src/reduction'

const readArguments = () => {
    const arg = process.argv
    if (process.argv.length < 3)
        console.log('Please specify file path')
    return arg[3]
}

const solve = () => {
    const solution = {
        equation: readArguments(),
        solutions: [],
        polynomialDegree: ''
    }
    let expression = solution.equation.replace(' ', '').toLowerCase()
    const reducedExpression = reduceEquation(expression)
    console.log(reducedExpression)
}

solve()