import { NavigationItem } from './NavigationItem';
import { IconLogout, IconNews, IconSettings } from '@tabler/icons-react';
import React, { FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({}) => {
    const { user, logout } = useAuth({ middleware: 'auth' });

    const onLogout = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await logout();
    };

    return (
        <aside className='flex  h-screen w-16 flex-col justify-between border-r bg-white'>
            <div>
                <div className='inline-flex h-16 w-16 items-center justify-center'>
                    <img
                        className='grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600'
                        src={`https://ui-avatars.com/api/?name=${user.email}&background=random&length=1&size=64`}
                        alt=''
                    />
                </div>

                <div className='border-t border-gray-100'>
                    <nav aria-label='Main Nav' className='flex flex-col p-2'>
                        <div className='py-4'>
                            <NavigationItem to='/profile/settings'>
                                <IconSettings className='h-5 w-5 opacity-75' />
                            </NavigationItem>
                        </div>

                        <ul className='space-y-1 border-t border-gray-100 pt-4'>
                            <li>
                                <NavigationItem to='/profile/news'>
                                    <IconNews className='h-5 w-5 opacity-75' />
                                </NavigationItem>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className='sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2'>
                <form onSubmit={onLogout}>
                    <button
                        type='submit'
                        className='group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    >
                        <IconLogout className='h-5 w-5 opacity-75' />
                    </button>
                </form>
            </div>
        </aside>
    );
};
