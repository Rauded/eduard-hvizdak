import React from 'react';
import './footer.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const EMAIL = 'eduardd.hv@gmail.com';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="left-align">
        <p>
          Designed and built by{' '}
          <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" className="footer-link">Eduard Hvizdak</a>.
        </p>
      </div>
      <div className="center-align">
        <p>&copy; Eduard Hvizdak 2026</p>
        <p>
          <a className="footer-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
