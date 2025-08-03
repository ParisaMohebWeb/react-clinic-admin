import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import Footer from './Footer.tsx';

/**
 * کامپوننت Layout اصلی برنامه
 * 
 * این کامپوننت چیدمان کلی برنامه را تعریف می‌کند و شامل:
 * - Header: هدر با منوی ناوبری
 * - Sidebar: منوی کناری
 * - Main Content: محتوای اصلی (با استفاده از Outlet)
 * - Footer: فوتر
 * 
 * @returns {JSX.Element} چیدمان کامل برنامه
 */
const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Header />
            <div className="main-container">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout; 