import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaFileAlt, FaBars, FaTimes, FaPen } from 'react-icons/fa';
import './header.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isBlog = location.pathname.startsWith('/blog');

  // Scroll to an in-page section, retrying briefly so it also works right
  // after navigating home from another route (the section needs to mount).
  const scrollToSection = (target: string) => {
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (tries++ < 25) {
        setTimeout(tick, 40);
      }
    };
    tick();
  };

  // Works from any route: if we're not on the homepage, route there first,
  // then scroll to the requested section.
  const goToSection = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
    scrollToSection(target);
  };

  return (
    <header className="header-container">
      <a href="#home" className="logo" onClick={(e) => goToSection(e, 'home')}>
        Eduard Hvizdak
      </a>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={30} className="close-icon" /> : <FaBars size={30} />}
      </div>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <a href="#home" className="nav-link" onClick={(e) => goToSection(e, 'home')}>
          <FaHome />
          Home
        </a>
        <a href="#about" className="nav-link" onClick={(e) => goToSection(e, 'about')}>
          <FaUser />
          About
        </a>
        <a href="#projects" className="nav-link" onClick={(e) => goToSection(e, 'projects')}>
          <FaCode />
          Projects
        </a>
        <a href="#resume" className="nav-link" onClick={(e) => goToSection(e, 'resume')}>
          <FaFileAlt />
          Resume
        </a>
        <Link
          to="/blog"
          className={`nav-link ${isBlog ? 'nav-link--active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <FaPen />
          Blog
        </Link>
      </nav>
    </header>
  );
};

export default Header;
