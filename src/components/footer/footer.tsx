import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p className="footer-copy">Eduard Hvizdak, 2026</p>
      <nav className="footer-nav" aria-label="Footer">
        <Link to="/services" className="footer-nav__link">Services</Link>
        <Link to="/blog" className="footer-nav__link">Blog</Link>
        <Link to="/now" className="footer-nav__link">Now</Link>
        <Link to="/things" className="footer-nav__link">Things</Link>
      </nav>
      <div className="social-icons">
        <a href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="https://x.com/EduardHvizdak" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><FaXTwitter /></a>
        <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;
