'use client';
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import Sidebar from "./sidebar"

// Icons
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#000000',
        },
    },
});

interface DashboardContentProps {
    children: React.ReactNode;
    userName: string | null | undefined;
    userAvatar: string | null | undefined;
}

export default function Layout({ children, userAvatar, userName }: DashboardContentProps) {
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const verifyUser = async () => {
            const user_auth_token = localStorage.getItem('user_auth_token');
            const authFormData = new FormData();
            authFormData.append('user_auth_token', user_auth_token ?? '');
    
            try {
                const response = await fetch('http://localhost:8000/auth/verify-user', {
                    method: 'POST',
                    body: authFormData,
                });
                
                const data = await response.json();

                // console.log(response.status)
                // console.log(data.status, response.status)
                if (data.status === 'failed') {
                    window.location.href = '/register';
                } else if (!response.ok) {
                    window.alert('An unexpected error occurred.');
                }
            } catch (error) {
                if (error instanceof Error) {
                    window.alert(`Failed! ${error.message}`);
                    console.error('Error submitting form:', error);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };
    
        verifyUser();
    }, []);


    return (
        <>
            <ThemeProvider theme={theme}>

                <div className="flex w-full h-screen bg-gray-100">
                    <Sidebar open={open} />

                    <div className='flex w-full flex-col h-screen'>
                        {/* Navbar */}
                        <header className="bg-black">
                            <div className="px-4 sm:px-6 lg:px-8 h-12 flex justify-between items-center">
                                <button onClick={handleDrawerToggle} className="h-6 w-6 sm:block md:hidden ">
                                    <MenuIcon className="h-8 w-8" />
                                </button>
                                <h1 className="text-2xl font-semibold text-white">Global Health Ledger</h1>
                                <div className="flex items-center space-x-4">
                                    <span className="text-white">{userName}</span>
                                    <img className="h-8 w-8 rounded-full" src={userAvatar || undefined} alt={userName || 'User'} />
                                </div>
                            </div>
                        </header>
                        {/* Main content */}
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white-900 p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}