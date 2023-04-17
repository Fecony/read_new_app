import React from 'react';
import { IconBrandNytimes } from '@tabler/icons-react';
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => (
    <section className='bg-white'>
        <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
            <aside className='relative block h-32 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6'>
                <img
                    alt='Pattern'
                    src='https://images.unsplash.com/photo-1635776062764-e025521e3df3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80'
                    className='inset absolute h-full w-full object-cover'
                />
            </aside>

            <main
                aria-label='Main'
                className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'
            >
                <div className='max-w-xl lg:max-w-3xl'>
                    <Link className='block text-gray-900' to='/'>
                        <span className='sr-only'>Home</span>
                        <IconBrandNytimes className='h-8 sm:h-10' />
                    </Link>

                    <h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
                        Welcome to News Portal
                    </h1>

                    <Outlet />
                </div>
            </main>
        </div>
    </section>
);

export default AuthLayout;
