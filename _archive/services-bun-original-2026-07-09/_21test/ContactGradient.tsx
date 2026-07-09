import React from 'react';
import { LuMail, LuCalendar, LuArrowRight } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './contact-gradient.scss';

// ── TEST: the real Contact section combined with the animated gradient band ──
// Same layout/content as contact.tsx, on the slowly panning navy gradient.
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const EMAIL = 'eduardd.hv@gmail.com';

const ContactGradient: React.FC = () => (
  <section className="contactg" id="contact">
    <div className="contactg__inner">
      <p className="contactg__eyebrow">Get in touch</p>
      <h2 className="contactg__title">Let's work together</h2>
      <p className="contactg__lead">
        Have a workflow worth automating, documents worth making answerable, or a product that needs
        shipping? Tell me what is slowing your team down.
      </p>
      <div className="contactg__actions">
        <a className="contactg__btn contactg__btn--primary" href={`mailto:${EMAIL}`}>
          <LuMail aria-hidden="true" />
          Email me
          <LuArrowRight className="contactg__btn-arrow" aria-hidden="true" />
        </a>
        <a className="contactg__btn contactg__btn--ghost" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          <LuCalendar aria-hidden="true" />
          Book 30 min
        </a>
      </div>
      <p className="contactg__direct">
        Or email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <div className="contactg__socials">
        <a href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="https://x.com/EduardHvizdak" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><FaXTwitter /></a>
        <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
      </div>
    </div>
  </section>
);

export default ContactGradient;
