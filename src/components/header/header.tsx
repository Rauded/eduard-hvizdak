import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuSun, LuMoon, LuMenu, LuX } from 'react-icons/lu';
import { useTheme } from '../theme/ThemeContext';
import './header.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isBlog = location.pathname.startsWith('/blog');
  const isNow = location.pathname.startsWith('/now');
  const isServices = location.pathname.startsWith('/services');

  // The hairline under the nav appears only once the page has scrolled past a
  // zero-height sentinel parked at the top of the document flow.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
    <>
      <div ref={sentinelRef} className="header-sentinel" aria-hidden="true" />
      <header className={`header-container ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="logo" onClick={(e) => goToSection(e, 'home')}>
          eduard hvizdak
        </a>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <LuX size={28} className="close-icon" /> : <LuMenu size={28} />}
        </div>
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link" onClick={(e) => goToSection(e, 'home')}>
            Home
          </a>
          <a href="#about" className="nav-link" onClick={(e) => goToSection(e, 'about')}>
            About
          </a>
          <a href="#projects" className="nav-link" onClick={(e) => goToSection(e, 'projects')}>
            Projects
          </a>
          <a href="#resume" className="nav-link" onClick={(e) => goToSection(e, 'resume')}>
            Resume
          </a>
          <Link
            to="/services"
            className={`nav-link ${isServices ? 'nav-link--active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/blog"
            className={`nav-link ${isBlog ? 'nav-link--active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/now"
            className={`nav-link ${isNow ? 'nav-link--active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Now
          </Link>
          <button
            type="button"
            className="site-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <LuSun /> : <LuMoon />}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
