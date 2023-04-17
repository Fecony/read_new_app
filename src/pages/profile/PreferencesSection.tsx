import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Button } from '../../components/Button';
import React from 'react';
import { usePreferences } from '../../hooks/usePreferences';
import { Option, SettingsFormFields } from '../../types';

export const PreferencesSection = () => {
    const { options, isLoading, updatePreferences, preferences = {} } = usePreferences();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SettingsFormFields>();

    const onSubmit = handleSubmit(async ({ sources, categories, authors }: SettingsFormFields) => {
        const payload = {
            sources: sources.map((option) => option.value),
            categories: categories.map((option) => option.value),
            authors: authors.map((option) => option.value),
        };

        await updatePreferences(payload);
    });

    const sourcePreferences = options.sourceOptions.filter((option: Option) =>
        preferences?.sources?.includes(option.value),
    );
    const categoryPreferences = options.categoryOptions.filter((option: Option) =>
        preferences?.categories?.includes(option.value),
    );
    const authorPreferences = options.authorOptions.filter((option: Option) =>
        preferences?.authors?.includes(option.value),
    );

    return (
        <form onSubmit={onSubmit} className='mt-8 grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-2' aria-live='polite'>
                <label htmlFor='sources' className='block text-sm font-medium text-gray-700'>
                    Sources
                </label>

                <Controller
                    defaultValue={sourcePreferences}
                    name='sources'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select closeMenuOnSelect isMulti options={options.sourceOptions} {...field} />
                    )}
                />
            </div>

            <div className='col-span-6 sm:col-span-2' aria-live='polite'>
                <label htmlFor='sources' className='block text-sm font-medium text-gray-700'>
                    Categories
                </label>

                <Controller
                    defaultValue={categoryPreferences}
                    name='categories'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select closeMenuOnSelect isMulti options={options.categoryOptions} {...field} />
                    )}
                />
            </div>

            <div className='col-span-6 sm:col-span-2' aria-live='polite'>
                <label htmlFor='authors' className='block text-sm font-medium text-gray-700'>
                    Authors
                </label>

                <Controller
                    defaultValue={authorPreferences}
                    name='authors'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select closeMenuOnSelect isMulti options={options.authorOptions} {...field} />
                    )}
                />
            </div>

            <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <Button className='w-full sm:w-auto'>Save</Button>
            </div>
        </form>
    );
};
