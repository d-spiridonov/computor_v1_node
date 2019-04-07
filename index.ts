import { getParts, getReducedForm } from './src/reduction'

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
        reducedForm: '',
        polynomialDegree: ''
    }
    let expression = solution.equation.replace(/ /g, '').toLowerCase()
    const parts = getParts(expression)
    console.log(parts)
    solution.reducedForm = getReducedForm(parts)
    console.log(solution.reducedForm)
}

solve()