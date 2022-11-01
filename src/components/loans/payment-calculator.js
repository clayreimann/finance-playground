import React, { useState } from 'react';
import numeral from 'numeral';
import { Grid, Row, Col } from '@site/src/components/layout/grid';
import { computePayment } from '../../formulas/loan/payment-amount.js';

import styles from './payment-calculator.module.scss'
import { CurrencyInput, DisplayInput, DurationInput, PercentageInput } from '../form/inputs.js';


const MONEY_FMT = '$ 0,000.00'
const truncate = str => parseFloat(str).toFixed(3)

const Label = ({ children }) => (
    <div className={styles.label}>{children}</div>
)

export default function PaymentCalculator({ initialPrice = 100_000, initialDownpayment = 20_000 }) {
    const [price, setPrice] = useState(numeral(initialPrice).format(MONEY_FMT));
    const [downPayment, setDownPayment] = useState(numeral(initialDownpayment).format(MONEY_FMT));
    const [apr, setApr] = useState('5.000 %');
    const [months, setMonths] = useState(360);

    const _price = numeral(price)
    const _downPayment = numeral(downPayment)
    const _apr = numeral(apr)
    const _loanAmount = numeral(_price.value() - _downPayment.value())
    const _loanToValue = numeral(_loanAmount.value() / _price.value())
    const _monthlyPayment = computePayment(_loanAmount.value(), _apr.value(), months, true)
    const _totalPayments = numeral(_monthlyPayment.value() * months)
    const _totalCost = numeral(_totalPayments.value() - _loanAmount.value())

    return (
        <form className={styles.main}>
            <Grid>
                <Row>
                    <Col>Price</Col>
                    <Col><CurrencyInput value={price} onChange={setPrice} /></Col>
                </Row>
                <Row>
                    <Col>Down payment</Col>
                    <Col><CurrencyInput value={downPayment} onChange={setDownPayment} /></Col>
                </Row>
                <Row>
                    <Col>Loan Amount</Col>
                    <Col><input value={_loanAmount.format(MONEY_FMT)} disabled /></Col>
                </Row>
                <Row>
                    <Col>Loan to Value</Col>
                    <Col><DisplayInput value={_loanToValue} format='0 %' /></Col>
                </Row>
                <Row>
                    <Col>Interest Rate (APR)</Col>
                    <Col><PercentageInput value={apr} onChange={setApr} /></Col>
                </Row>
                <Row>
                    <Col>Months</Col>
                    <Col>
                        <DurationInput months={months} onChange={setMonths} />
                        <Label>({Math.floor(months / 12)} years, {months % 12} months)</Label>
                    </Col>
                </Row>
                <Row>
                    <Col><b>Payment</b></Col>
                    <Col><DisplayInput value={_monthlyPayment} money /></Col>
                </Row>
                <Row>
                    <Col><b>Total Repaid</b></Col>
                    <Col><DisplayInput value={_totalPayments} money /></Col>
                </Row>
                <Row>
                    <Col><b>Total Cost</b></Col>
                    <Col><DisplayInput value={_totalCost} money /></Col>
                </Row>
            </Grid>
        </form >
    )
}