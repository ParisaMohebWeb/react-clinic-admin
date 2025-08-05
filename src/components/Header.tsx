import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * کامپوننت Header برنامه
 *
 * این کامپوننت شامل:
 * - لوگو و نام کلینیک
 * - منوی ناوبری اصلی
 * - دکمه ورود/خروج
 * - منوی موبایل (همبرگر)
 *
 * @returns {JSX.Element} هدر برنامه
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const checkLoginStatus = () =>
    localStorage.getItem("userId") ? setIsLogin(true) : setIsLogin(false);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const exitBtn = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    setIsLogin(false);
    navigate('/')
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>سیستم مدیریت کلینیک</h1>
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                داشبورد
              </Link>
            </li>
            <li>
              <Link to="/patients" onClick={() => setIsMenuOpen(false)}>
                بیماران
              </Link>
            </li>
            <li>
              <Link to="/doctors" onClick={() => setIsMenuOpen(false)}>
                پزشکان
              </Link>
            </li>
            <li>
              <Link to="/appointments" onClick={() => setIsMenuOpen(false)}>
                نوبت‌ها
              </Link>
            </li>
            <li>
              <Link to="/specialties" onClick={() => setIsMenuOpen(false)}>
                تخصص‌ها
              </Link>
            </li>
            <li>
              <Link to="/schedules" onClick={() => setIsMenuOpen(false)}>
                برنامه‌ها
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="user-menu">
            {isLogin ? (
              <button className="btn btn-outline btn-danger" onClick={exitBtn}>
                خروج
              </button>
            ) : (
              <button
                className="btn btn-outline"
                onClick={() => navigate("/login")}
              >
                ورود
              </button>
            )}
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
