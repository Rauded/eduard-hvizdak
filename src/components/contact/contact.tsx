import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './contact.scss';

// Booking link (Cal.com). Override with REACT_APP_BOOKING_URL in Vercel.
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const EMAIL = 'eduardd.hv@gmail.com';

const Contact: React.FC = () => (
  <section className="contact" id="contact">
    <div className="contact__inner">
      <h2 className="contact__title">Let's work together</h2>
      <p className="contact__lead">
        Building something with AI, or need a product shipped? I'm up for an interesting problem.
      </p>
      <div className="contact__actions">
        {BOOKING_URL && (
          <a
            className="btn btn--primary"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
        )}
        <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
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

export default Contact;
