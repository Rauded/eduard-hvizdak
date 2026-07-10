import React from 'react';
import {
  LuArrowRight, LuMail, LuPhone, LuCalendar, LuMessageSquare, LuSearch, LuFileText,
  LuBell, LuShieldCheck, LuScrollText, LuUserCheck, LuServer, LuCircleCheck, LuMinus,
  LuSlack, LuGithub, LuDatabase, LuMail as LuMailbox, LuFolder, LuTable, LuTicket, LuCalendarClock,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import ContactGradient from '../_21test/ContactGradient';
import Reveal from '../_21test/Reveal';
import './services.scss';
import './service-cards-v2.scss';
import './ai-employee.scss';

const EMAIL = 'eduardd.hv@gmail.com';
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const PHONE = '+421950774038';
const PHONE_DISPLAY = '+421 950 774 038';

// Presentation-only metadata (icons, feature on/off flags, phase numbers,
// featured tier). All human copy comes from the `aiEmployee` i18n namespace and
// is zipped onto these by index inside the component.
const CAP_ICONS = [<LuMessageSquare />, <LuSearch />, <LuFileText />, <LuBell />];

const SECURITY_ICONS = [<LuUserCheck />, <LuScrollText />, <LuShieldCheck />, <LuServer />];

const CONNECTOR_ICONS = [
  <LuSlack />, <LuMailbox />, <LuGithub />, <LuTicket />, <LuTable />,
  <LuFolder />, <LuDatabase />, <LuTicket />, <LuCalendarClock />, <LuScrollText />,
];

const PROCESS_NUMS = ['01', '02', '03', '04', '05'];

// Per-tier: whether it is the featured card, and the on/off state of each of its
// eight feature rows (parallel to pricing.tiers[i].features).
const TIER_META = [
  { featured: false, on: [true, true, true, true, true, false, false, false] },
  { featured: true, on: [true, true, true, true, true, true, true, true] },
  { featured: false, on: [true, true, true, true, true, true, true, true] },
];

const AiEmployeePage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('aiEmployee');

  const capabilities = t.capabilities.map((c, i) => ({ ...c, icon: CAP_ICONS[i] }));
  const security = t.security.cards.map((s, i) => ({ ...s, icon: SECURITY_ICONS[i] }));
  const connectors = t.connectors.labels.map((label, i) => ({ label, icon: CONNECTOR_ICONS[i] }));
  const process = t.process.steps.map((step, i) => ({ ...step, n: PROCESS_NUMS[i] }));
  const tiers = t.pricing.tiers.map((tier, i) => ({
    ...tier,
    featured: TIER_META[i].featured,
    features: tier.features.map((label, j) => ({ t: label, on: TIER_META[i].on[j] })),
  }));

  return (
    <>
      <div className="services" data-theme={theme}>
        <Seo
          title={t.seo.title}
          description={t.seo.description}
          path="/services/ai-employee"
          noindex
        />

        <header className="services-hero aie-hero">
          <span className="services-hero__eyebrow">{t.hero.eyebrow}</span>
          <h1 className="services-hero__title">
            {t.hero.title}
          </h1>
          <p className="services-hero__lead">
            {t.hero.lead}
          </p>
          <div className="services-hero__cta">
            <a className="services-btn services-btn--primary svc-free-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <span className="svc-free-btn__shine" aria-hidden="true" />
              <LuCalendar aria-hidden="true" />
              {t.hero.book}
              <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
            </a>
            <a className="services-btn services-btn--ghost" href={`mailto:${EMAIL}?subject=AI%20Employee%20enquiry`}>
              <LuMail aria-hidden="true" />
              {t.hero.email}
            </a>
            <a className="services-btn services-btn--ghost" href={`tel:${PHONE}`}>
              <LuPhone aria-hidden="true" />
              {t.hero.call} {PHONE_DISPLAY}
            </a>
          </div>
        </header>

        {/* What it does */}
        <section className="services-block" aria-labelledby="aie-what">
          <Reveal><h2 className="services-block__title" id="aie-what">{t.what.title}</h2></Reveal>
          <div className="services-grid">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <article className="services-card services-card--v2 aie-cap">
                  <span className="services-card__icon">{c.icon}</span>
                  <h3 className="services-card__title">{c.title}</h3>
                  <p className="services-card__outcome">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Connectors band */}
        <Reveal className="aie-connectors" as="section">
          <p className="aie-connectors__kicker">{t.connectors.kicker}</p>
          <div className="aie-connectors__grid">
            {connectors.map((c) => (
              <div className="aie-connector" key={c.label}>
                <span className="aie-connector__icon">{c.icon}</span>
                <span className="aie-connector__label">{c.label}</span>
              </div>
            ))}
          </div>
          <p className="aie-connectors__note">
            {t.connectors.note}
          </p>
        </Reveal>

        {/* Security */}
        <section className="services-block" aria-labelledby="aie-secure">
          <Reveal>
            <p className="services-how__eyebrow">{t.security.eyebrow}</p>
            <h2 className="services-block__title" id="aie-secure">{t.security.title}</h2>
            <p className="aie-lead-muted">
              {t.security.lead}
            </p>
          </Reveal>
          <div className="services-grid aie-grid-2">
            {security.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <article className="aie-secure-card">
                  <span className="aie-secure-card__icon">{s.icon}</span>
                  <div>
                    <h3 className="aie-secure-card__title">{s.title}</h3>
                    <p className="aie-secure-card__body">{s.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="services-block" aria-labelledby="aie-process">
          <Reveal><h2 className="services-block__title" id="aie-process">{t.process.title}</h2></Reveal>
          <ol className="services-steps aie-steps">
            {process.map((step, i) => (
              <Reveal as="li" className="services-step" key={step.n} delay={i * 70}>
                <span className="services-step__n">{step.n}</span>
                <div>
                  <div className="aie-step-head">
                    <h3 className="services-step__title">{step.title}</h3>
                    <span className="aie-step-dur">{step.dur}</span>
                  </div>
                  <p className="services-step__body">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Pricing */}
        <section className="services-block" aria-labelledby="aie-pricing">
          <Reveal><h2 className="services-block__title" id="aie-pricing">{t.pricing.title}</h2></Reveal>
          <Reveal>
            <p className="aie-lead-muted">
              {t.pricing.lead}
            </p>
          </Reveal>
          <div className="aie-tiers">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90}>
                <article className={`aie-tier${tier.featured ? ' aie-tier--featured' : ''}`}>
                  {tier.featured && <span className="aie-tier__ribbon">{tier.tag}</span>}
                  {!tier.featured && <span className="aie-tier__tag">{tier.tag}</span>}
                  <h3 className="aie-tier__name">{tier.name}</h3>
                  <div className="aie-tier__price">
                    <span className="aie-tier__amount">{tier.price}</span>
                    <span className="aie-tier__pricenote">{tier.priceNote}</span>
                  </div>
                  <p className="aie-tier__dur">{tier.dur}</p>
                  <p className="aie-tier__blurb">{tier.blurb}</p>
                  <ul className="aie-tier__features">
                    {tier.features.map((f) => (
                      <li key={f.t} className={f.on ? 'is-on' : 'is-off'}>
                        {f.on ? <LuCircleCheck aria-hidden="true" /> : <LuMinus aria-hidden="true" />}
                        <span>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`services-btn ${tier.featured ? 'services-btn--primary' : 'services-btn--ghost'} aie-tier__cta`}
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tier.cta}
                    <LuArrowRight aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* What you provide */}
        <section className="services-block" aria-labelledby="aie-provide">
          <Reveal><h2 className="services-block__title" id="aie-provide">{t.provide.title}</h2></Reveal>
          <ul className="services-proof">
            {t.provide.items.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 70}><LuCircleCheck aria-hidden="true" /> <span>{p}</span></Reveal>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="services-block" aria-labelledby="aie-faq">
          <Reveal><h2 className="services-block__title" id="aie-faq">{t.faq.title}</h2></Reveal>
          <div className="aie-faq">
            {t.faq.items.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <details className="aie-faq__item">
                  <summary className="aie-faq__q">{f.q}</summary>
                  <p className="aie-faq__a">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <ContactGradient />
    </>
  );
};

export default AiEmployeePage;
