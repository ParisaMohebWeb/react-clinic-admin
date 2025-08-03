import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

/**
 * کامپوننت اصلی برنامه
 * 
 * این کامپوننت شامل:
 * - تنظیمات Router
 * - تعریف مسیرهای مختلف برنامه
 * - استفاده از Layout برای تمام صفحات
 * 
 * مسیرهای موجود:
 * - /: داشبورد اصلی
 * - /patients: مدیریت بیماران
 * - /doctors: مدیریت پزشکان
 * - /appointments: مدیریت نوبت‌ها
 * - /specialties: تخصص‌های پزشکی
 * - /schedules: برنامه‌های کاری
 * - /reports: گزارشات
 * - /settings: تنظیمات
 * 
 * @returns {JSX.Element} ساختار اصلی برنامه
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="patients" element={<div>صفحه بیماران</div>} />
                    <Route path="doctors" element={<div>صفحه پزشکان</div>} />
                    <Route path="appointments" element={<div>صفحه نوبت‌ها</div>} />
                    <Route path="specialties" element={<div>صفحه تخصص‌ها</div>} />
                    <Route path="schedules" element={<div>صفحه برنامه‌ها</div>} />
                    <Route path="reports" element={<div>صفحه گزارشات</div>} />
                    <Route path="settings" element={<div>صفحه تنظیمات</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
