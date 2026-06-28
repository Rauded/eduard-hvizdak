import React from 'react';
import { LuMail, LuCalendar, LuArrowRight } from 'react-icons/lu';
import './contact.scss';

// Booking link (Cal.com/Calendly). Set REACT_APP_BOOKING_URL in Vercel to
// show the "Book 15 min" button; until then only the email CTA renders.
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL;
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
            Book 15 min
          </a>
        )}
      </div>
    </div>
  </section>
);

export default Contact;
