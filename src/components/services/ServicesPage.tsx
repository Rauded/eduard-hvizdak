import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowRight, LuMail, LuPhone, LuCalendar, LuRepeat2, LuFileSearch, LuBot, LuShieldCheck,
  LuCircleCheck,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import ContactGradient from '../_21test/ContactGradient';
import './services.scss';
import './service-cards-v2.scss';
import './services-featured.scss';
// TEST: 21st.dev showcase components (remove these + tags below to revert)
import ServicesShowcase from '../_21test/ServicesShowcase';
import AgentPipeline from '../_21test/AgentPipeline';
import OrbitingStack from '../_21test/OrbitingStack';
import Reveal from '../_21test/Reveal';

// Process visualizations: how I run large, AI-assisted engineering work.
// Restyled onto the site's navy/light palette and framed honestly as method,
// not as claims about a specific client project.
import BunSectionHeading from '../_bun/BunSectionHeading';
import BunAdversarialReview from '../_bun/BunAdversarialReview';
import BunCommitsHeatmapDefault from '../_bun/BunCommitsHeatmap';
import BunErrorsWorkflow from '../_bun/BunErrorsWorkflow';
import BunBuildKite from '../_bun/BunBuildKite';
import BunGitLogAnimation from '../_bun/BunGitLogAnimation';

const EMAIL = 'eduardd.hv@gmail.com';
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';
const PHONE = '+421950774038';
const PHONE_DISPLAY = '+421 950 774 038';

// One card per service: a headline number, the service name, and a single line.
// Icons only; the copy (stat, label, title, outcome) comes from the i18n dict
// and is zipped by index. One navy accent across all cards (see service-cards-v2).
const SERVICE_ICONS = [<LuRepeat2 />, <LuFileSearch />, <LuBot />, <LuShieldCheck />];

// Step numbers stay here; the titles/bodies come from the dict.
const STEP_NUMBERS = ['01', '02', '03', '04'];

const ServicesPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('services');

  return (
    <>
    <div className="services" data-theme={theme}>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        path="/services"
      />

      <header className="services-hero">
        <span className="services-hero__eyebrow">{t.heroEyebrow}</span>
        <h1 className="services-hero__title">
          {t.heroTitle}
        </h1>
        <p className="services-hero__lead">
          {t.heroLead}
        </p>
        <div className="services-hero__cta">
          <a className="services-btn services-btn--primary svc-free-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <span className="svc-free-btn__shine" aria-hidden="true" />
            <LuCalendar aria-hidden="true" />
            {t.ctaConsult}
            <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
          </a>
          <a className="services-btn services-btn--ghost" href={`mailto:${EMAIL}?subject=AI%20project%20enquiry`}>
            <LuMail aria-hidden="true" />
            {t.ctaEmail}
          </a>
          <a className="services-btn services-btn--ghost" href={`tel:${PHONE}`}>
            <LuPhone aria-hidden="true" />
            {t.ctaCall} {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      {/* Featured: links to the (unlisted) AI Employee page with the live demo. */}
      <Reveal className="services-block" as="section">
        <Link to="/services/ai-employee" className="svc-featured">
          <div>
            <span className="svc-featured__eyebrow">{t.featured.eyebrow}</span>
            <h2 className="svc-featured__title">{t.featured.title}</h2>
            <p className="svc-featured__text">{t.featured.body}</p>
          </div>
          <span className="svc-featured__cta">{t.featured.cta} <LuArrowRight aria-hidden="true" /></span>
        </Link>
      </Reveal>

      {/* Signature band: the one bold, unmissable moment. */}
      <Reveal className="services-signal" as="section">
        <p className="services-signal__kicker">{t.signalKicker}</p>
        <div className="services-signal__grid">
          {t.signals.map((s) => (
            <div className="services-signal__item" key={s.label}>
              <div className="services-signal__value">{s.value}</div>
              <div className="services-signal__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="services-block" aria-labelledby="what-i-do">
        <Reveal><h2 className="services-block__title" id="what-i-do">{t.whatIDo}</h2></Reveal>
        <div className="services-grid">
          {t.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="services-card services-card--v2">
                <div className="svc-top">
                  <span className="services-card__icon">{SERVICE_ICONS[i]}</span>
                  <div className="svc-stat">
                    <div className="svc-stat__value">{s.stat}</div>
                    <div className="svc-stat__label">{s.statLabel}</div>
                  </div>
                </div>
                <h3 className="services-card__title">{s.title}</h3>
                <p className="services-card__outcome">{s.outcome}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEST: 21st.dev showcase trio (agent diagram, run demo, integrations) */}
      <Reveal><AgentPipeline /></Reveal>
      <Reveal><ServicesShowcase /></Reveal>
      <Reveal><OrbitingStack /></Reveal>

      <section className="services-block" aria-labelledby="why-me">
        <Reveal><h2 className="services-block__title" id="why-me">{t.whyMe}</h2></Reveal>
        <ul className="services-proof">
          {t.proof.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 80}><LuCircleCheck aria-hidden="true" /> <span>{p}</span></Reveal>
          ))}
        </ul>
      </section>

      <section className="services-block" aria-labelledby="how-it-works">
        <Reveal><h2 className="services-block__title" id="how-it-works">{t.howItWorks}</h2></Reveal>
        <ol className="services-steps">
          {t.steps.map((step, i) => (
            <Reveal as="li" className="services-step" key={STEP_NUMBERS[i]} delay={i * 80}>
              <span className="services-step__n">{STEP_NUMBERS[i]}</span>
              <div>
                <h3 className="services-step__title">{step.title}</h3>
                <p className="services-step__body">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/*
        ================================================================
        HOW I WORK: process visualizations.
        Honest framing: these replay a real, public large-scale AI-assisted
        engineering effort (the Bun runtime's Rust migration) as a concrete
        illustration of the methods I use: parallel agents, adversarial
        review, and shipping to green. They are examples of technique, not
        claims about a specific client engagement.
        ================================================================
      */}
      <section className="services-block services-how" aria-labelledby="how-i-work" style={{ marginTop: '104px' }}>
        <Reveal>
          <p className="services-how__eyebrow">{t.howEyebrow}</p>
          <h2 className="services-block__title" id="how-i-work">{t.howTitle}</h2>
          <p className="services-how__lead">
            {t.howLead}
          </p>
        </Reveal>

        {/* Adversarial review: implementer writes, reviewer refutes */}
        <div className="services-how__item">
          <Reveal>
            <BunSectionHeading
              accent="var(--accent)"
              subtitle={t.adversarialSubtitle}
            >
              {t.adversarialTitle}
            </BunSectionHeading>
          </Reveal>
          <div className="services-how__stage">
            <Reveal><BunAdversarialReview /></Reveal>
          </div>
        </div>

        {/* Errors to fixes: parallel agents across worktrees */}
        <div className="services-how__item">
          <Reveal>
            <BunSectionHeading
              accent="var(--accent)"
              subtitle={t.errorsSubtitle}
            >
              {t.errorsTitle}
            </BunSectionHeading>
          </Reveal>
          <div className="services-how__stage">
            <Reveal><BunErrorsWorkflow /></Reveal>
          </div>
        </div>

        {/* CI race to green */}
        <div className="services-how__item">
          <Reveal>
            <BunSectionHeading
              accent="var(--accent)"
              subtitle={t.greenSubtitle}
            >
              {t.greenTitle}
            </BunSectionHeading>
          </Reveal>
          <div className="services-how__stage">
            <Reveal><BunBuildKite /></Reveal>
          </div>
        </div>

        {/* Commit intensity heatmap */}
        <div className="services-how__item">
          <Reveal>
            <BunSectionHeading
              accent="var(--accent)"
              subtitle={t.deliverySubtitle}
            >
              {t.deliveryTitle}
            </BunSectionHeading>
          </Reveal>
          <div className="services-how__stage">
            <Reveal><BunCommitsHeatmapDefault /></Reveal>
          </div>
        </div>

        {/* Git log replay */}
        <div className="services-how__item">
          <Reveal>
            <BunSectionHeading
              accent="var(--accent)"
              subtitle={t.historySubtitle}
            >
              {t.historyTitle}
            </BunSectionHeading>
          </Reveal>
          <div className="services-how__stage">
            <Reveal><BunGitLogAnimation /></Reveal>
          </div>
        </div>
      </section>

    </div>

    {/* The single, shared contact block, identical to the home page bottom. */}
    <ContactGradient />
    </>
  );
};

export default ServicesPage;
