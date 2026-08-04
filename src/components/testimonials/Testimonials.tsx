import React from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { useT } from '../../i18n';
import './testimonials.scss';

// Renders nothing until src/data/testimonials.ts holds real, cleared quotes.
// That file explains why it is empty and what to put in it.
const Testimonials: React.FC = () => {
  const t = useT('testimonials');
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="testimonials" aria-labelledby="testimonials-label">
      <p className="testimonials__label" id="testimonials-label">{t.label}</p>
      <ul className="testimonials__grid">
        {TESTIMONIALS.map((item) => (
          <li className="testimonial" key={item.name}>
            <blockquote className="testimonial__quote">{item.quote}</blockquote>
            <div className="testimonial__person">
              {item.photo && (
                <img
                  className="testimonial__photo"
                  src={item.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="testimonial__meta">
                <span className="testimonial__name">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                  ) : (
                    item.name
                  )}
                </span>
                <span className="testimonial__role">{item.role}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
