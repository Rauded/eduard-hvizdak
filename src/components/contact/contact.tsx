import React from 'react';
import { LuMail, LuCalendar, LuPhone, LuArrowRight } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useT } from '../../i18n';
import './contact.scss';

// Booking link (Cal.com). Override with REACT_APP_BOOKING_URL in Vercel.
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const EMAIL = 'eduardd.hv@gmail.com';
// tel: link needs the digits with no spaces; the display keeps the spacing.
const PHONE = '+421950774038';
const PHONE_DISPLAY = '+421 950 774 038';

const Contact: React.FC = () => {
  const t = useT('contact');
  return (
  <section className="contact" id="contact">
    <div className="contact__inner">
      <p className="contact__eyebrow">{t.eyebrow}</p>
      <h2 className="contact__title">{t.title}</h2>
      <p className="contact__lead">
        {t.lead}
      </p>
      <div className="contact__actions">
        <a className="contact__btn contact__btn--primary" href={`mailto:${EMAIL}`}>
          <LuMail aria-hidden="true" />
          {t.emailMe}
          <LuArrowRight className="contact__btn-arrow" aria-hidden="true" />
        </a>
        {BOOKING_URL && (
          <a
            className="contact__btn contact__btn--ghost"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuCalendar aria-hidden="true" />
            {t.book}
          </a>
        )}
        <a className="contact__btn contact__btn--ghost" href={`tel:${PHONE}`}>
          <LuPhone aria-hidden="true" />
          {t.callMe}
        </a>
      </div>
      <p className="contact__direct">
        {t.directEmail} <a href={`mailto:${EMAIL}`}>{EMAIL}</a> {t.directOr}{' '}
        <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
      </p>
      <div className="contact__socials">
        <a href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://x.com/EduardHvizdak" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
          <FaXTwitter />
        </a>
        <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </div>
  </section>
  );
};

export default Contact;
