import { IconNews } from '@tabler/icons-react';
import { NavLink, To } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

export const NavigationItem = ({ to, children }: { to: To; children: ReactNode }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx([
                'group relative flex justify-center rounded px-2 py-1.5',
                isActive ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
            ])
        }
    >
        {children}
    </NavLink>
);
