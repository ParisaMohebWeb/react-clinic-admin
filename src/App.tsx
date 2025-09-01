import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Specialties from './pages/Specialties';
import Doctor from './pages/Doctor';
import Patients from './pages/Patients';
import Schedules from './pages/Schedules';
import Appointments from './pages/Appointments';


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
    <>
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="patients" element={<Patients/>} />
                    <Route path="doctors" element={<Doctor/>} />
                    <Route path="appointments" element={<Appointments/>} />
                    <Route path="specialties" element={<Specialties/>} />
                    <Route path="schedules" element={<Schedules/>} />
                    <Route path="reports" element={<div>صفحه گزارشات</div>} />
                    <Route path="settings" element={<div>صفحه تنظیمات</div>} />
                </Route>
            </Routes>
        </Router>
        <ToastContainer/>
    </>
    );
}

export default App;
