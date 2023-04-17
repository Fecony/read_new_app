import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '../components/input/FormInput';
import { emailPattern } from './RegisterPage';
import { useAuth } from '../hooks/useAuth';
import { LoginFormFields } from '../types';

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormFields>();

    const { login: loginMutation } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/profile/settings',
    });

    const onSubmit = handleSubmit((data) => {
        loginMutation(data);
    });

    return (
        <form onSubmit={onSubmit} className='mt-8 grid grid-cols-6 gap-6'>
            <FormInput<LoginFormFields>
                id='email'
                type='email'
                name='email'
                label='Email'
                placeholder='Email Address'
                className='col-span-6 sm:col-span-3'
                register={register}
                rules={{
                    required: 'You must enter your email address.',
                    pattern: emailPattern,
                }}
                errors={errors}
            />

            <FormInput<LoginFormFields>
                id='password'
                type='password'
                name='password'
                label='Password'
                placeholder='Password'
                className='col-span-6 sm:col-span-3'
                register={register}
                rules={{
                    required: 'You must enter password',
                }}
                errors={errors}
            />

            <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <Button className='w-full sm:w-auto'>Login</Button>

                <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
                    Don't have an account? {` `}
                    <Link to='/register' className='text-gray-700 underline'>
                        Create an account
                    </Link>
                </p>
            </div>
        </form>
    );
};
