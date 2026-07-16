import React from 'react';
import { LuMail, LuCalendar, LuArrowRight } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './contact-gradient.scss';
import { useT } from '../../i18n';
import ContactWizard from './ContactWizard';

// ── TEST: the real Contact section combined with the animated gradient band ──
// Same layout/content as contact.tsx, on the slowly panning navy gradient.
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const EMAIL = 'eduardd.hv@gmail.com';

const ContactGradient: React.FC = () => {
  const t = useT('contactBand');
  return (
    <section className="contactg" id="contact">
      <div className="contactg__inner">
        <p className="contactg__eyebrow">{t.eyebrow}</p>
        <h2 className="contactg__title">{t.title}</h2>
        <p className="contactg__lead">
          {t.lead}
        </p>
        <ContactWizard />
        <p className="contactg__alt-label">{t.wizard.prefer}</p>
        <div className="contactg__actions">
          <a className="contactg__btn contactg__btn--primary" href={`mailto:${EMAIL}`} data-cuelume-press>
            <LuMail aria-hidden="true" />
            {t.emailMe}
            <LuArrowRight className="contactg__btn-arrow" aria-hidden="true" />
          </a>
          <a className="contactg__btn contactg__btn--ghost" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cuelume-press>
            <LuCalendar aria-hidden="true" />
            {t.book}
          </a>
        </div>
        <p className="contactg__direct">
          {t.directPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <div className="contactg__socials">
          <a href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer" aria-label={t.githubAria}><FaGithub /></a>
          <a href="https://x.com/EduardHvizdak" target="_blank" rel="noopener noreferrer" aria-label={t.xAria}><FaXTwitter /></a>
          <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" aria-label={t.linkedinAria}><FaLinkedin /></a>
        </div>
      </div>
    </section>
  );
};

export default ContactGradient;
