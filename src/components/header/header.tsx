import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaFileAlt, FaBars, FaTimes, FaPen, FaRegClock, FaBriefcase } from 'react-icons/fa';
import { LuSun, LuMoon } from 'react-icons/lu';
import { useTheme } from '../theme/ThemeContext';
import { useT } from '../../i18n';
import { useLocale } from '../../i18n/LocaleContext';
import { localizedPath, stripLocale } from '../../config/locale';
import LocaleLink from '../common/LocaleLink';
import LanguageSwitcher from './LanguageSwitcher';
import './header.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, canToggle } = useTheme();
  const t = useT('header');
  const { locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  // Route matching works on the locale-less path so /sk/blog still marks "blog".
  const barePath = stripLocale(location.pathname);
  const isBlog = barePath.startsWith('/blog');
  const isNow = barePath.startsWith('/now');
  const isServices = barePath.startsWith('/services');
  const homePath = localizedPath('/', locale);

  // Scroll to an in-page section, retrying briefly so it also works right
  // after navigating home from another route (the section needs to mount).
  const scrollToSection = (target: string) => {
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        // Reflect the active section in the URL without triggering a navigation.
        window.history.replaceState(null, '', `#${target}`);
      } else if (tries++ < 25) {
        setTimeout(tick, 40);
      }
    };
    tick();
  };

  // Close the mobile menu on Escape while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Works from any route: if we're not on the homepage, route there first,
  // then scroll to the requested section.
  const goToSection = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== homePath) {
      navigate(homePath);
    }
    scrollToSection(target);
  };

  return (
    <header className="header-container">
      <a href="#home" className="logo" onClick={(e) => goToSection(e, 'home')}>
        Eduard Hvizdak
      </a>
      <button
        type="button"
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="site-nav"
      >
        {isOpen ? <FaTimes size={30} className="close-icon" /> : <FaBars size={30} />}
      </button>
      <nav id="site-nav" className={`nav ${isOpen ? 'open' : ''}`}>
        <a href="#home" className="nav-link" onClick={(e) => goToSection(e, 'home')}>
          <FaHome />
          {t.nav.home}
        </a>
        <a href="#about" className="nav-link" onClick={(e) => goToSection(e, 'about')}>
          <FaUser />
          {t.nav.about}
        </a>
        <a href="#resume" className="nav-link" onClick={(e) => goToSection(e, 'resume')}>
          <FaFileAlt />
          {t.nav.resume}
        </a>
        <a href="#projects" className="nav-link" onClick={(e) => goToSection(e, 'projects')}>
          <FaCode />
          {t.nav.projects}
        </a>
        <LocaleLink
          to="/services"
          className={`nav-link ${isServices ? 'nav-link--active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <FaBriefcase />
          {t.nav.services}
        </LocaleLink>
        <LocaleLink
          to="/blog"
          className={`nav-link ${isBlog ? 'nav-link--active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <FaPen />
          {t.nav.blog}
        </LocaleLink>
        <LocaleLink
          to="/now"
          className={`nav-link ${isNow ? 'nav-link--active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <FaRegClock />
          {t.nav.now}
        </LocaleLink>
        <LanguageSwitcher />
        {canToggle && (
          <button
            type="button"
            className="site-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <LuSun /> : <LuMoon />}
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
