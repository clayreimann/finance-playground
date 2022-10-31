import pkg from '../../../src/formulas/loan/payment-amount.js';
import expect from 'unexpected';
import numeral from 'numeral';

const { computePayment, default: compute2 } = pkg;

const asDollar = num => numeral(num).format('$0,0.00')
const asPct = num => numeral(num).format('0.000%')

const testCaseName = test => `${asDollar(test.amount).padStart(11)} @ ${asPct(test.apr)} for ${test.duration} = ${asDollar(test.payment).padStart(9)}`

describe('Payment Amount', function () {
    const cases = [
        { amount: 1_000, apr: 0.05, duration: 120, payment: 10.61 },
        { amount: 1_000, apr: 0.05, duration: 180, payment: 7.91 },
        { amount: 1_000, apr: 0.05, duration: 360, payment: 5.37 },

        { amount: 100_000, apr: 0.05, duration: 120, payment: 1060.66 },
        { amount: 100_000, apr: 0.05, duration: 180, payment: 790.79 },
        { amount: 100_000, apr: 0.05, duration: 360, payment: 536.82 },

        { amount: 500_000, apr: 0.05, duration: 120, payment: 5303.28 },
        { amount: 500_000, apr: 0.05, duration: 180, payment: 3953.97 },
        { amount: 500_000, apr: 0.05, duration: 360, payment: 2684.11 },
    ]

    describe('compute as number', function () {
        cases.forEach(function (test) {
            it(testCaseName(test), function () {
                expect(computePayment(test.amount, test.apr, test.duration), 'to equal', test.payment)
                expect(compute2(test.amount, test.apr, test.duration), 'to equal', test.payment)
            });
        })
    })

    describe('compute as numeral', function () {
        cases.forEach(function (test) {
            it(testCaseName(test), function () {
                const FMT = '$ 0.00'
                expect(computePayment(test.amount, test.apr, test.duration, true).format(FMT), 'to equal', numeral(test.payment).format(FMT))
            })
        })
    })
})