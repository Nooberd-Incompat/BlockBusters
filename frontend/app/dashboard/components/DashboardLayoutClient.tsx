'use client';
import React, { useState } from 'react';
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