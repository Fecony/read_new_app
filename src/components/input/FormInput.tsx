import React, { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { RegisterOptions, DeepMap, FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormErrorMessage } from './FormErrorMessage';

export type InputType = 'text' | 'email' | 'password';

export type FormInputProps<TFormValues extends FieldValues> = {
    id: string;
    name: Path<TFormValues>;
    label: string;
    type?: InputType;
    rules?: RegisterOptions;
    register: UseFormRegister<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
    className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'name' | 'size'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
    id,
    name,
    label,
    type = 'text',
    rules,
    register,
    errors,
    className = '',
    placeholder,
    ...props
}: FormInputProps<TFormValues>): JSX.Element => {
    const errorMessages = errors && errors[name];
    const hasError = !!(errors && errorMessages);

    return (
        <div className={clsx('', className)} aria-live='polite'>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
                {label}
            </label>

            <input
                id={id}
                {...register(name, rules)}
                name={name}
                type={type}
                aria-label={label}
                placeholder={placeholder}
                className={clsx(
                    'mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm',
                    hasError &&
                        'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600',
                )}
                {...props}
            />

            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>}
            />
        </div>
    );
};
