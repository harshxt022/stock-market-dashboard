import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ onDashboardClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className={`header ${isScrolled ? 'active' : ''}`} data-header>
      <div className="container">
        <a href="#" onClick={handleLogoClick} className="logo">
          
          <img src='logo.png' width="55" alt="Platform logo" />
          TradeBro
        </a>

        <nav className={`navbar ${menuOpen ? 'active' : ''}`} data-navbar>
          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="#" className="navbar-link active" data-nav-link onClick={closeMenu}>Homepage</a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link onClick={closeMenu}>Analytics</a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link onClick={closeMenu}>Markets</a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link onClick={closeMenu}>Screeners</a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link onClick={closeMenu}>Blog</a>
            </li>

            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link onClick={closeMenu}>NIFTY50</a>
            </li>
          </ul>
        </nav>

        <button className={`nav-toggle-btn ${menuOpen ? 'active' : ''}`} data-nav-toggler onClick={toggleMenu}>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>

        <Link to="/login" className="login-link">
          <i className="fa-solid fa-user"></i>
        </Link>

        <button className="btn btn-outline" onClick={onDashboardClick}>Dashboard</button>
      </div>
    </header>
  );
}
