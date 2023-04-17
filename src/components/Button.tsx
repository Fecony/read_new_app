import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export type ButtonProps = {
    children?: ReactNode;
    className?: string;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
};

export const Button = ({ children = 'Button', className, type = 'button', disabled = false }: ButtonProps) => (
    <button
        disabled={disabled}
        className={clsx(
            'inline-block rounded-md border px-4 py-2 bg-white font-medium text-gray-700 shadow-sm px hover:bg-gray-50 focus:relative  focus:outline-none focus:ring ring-gray-300 ring-offset-1',
            className,
        )}
    >
        {children}
    </button>
);
