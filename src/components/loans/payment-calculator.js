import React, { useState } from 'react';
import numeral from 'numeral';
import { Grid, Row, Col } from '@site/src/components/layout/grid';
import { computePayment } from '../../formulas/loan/payment-amount.js';

import styles from './payment-calculator.module.scss'


const MONEY_FMT = '$ 0,000.00'
const truncate = str => parseFloat(str).toFixed(3)

const Label = ({ children }) => (
    <div className={styles.label}>{children}</div>
)

export default function PaymentCalculator({initialPrice = 100_000, initialDownpayment = 20_000}) {
    const [price, setPrice] = useState(numeral(initialPrice).format(MONEY_FMT));
    const [downpayment, setDownpayment] = useState(numeral(initialDownpayment).format(MONEY_FMT));
    const [apr, setApr] = useState('5.000 %');
    const [months, setMonths] = useState(360);

    const _price = numeral(price)
    const _downPayment = numeral(downpayment)
    const _apr = numeral(apr)
    const _loanAmount = numeral(_price.value() - _downPayment.value())
    const _monthlyPayment = computePayment(_loanAmount.value(), _apr.value(), months, true)
    const _totalPayments = numeral(_monthlyPayment.value() * months)
    const _totalCost = numeral(_totalPayments.value() - _loanAmount.value())
    
    return (
        <form className={styles.main}>
            <Grid>
                <Row>
                    <Col>Price</Col>
                    <Col><input value={price}
                        onChange={e => setPrice(e.target.value)}
                        onBlur={e => setPrice(numeral(e.target.value).format(MONEY_FMT))} />
                    </Col>
                </Row>
                <Row>
                    <Col>Down payment</Col>
                    <Col><input value={downpayment}
                        onChange={e => setDownpayment(e.target.value)}
                        onBlur={e => setDownpayment(numeral(e.target.value).format(MONEY_FMT))} />
                    </Col>
                </Row>
                <Row>
                    <Col>Loan Amount</Col>
                    <Col>
                        <input value={_loanAmount.format(MONEY_FMT)} disabled />
                    </Col>
                </Row>
                <Row>
                    <Col>Loan to Value</Col>
                    <Col><input value={ numeral(_loanAmount.value() / _price.value()).format('0 %') } disabled /></Col>
                </Row>
                <Row>
                    <Col>Interest Rate (APR)</Col>
                    <Col>
                        <input value={apr} 
                        onChange={e => setApr(e.target.value)}
                        onBlur={e => setApr(numeral(e.target.value).format('0.000 %'))} />
                    </Col>
                </Row>
                <Row>
                    <Col>Months</Col>
                    <Col>
                        <input value={months} onChange={e => setMonths(numeral(e.target.value).value())} />
                        <Label>({Math.floor(months / 12)} years, {months % 12} months)</Label>
                    </Col>
                </Row>
                <Row>
                    <Col><b>Payment</b></Col>
                    <Col><input value={_monthlyPayment.format(MONEY_FMT)} disabled /></Col>
                </Row>
                <Row>
                    <Col><b>Total Repaid</b></Col>
                    <Col><input value={_totalPayments.format(MONEY_FMT)} disabled /></Col>
                </Row>
                <Row>
                    <Col><b>Total Cost</b></Col>
                    <Col><input value={_totalCost.format(MONEY_FMT)} disabled /></Col>
                </Row>
            </Grid>
        </form >
    )
}