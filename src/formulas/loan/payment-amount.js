import numeral from "numeral";

/**
 * Compute the payment amount for a loan.
 * @param {number} value the loan amount
 * @param {number} apr the loan APR
 * @param {number} periods the number of months for the loan
 * @returns the monthly payment amount
 */
function PaymentAmount(value, apr, periods, asNumeral = false) {
    const periodicRate = apr / 12
    const rounded = numeral((periodicRate * value) / (1 - Math.pow((1 + periodicRate), -1 * periods))).format('$0,000.00')
    return asNumeral ? numeral(rounded) : numeral(rounded).value();
}

export const computePayment = PaymentAmount;

export default PaymentAmount;