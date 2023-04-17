import React, { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

export type FormErrorMessageProps = {
    children: ReactNode;
    className?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ children, className }) => (
    <p className={clsx('text-sm text-left block text-red-600 mt-2')}>{children}</p>
);
