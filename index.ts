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
    expression = simplify(expression)
}