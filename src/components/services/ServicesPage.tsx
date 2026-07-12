import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight, LuPlus, LuCircleCheck } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import SectionMarker from '../common/SectionMarker';
import './services.scss';
import './services-featured.scss';
// 21st.dev showcase components, curated under the "In action" section below.
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

// Step numbers stay here; the titles/bodies come from the dict.
const STEP_NUMBERS = ['01', '02', '03', '04'];

const ServicesPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('services');
  // Accordion state for the services index; the first row starts open so the
  // pattern is discoverable. Opening a row does not close the others.
  const [openRows, setOpenRows] = useState<Set<number>>(() => new Set([0]));
  const toggleRow = (i: number) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
  };

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
        <div className="services-cta-repeat services-cta-repeat--hero">
          <h2 className="services-cta-repeat__title">{t.ctaRepeatTitle}</h2>
          <a className="services-btn services-btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {t.ctaConsult}
            <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
          </a>
          <p className="services-hero__alt">
            {t.ctaAltPrefix}{' '}
            <a href={`mailto:${EMAIL}?subject=AI%20project%20enquiry`}>{EMAIL}</a>
            {' '}{t.ctaAltOr}{' '}
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          </p>
        </div>
      </header>

      {/* Proof strip: quiet, ruled, typographic. The hero button stays the
          boldest element on the page. */}
      <Reveal className="services-stats" as="section">
        <p className="services-stats__kicker">{t.signalKicker}</p>
        <div className="services-stats__grid">
          {t.signals.map((s) => (
            <div className="services-stats__item" key={s.label}>
              <div className="services-stats__value">{s.value}</div>
              <div className="services-stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

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

      <div className="services-marker"><SectionMarker index="01" label={t.sectionServices} /></div>
      <section className="services-block" aria-labelledby="what-i-do">
        <Reveal><h2 className="services-block__title" id="what-i-do">{t.whatIDo}</h2></Reveal>
        <ul className="services-index">
          {t.services.map((s, i) => {
            const open = openRows.has(i);
            const panelId = `svc-panel-${i}`;
            return (
              <Reveal as="li" className="services-index__row" key={s.question} delay={i * 70}>
                <button
                  type="button"
                  className="services-index__head"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggleRow(i)}
                >
                  <span className="services-index__n">{STEP_NUMBERS[i]}</span>
                  <span className="services-index__q">{s.question}</span>
                  <LuPlus className="services-index__mark" aria-hidden="true" />
                </button>
                <div id={panelId} className="services-index__panel" data-open={open ? 'true' : 'false'}>
                  <div className="services-index__panel-inner">
                    <p className="services-index__outcome">{s.outcome}</p>
                    <p className="services-index__deliverables">
                      <span className="services-index__deliverables-label">{t.youGet}</span>
                      {s.deliverables.map((d, j) => (
                        <span className="services-index__deliverable" key={d}>
                          {j > 0 && <span className="services-index__dot" aria-hidden="true">·</span>}
                          {d}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Curated demos: agent diagram, run demo, integrations stack. */}
      <div className="services-marker"><SectionMarker index="02" label={t.sectionDemo} /></div>
      <section className="services-block services-demo" aria-labelledby="in-action">
        <Reveal>
          <h2 className="services-block__title" id="in-action">{t.demoTitle}</h2>
          <p className="services-demo__lead">{t.demoLead}</p>
        </Reveal>
        <div className="services-demo__stage"><Reveal><AgentPipeline /></Reveal></div>
        <div className="services-demo__stage"><Reveal><ServicesShowcase /></Reveal></div>
        <div className="services-demo__stage"><Reveal><OrbitingStack /></Reveal></div>
      </section>

      <div className="services-marker"><SectionMarker index="03" label={t.sectionWhyMe} /></div>
      <section className="services-block" aria-labelledby="why-me">
        <Reveal><h2 className="services-block__title" id="why-me">{t.whyMe}</h2></Reveal>
        <ul className="services-proof">
          {t.proof.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 80}><LuCircleCheck aria-hidden="true" /> <span>{p}</span></Reveal>
          ))}
        </ul>
      </section>

      <div className="services-marker"><SectionMarker index="04" label={t.sectionProcess} /></div>
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
      <div className="services-marker"><SectionMarker index="05" label={t.sectionMethod} /></div>
      <section className="services-block services-how" aria-labelledby="how-i-work">
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

      {/* Closing CTA: the same block as the hero, and nothing after it. */}
      <Reveal className="services-cta-repeat" as="section">
        <h2 className="services-cta-repeat__title">{t.ctaRepeatTitle}</h2>
        <a className="services-btn services-btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          {t.ctaConsult}
          <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
        </a>
        <p className="services-hero__alt">
          {t.ctaAltPrefix}{' '}
          <a href={`mailto:${EMAIL}?subject=AI%20project%20enquiry`}>{EMAIL}</a>
          {' '}{t.ctaAltOr}{' '}
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
        </p>
      </Reveal>

    </div>
    </>
  );
};

export default ServicesPage;
