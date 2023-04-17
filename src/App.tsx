import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage, RegisterPage, LoginPage, SettingsPage } from './pages';
import { AppLayout, AuthLayout } from './layouts';
import { Toaster } from 'react-hot-toast';
import ArticlePage from './pages/ArticlePage';

function App() {
    return (
        <div className='antialiased'>
            <Toaster position='top-right' />

            <Routes>
                <Route path='/news' element={<ArticlePage />} />
                <Route element={<AppLayout />}>
                    <Route path='/profile/news' element={<ArticlePage />} />
                    <Route path='/profile/settings' element={<SettingsPage />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
