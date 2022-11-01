import React from 'react';
import numeral from 'numeral';

export const MONEY_FMT = '$ 0,000.00'

export const PCT_FMT = '0.000 %'


export function CurrencyInput({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={e => onChange(numeral(e.target.value).format(MONEY_FMT))} />
    );
}

/**
 * Ensure a percent sign is in the input
 * @param {string} input the updated value
 * @returns the value ensuring that a percentage sign is present
 */
const ensurePercent = input => input.includes('%') ? input : input + ' %';

/**
 * Render a formatted percentage
 * @param {object} props
 * @param {string} props.value the percentage to display
 * @param {function} props.onChange the callback used to update the value
 * @returns the react component
 */
export function PercentageInput({ value, onChange }) {
    return (
        <input value={value}
            onChange={e => onChange(ensurePercent(e.target.value))}
            onBlur={e => onChange(numeral(ensurePercent(e.target.value)).format(PCT_FMT))} />
    );
}

export function DurationInput({ months, onChange }) {
    return (
        <input value={months} onChange={e => onChange(e.target.value)} />
    )
}

/**
 * Display a readonly value.
 * @param {object} props
 * @param {numeral.Numeral} props.value the value to display
 * @param {string} [props.format] the format string for value
 * @param {boolean} [props.money] if the input should be formatted as currency
 * @param {boolean} [props.perc] if the input should be formatted as a percentage
 */
export function DisplayInput({ value, format, money, perc }) {
    let fmt = format;
    if (money) {
        fmt = MONEY_FMT
    } else if (perc) {
        fmt = PCT_FMT
    }
    return (
        <input value={value.format(fmt)}  disabled />
    )
}