import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="Blisstown Logo" className="footer-logo-img" />
          </div>
          <p className="footer-description">
            Pioneering the landscape of luxury development with an unwavering commitment to architectural integrity and timeless design.
          </p>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Corporate</h4>
          <ul className="footer-list">
            <li><Link to="/about-us" className="footer-link">About Us</Link></li>
            <li><Link to="/chairman-message" className="footer-link">Chairman Message</Link></li>
            <li><Link to="/management-team" className="footer-link">Management Team</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Policies</h4>
          <ul className="footer-list">
            <li><Link to="/quality-policy" className="footer-link">Quality Policy</Link></li>
            <li><Link to="/safety-policy" className="footer-link">Safety Policy</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-list">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/project" className="footer-link">JMDR Arihant Green</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-connect">
          <h4 className="footer-heading">Connect</h4>
          <div className="footer-socials">
            <a href="#" className="footer-social-link"><span className="material-symbols-outlined">public</span></a>
            <a href="#" className="footer-social-link"><span className="material-symbols-outlined">camera</span></a>
            <a href="#" className="footer-social-link"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2024 Bliss Town Developers. All rights reserved<Link to="/admin" className="hidden-admin-link">.</Link>
          </div>
          <div className="footer-legal">
            <a href="#" className="footer-link-bottom">Legal</a>
            <a href="#" className="footer-link-bottom">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
