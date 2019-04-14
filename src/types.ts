export interface ITerm {
    num: number
    power: number
    sign: string
}

export type PartsType = 'first' | 'second'

export type IPart = {[P in PartsType]?: ITerm }
export interface IParts {
    first: ITerm[],
    second: ITerm[]
}

export interface IDiscriminant {
    a: ITerm
    b: ITerm
    c: ITerm
    disc: number
}

export interface ISolution {
    equation: string,
    solutions: string[]
    reducedForm: string
    msg: string
    polynomialDegree: number
}