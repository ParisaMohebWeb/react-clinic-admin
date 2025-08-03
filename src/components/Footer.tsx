import React from 'react';

/**
 * کامپوننت Footer برنامه
 * 
 * این کامپوننت شامل:
 * - اطلاعات کلینیک
 * - لیست خدمات
 * - اطلاعات تماس
 * - ساعات کاری
 * - کپی‌رایت
 * 
 * @returns {JSX.Element} فوتر برنامه
 */
const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>کلینیک درمانی</h4>
                        <p>ارائه بهترین خدمات درمانی با جدیدترین تکنولوژی‌ها</p>
                    </div>

                    <div className="footer-section">
                        <h4>خدمات</h4>
                        <ul>
                            <li>معاینه عمومی</li>
                            <li>تخصص‌های مختلف</li>
                            <li>آزمایشگاه</li>
                            <li>تصویربرداری</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>تماس</h4>
                        <ul>
                            <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
                            <li>📧 info@clinic.ir</li>
                            <li>📍 تهران، خیابان ولیعصر</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>ساعات کاری</h4>
                        <ul>
                            <li>شنبه تا چهارشنبه: ۸ صبح تا ۸ شب</li>
                            <li>پنجشنبه: ۸ صبح تا ۲ بعدازظهر</li>
                            <li>جمعه: تعطیل</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 1404 کلینیک درمانی. تمامی حقوق محفوظ است.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 