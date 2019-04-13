import { ITerm, PartsType, IParts } from './types'

/**
 * split expression into separate terms
 * @param expression 
 * @param parts 
 */
const convertToTerms = (expression: string, parts: IParts, part: PartsType = 'first'): IParts => {
    let res: ITerm = {
        num: 0,
        power: 0,
        sign: ''
    } 

    if (expression[0] === '-') {
        res.sign = '-'
        expression = expression.substring(1)
    } else if (expression[0] === '+') {
        res.sign = ''
        expression = expression.substring(1)
    }
    res.num = parseFloat(expression.substring(0, expression.indexOf('*')))
    expression = expression.substring(expression.indexOf('*'))
    const indexOfPower = expression.indexOf('^')
    res.power = parseInt(expression.substring(indexOfPower + 1, indexOfPower + 2))
    expression = expression.substring(indexOfPower + 2)
    parts[part].push(res)

    if (expression) {
        if (expression[0] === '=') {
            part = 'second'
            expression = expression.substring(1)
        }
        if (expression.length > 1) {
            convertToTerms(expression, parts, part)
        }
    }
    return parts
}

const checkIfAddedIncludesPart = (added: ITerm[], part: ITerm) => {
    let wasAdded = false
    added.forEach(addedPart => {
        if (JSON.stringify(addedPart) === JSON.stringify(part)) {
            wasAdded = true
        }
    })
    return wasAdded
}

const simplify = (parts: IParts) => {
    const added: ITerm[] = []
    for (let i = 0; i < parts.second.length; i++) {
        for (let i2 = 0; i2 < parts.first.length; i2++) {
            if (parts.first[i2].power == parts.second[i].power) {
                parts.second[i].sign = parts.second[i].sign == '-' ? '' : '-'
                if (parts.first[i2].num === undefined || !parts.second[i].num === undefined) return
                parts.first[i2].num = eval(parts.first[i2].num + '+' + parts.second[i].sign + parts.second[i].num.toString())
                added.push(parts.second[i])
                break
            }
        }
    }
    for (let i = 0; i < parts.second.length; i++) {
        if (!checkIfAddedIncludesPart(added, parts.second[i])) {
            parts.second[i].sign = parts.second[i].sign == '' ? '-' : ''
            parts.first.push(parts.second[i])
        }
    }
    return parts.first
} 

/**
 * get reduced form of the expression
 * @param expression 
 */

export const getReducedForm = (expression: ITerm[]): string => {
    let reducedForm = ''
    expression.forEach(part => {
        const sign = part.sign == '' ? '+' : '-'
        if (reducedForm.length > 0)
            reducedForm = reducedForm + sign + ' ' + part.num.toFixed(0) + ' * X^' + part.power.toString() + ' '
        else {
            const minusSign = sign == '+' ? '' : '-'
            reducedForm = minusSign + part.num.toFixed(0) + ' * X^' + part.power.toString() + ' '
        }
    })
    return reducedForm + '= 0'
}


/**
 * get an array of equation parts
 * @param expression 
 */
export const getParts = (expression: string): any => { // simplify the equation and return parts
    let parts: IParts = {
        first: [],
        second: []
    }
    parts = convertToTerms(expression, parts)
    return simplify(parts)
}