import { reduceEquation } from './src/reduction'

const readArguments = () => {
    const arg = process.argv
    console.log(process.argv.length)
    if (process.argv.length < 3) {
        console.log('Please specify file path')
        process.exit()
    }
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