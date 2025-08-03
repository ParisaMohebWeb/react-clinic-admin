import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * کامپوننت Sidebar برنامه
 * 
 * این کامپوننت شامل:
 * - منوی کناری با لینک‌های مختلف
 * - نمایش صفحه فعال
 * - اطلاعات نسخه سیستم
 * 
 * آیتم‌های منو:
 * - داشبورد
 * - مدیریت بیماران
 * - مدیریت پزشکان
 * - مدیریت نوبت‌ها
 * - تخصص‌های پزشکی
 * - برنامه‌های کاری
 * - گزارشات
 * - تنظیمات سیستم
 * 
 * @returns {JSX.Element} منوی کناری
 */
const Sidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'داشبورد', icon: '📊' },
        { path: '/patients', label: 'مدیریت بیماران', icon: '👥' },
        { path: '/doctors', label: 'مدیریت پزشکان', icon: '👨‍⚕️' },
        { path: '/appointments', label: 'مدیریت نوبت‌ها', icon: '📅' },
        { path: '/specialties', label: 'تخصص‌های پزشکی', icon: '🩺' },
        { path: '/schedules', label: 'برنامه‌های کاری', icon: '📋' },
        { path: '/reports', label: 'گزارشات', icon: '📈' },
        { path: '/settings', label: 'تنظیمات سیستم', icon: '⚙️' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h3>منوی مدیریت</h3>
            </div>

            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {
                        menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}>
                                    <span className="sidebar-icon">{item.icon}</span>
                                    <span className="sidebar-label">{item.label}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="system-info">
                    <small>نسخه ۱.۰.۰</small>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 