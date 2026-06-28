import React from 'react';
import { LuMail, LuCalendar, LuArrowRight } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './contact.scss';

// Booking link (Cal.com). Override with REACT_APP_BOOKING_URL in Vercel.
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const EMAIL = 'eduardd.hv@gmail.com';

const Contact: React.FC = () => (
  <section className="contact" id="contact">
    <div className="contact__inner">
      <p className="contact__eyebrow">Get in touch</p>
      <h2 className="contact__title">Let's work together</h2>
      <p className="contact__lead">
        Building something with AI, need a product shipped, or just want to talk shop? I'm always up
        for an interesting problem.
      </p>
      <div className="contact__actions">
        <a className="contact__btn contact__btn--primary" href={`mailto:${EMAIL}`}>
          <LuMail aria-hidden="true" />
          Email me
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
            Book 30 min
          </a>
        )}
      </div>
      <div className="contact__socials">
        <a href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
