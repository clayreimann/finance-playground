import numeral from "numeral";


/**
 * Round a value as currency, i.e. to the penny.
 * @param {any} value the value to round
 * @returns a Numeral with the rounded value
 */
export function roundCurrency(value) {
    return numeral(numeral(value).format('0.00'))
}