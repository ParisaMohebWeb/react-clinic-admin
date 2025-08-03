import React from 'react';

/**
 * صفحه اصلی داشبورد
 * 
 * این صفحه شامل:
 * - آمار کلی کلینیک (تعداد بیماران، نوبت‌ها، پزشکان، درآمد)
 * - لیست نوبت‌های اخیر
 * - فعالیت‌های امروز
 * 
 * داده‌های نمایش داده شده فعلاً نمونه هستند و باید از API دریافت شوند.
 * 
 * @returns {JSX.Element} صفحه داشبورد
 */
const Dashboard: React.FC = () => {
    // آمار کلی کلینیک
    const stats = [
        { title: 'کل بیماران', value: '۱,۲۳۴', icon: '👥', color: 'blue' },
        { title: 'نوبت‌های امروز', value: '۴۵', icon: '📅', color: 'green' },
        { title: 'پزشکان فعال', value: '۱۲', icon: '👨‍⚕️', color: 'purple' },
        { title: 'درآمد ماهانه', value: '۱۲,۵۰۰,۰۰۰ تومان', icon: '💰', color: 'orange' },
    ];

    // نوبت‌های اخیر (نمونه)
    const recentAppointments = [
        { id: 1, patient: 'احمد محمدی', doctor: 'دکتر رضایی', time: '۱۰:۰۰', status: 'تایید شده' },
        { id: 2, patient: 'فاطمه احمدی', doctor: 'دکتر کریمی', time: '۱۱:۳۰', status: 'در انتظار' },
        { id: 3, patient: 'علی حسینی', doctor: 'دکتر نوری', time: '۱۴:۰۰', status: 'تایید شده' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>داشبورد</h1>
                <p>خوش آمدید به سیستم مدیریت کلینیک</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card stat-${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <h3>{stat.title}</h3>
                            <p className="stat-value">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="content-grid">
                    <div className="content-card">
                        <h3>نوبت‌های اخیر</h3>
                        <div className="appointments-list">
                            {recentAppointments.map((appointment) => (
                                <div key={appointment.id} className="appointment-item">
                                    <div className="appointment-info">
                                        <h4>{appointment.patient}</h4>
                                        <p>{appointment.doctor}</p>
                                    </div>
                                    <div className="appointment-time">
                                        <span className="time">{appointment.time}</span>
                                        <span className={`status status-${appointment.status === 'تایید شده' ? 'confirmed' : 'pending'}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="content-card">
                        <h3>فعالیت‌های امروز</h3>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon">📝</div>
                                <div className="activity-content">
                                    <p>نوبت جدید ثبت شد</p>
                                    <small>۲ دقیقه پیش</small>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon">✅</div>
                                <div className="activity-content">
                                    <p>نوبت تایید شد</p>
                                    <small>۱۵ دقیقه پیش</small>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon">👤</div>
                                <div className="activity-content">
                                    <p>بیمار جدید ثبت شد</p>
                                    <small>۱ ساعت پیش</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 