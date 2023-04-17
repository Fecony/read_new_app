import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '../components/input/FormInput';
import { useAuth } from '../hooks/useAuth';
import { RegistrationFormFields } from '../types';

export const emailPattern = {
    value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$', 'ig'),
    message: 'Enter a valid email address.',
};

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
        watch,
    } = useForm<RegistrationFormFields>();
    const password = useRef({});
    password.current = watch('password', '');

    const { register: registerMutation } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/profile/settings',
    });

    const onSubmit = handleSubmit(async (data) => {
        clearErrors();
        await registerMutation(data);
    });

    return (
        <form onSubmit={onSubmit} className='mt-8 grid grid-cols-6 gap-6'>
            <FormInput<RegistrationFormFields>
                id='email'
                type='email'
                name='email'
                label='Email'
                placeholder='Email Address'
                className='col-span-6'
                register={register}
                rules={{
                    required: 'You must enter your email address.',
                    pattern: emailPattern,
                }}
                errors={errors}
            />

            <FormInput<RegistrationFormFields>
                id='password'
                type='password'
                name='password'
                label='Password'
                placeholder='Password'
                className='col-span-6 sm:col-span-3'
                register={register}
                rules={{
                    required: 'You must enter password',
                    minLength: 6,
                }}
                errors={errors}
            />

            <FormInput<RegistrationFormFields>
                id='password_confirmation'
                type='password'
                name='password_confirmation'
                label='Password Confirmation'
                placeholder='Password Confirmation'
                className='col-span-6 sm:col-span-3'
                register={register}
                rules={{
                    required: 'You must confirm password',
                    minLength: 6,
                    validate: (value) => value === password.current || 'The passwords do not match',
                }}
                errors={errors}
            />

            <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <Button className='w-full sm:w-auto'>Create an account</Button>

                <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
                    Already have an account? {` `}
                    <Link to='/login' className='text-gray-700 underline'>
                        Log in
                    </Link>
                </p>
            </div>
        </form>
    );
};
