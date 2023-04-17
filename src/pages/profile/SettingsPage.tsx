import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { usePreferences } from '../../hooks/usePreferences';
import { Loading } from '../../components/Loading';
import { PreferencesSection } from './PreferencesSection';

export const SettingsPage = () => {
    const { isLoading } = usePreferences();

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    }

    return (
        <main className='container mx-auto px-4 px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8'>
            <h2 className='text-3xl font-bold sm:text-4xl'>My Profile</h2>

            <Tabs className='flex flex-col flex-wrap mt-4  text-sm font-medium text-gray-500 space-x-2'>
                <TabList>
                    <Tab>Preferences</Tab>
                    <Tab disabled>Profile</Tab>
                </TabList>

                <TabPanel>
                    <div className='p-4 rounded-lg bg-gray-50'>
                        <p className='text-sm text-gray-500'>
                            <strong className='font-medium text-gray-800'>Welcome to your user preferences tab!</strong>{' '}
                            Customize your news feed by selecting your preferred sources, categories, and authors here.
                            Tailor your news feed to your interests and stay informed on what matters most to you.
                        </p>
                    </div>

                    <PreferencesSection />
                </TabPanel>

                <TabPanel>Profile page</TabPanel>
            </Tabs>
        </main>
    );
};
