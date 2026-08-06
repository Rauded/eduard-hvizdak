import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { LuArrowRight, LuVolume2, LuVolumeX } from 'react-icons/lu';
import { useT } from '../../i18n';
import { useLocalizedPath } from '../common/LocaleLink';
import { useSound } from '../sound/SoundContext';

const EMAIL = 'eduardd.hv@gmail.com';
const PHONE = '+421950774038';
const PHONE_DISPLAY = '+421 950 774 038';

const Footer: React.FC = () => {
  const t = useT('footer');
  const { soundOn, toggleSound } = useSound();
  const localize = useLocalizedPath();
  // Home path in the active locale + the contact anchor. Works from any route:
  // ScrollToTop in App scrolls to #contact once the section mounts.
  const contactHref = `${localize('/')}#contact`;
  return (
    <footer className="footer-container">
      <div className="left-align">
        <p>
          {t.builtBy}{' '}
          <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" className="footer-link">Eduard Hvizdak</a>.
        </p>
        <button
          type="button"
          className="footer-sound-toggle"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? t.sound.disable : t.sound.enable}
        >
          {soundOn ? <LuVolume2 aria-hidden="true" /> : <LuVolumeX aria-hidden="true" />}
          <span>{soundOn ? t.sound.on : t.sound.off}</span>
        </button>
      </div>
      <div className="center-align">
        <Link className="footer-contact" to={contactHref} data-cuelume-press>
          {t.contact}
          <LuArrowRight aria-hidden="true" />
        </Link>
        <p>&copy; Eduard Hvizdak 2026</p>
        <p>
          <a className="footer-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <p>
          <a className="footer-phone" href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
        </p>
      </div>
      <div className="right-align social-icons">
        <a href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="https://x.com/EduardHvizdak" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><FaXTwitter /></a>
        <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;
