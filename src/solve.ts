import { ITerm } from "./types";

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