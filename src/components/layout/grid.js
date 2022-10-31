import React from 'react';
import clsx from 'clsx';

export function Grid({ children, className }) {
    return (
        <div className={clsx('container', className)}>
            {children}
        </div>
    )
}

export function Row({ children, className }) {
    return (
        <div className={clsx('row', className)}>
            {children}
        </div>
    )
}

export function Col({ children, className, size }) {
    return (
        <div className={clsx('col', size && `col--${size}`, className)}>
            {children}
        </div>
    )
}