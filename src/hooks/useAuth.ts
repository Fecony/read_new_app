import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import { csrf } from './csrf';
import toast from 'react-hot-toast';
import { LoginFormFields, RegistrationFormFields } from '../types';

type AuthProps = { middleware?: 'auth' | 'guest'; redirectIfAuthenticated?: string };

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
    const navigate = useNavigate();

    const {
        data: user,
        error,
        isLoading: isLoadingUser,
        mutate,
    } = useSWR(
        '/api/user',
        () =>
            axios
                .get('/api/user')
                .then((res) => res.data)
                .catch((error) => {
                    if (error.response?.status !== 409) throw error;
                }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        },
    );

    const register = async (payload: RegistrationFormFields) => {
        await csrf();

        axios
            .post('/register', payload)
            .then(() => {
                toast.success('Welcome!', { icon: '🦄' });
                mutate();
            })
            .catch((error) => {
                if (error?.message) {
                    toast.error(`Something went wrong: ${error?.response?.data?.message}`, { icon: '⚠️' });
                } else {
                    toast.error("Something went wrong: can't register...", { icon: '⚠️' });
                }

                if (error.response?.status !== 422) throw error;

                // return {
                //     errors: Object.values(error.response.data.errors).flat(),
                // };
            });
    };

    const login = async (payload: LoginFormFields) => {
        await csrf();

        axios
            .post('/login', payload)
            .then(() => mutate())
            .catch((error) => {
                toast.error("Something went wrong: can't login...", { icon: '⚠️' });

                if (error.response.status !== 422) {
                    throw error;
                }

                // setErrors(Object.values(error.response.data.errors).flat());
            });
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate());
        }

        window.location.pathname = '/login';
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) navigate(redirectIfAuthenticated);
        if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return {
        user,
        register,
        login,
        logout,
        isLoadingUser,
    };
};
