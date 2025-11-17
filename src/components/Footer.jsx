import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top" data-section>
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src='logo.png' width="50" height="50" alt="Platform logo" />
              TradeBro
            </a>
            <h2 className="footer-title">Let's talk!</h2>
            <a href="tel:+123456789101" className="footer-contact-link">+12 345 678 9101</a>
            <a href="mailto:hello@stocklytics.app" className="footer-contact-link">support@tradebro.com</a>
            <address className="footer-contact-link">
              Chhole Bhature Road, Patli Gali, Bada Sheher - 134113
            </address>
          </div>

          <ul className="footer-list">
            <li><p className="footer-list-title">Features</p></li>
            <li><a href="#" className="footer-link">Live Prices</a></li>
            <li><a href="#" className="footer-link">Heatmaps</a></li>
            <li><a href="#" className="footer-link">Predictions</a></li>
            <li><a href="#" className="footer-link">Backtesting</a></li>
          </ul>

          <ul className="footer-list">
            <li><p className="footer-list-title">Tools</p></li>
            <li><a href="#" className="footer-link">Technical Indicators</a></li>
            <li><a href="#" className="footer-link">Pattern Detection</a></li>
            <li><a href="#" className="footer-link">Risk Metrics</a></li>
          </ul>

          <ul className="footer-list">
            <li><p className="footer-list-title">Support</p></li>
            <li><a href="#" className="footer-link">Education Center</a></li>
            <li><a href="#" className="footer-link">Help Center</a></li>
            <li><a href="#" className="footer-link">API Documentation</a></li>
          </ul>

          <ul className="footer-list">
            <li><p className="footer-list-title">About Us</p></li>
            <li><a href="#" className="footer-link">Our Story</a></li>
            <li><a href="#" className="footer-link">Careers</a></li>
            <li><a href="#" className="footer-link">Business Contacts</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">© 2025 TradeBro. All rights reserved</p>
          <ul className="social-list">
            <li><a href="#" className="social-link">f</a></li>
            <li><a href="#" className="social-link">𝕏</a></li>
            <li><a href="#" className="social-link">📷</a></li>
            <li><a href="#" className="social-link">in</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
