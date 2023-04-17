import React, { FormEvent } from 'react';
import { IconLogout, IconNews, IconSettings } from '@tabler/icons-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/Loading';
import { NavigationItem } from '../components/navigation/NavigationItem';
import { Sidebar } from '../components/navigation/Sidebar';

const AppLayout = () => {
    const { isLoadingUser } = useAuth({ middleware: 'auth' });

    if (isLoadingUser) {
        return <Loading isLoading={isLoadingUser} />;
    }

    return (
        <div className='flex flex-row'>
            <Sidebar />

            <Outlet />
        </div>
    );
};

export default AppLayout;
