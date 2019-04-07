interface ITerm {
    num?: number
    power?: number
    sign?: string
}

type PartsType = 'first' | 'second'

type IPart = {[P in PartsType]?: ITerm }
interface IParts {
    first: ITerm[],
    second: ITerm[]
}

/**
 * split expression into separate terms
 * @param expression 
 * @param parts 
 */
const convertToTerms = (expression: string, parts: IParts, part: PartsType = 'first'): IParts => {
    let res: ITerm = {} 

    if (expression[0] === '-') {
        res.sign = '-'
        expression = expression.substring(1)
    } else if (expression[0] === '+') {
        res.sign = '+'
        expression = expression.substring(1)
    }
    res.num = parseFloat(expression.substring(0, expression.indexOf('*')))
    expression = expression.substring(expression.indexOf('*'))
    const indexOfPower = expression.indexOf('^')
    res.power = parseInt(expression.substring(indexOfPower + 1, indexOfPower + 2))
    expression = expression.substring(indexOfPower + 2)
    parts[part].push(res)
    return parts
}

// const convertToTerms(exp: string, parts)

const simplify = (expression: string) => { // simplify the equation and return parts
    let parts: IParts = {
        first: [],
        second: []
    }
    parts = convertToTerms(expression, parts)
}