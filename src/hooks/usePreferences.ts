import useSWR from 'swr';
import axios from '../lib/axios';
import { csrf } from './csrf';
import toast from 'react-hot-toast';
import { SettingsFormFieldPayload } from '../types';

export const usePreferences = () => {
    const { data: options, isLoading: isLoadingOptions } = useSWR(
        '/api/preference_options',
        () =>
            axios
                .get('/api/preference_options')
                .then((res) => res.data)
                .catch((error) => {
                    if (error.response.status !== 409) throw error;
                }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        },
    );

    const {
        data: preferences,
        isLoading: isLoadingPreferences,
        mutate: mutatePreferences,
    } = useSWR(
        '/api/preferences',
        () =>
            axios
                .get('/api/preferences')
                .then((res) => res.data.preferences)
                .catch((error) => {
                    if (error.response.status !== 409) {
                        throw error;
                    }
                }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        },
    );

    const updatePreferences = async (payload: SettingsFormFieldPayload) => {
        await csrf();

        axios
            .post('/api/preferences', payload)
            .then((payload) => {
                mutatePreferences();
                toast.success('Preferences saved!', { icon: '🦄' });
            })
            .catch((error) => {
                if (error.response.status !== 422) {
                    throw error;
                }

                return {
                    errors: Object.values(error.response.data.errors).flat(),
                };
            });
    };

    return {
        options,
        preferences,
        isLoading: isLoadingPreferences || isLoadingOptions,
        isLoadingPreferences,
        isLoadingOptions,
        updatePreferences,
    };
};
