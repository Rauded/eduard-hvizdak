import React from 'react';
import {
  LuWorkflow, LuFileSearch, LuBot, LuServer, LuCircleCheck,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import './services.scss';

const EMAIL = 'eduardd.hv@gmail.com';
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';

// Outcome-first offerings. Each leads with the result a client gets, not the
// technology behind it.
const SERVICES = [
  {
    icon: <LuWorkflow />,
    title: 'Automate manual workflows',
    outcome: 'Reclaim the hours your team loses to repetitive work.',
    body: 'I map a manual process, data entry, cross-posting, reporting, reconciliation, and replace it with a pipeline that runs on its own and tells you when something needs a human.',
  },
  {
    icon: <LuFileSearch />,
    title: 'Make your documents answerable',
    outcome: 'Turn contracts, reports and archives into instant answers.',
    body: 'Retrieval systems (RAG) that let your people ask questions in plain language and get answers with citations back to the source, instead of digging through folders.',
  },
  {
    icon: <LuBot />,
    title: 'Put AI agents to work',
    outcome: 'Hand off multi-step tasks, not just single prompts.',
    body: 'Orchestrated agents that carry out real work against your tools and data, with guardrails, logging and a human in the loop where it matters.',
  },
  {
    icon: <LuServer />,
    title: 'Deploy AI in-house',
    outcome: 'Get AI without sending your data to third parties.',
    body: 'Private, on-premise model deployment on your own hardware, with the security hardening and maintenance that regulated teams need.',
  },
];

const PROOF = [
  'Production systems with real, paying customers, not demos.',
  'One person end to end: I scope it, build it, ship it, and hand it over. No agency overhead.',
  'Built on a modern, dependable stack: Python, FastAPI, LangChain, vector search, Supabase, Stripe.',
  'Comfortable with the hard parts: scheduled jobs, billing, auth, rate limits, and reliability at scale.',
];

const STEPS = [
  { title: 'Discovery call', body: 'A short call to understand the problem, the stakeholders, and what a good outcome actually looks like.' },
  { title: 'Scope and proposal', body: 'A written scope with a clear deliverable, timeline and fixed price. You know exactly what you are getting.' },
  { title: 'Build and iterate', body: 'I build in short cycles and show working software early, so we correct course before it is expensive.' },
  { title: 'Deploy and hand over', body: 'The system goes live in your environment, documented, with a handover so your team can run it without me.' },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="services">
      <Seo
        title="AI Consulting & Automation"
        description="AI consulting and automation for teams: workflow automation, document intelligence and RAG, AI agents, and private on-premise deployment. Scoped, built, and shipped end to end by Eduard Hvizdak."
        path="/services"
      />

      <header className="services-hero">
        <span className="services-hero__eyebrow">AI Consulting &amp; Automation</span>
        <h1 className="services-hero__title">
          I ship AI systems that pay for themselves.
        </h1>
        <p className="services-hero__lead">
          I help teams automate the manual work that slows them down, make their
          documents answerable, and run AI reliably in production.
        </p>
        <div className="services-hero__cta">
          <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
        </div>
      </header>

      <section className="services-block" aria-labelledby="what-i-do">
        <h2 className="services-block__title" id="what-i-do">What I do</h2>
        <div className="services-rows">
          {SERVICES.map((s) => (
            <article className="services-row" key={s.title}>
              <h3 className="services-row__title">
                <span className="services-row__icon">{s.icon}</span>
                {s.title}
              </h3>
              <p className="services-row__body">
                <strong className="services-row__outcome">{s.outcome}</strong>{' '}
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-block" aria-labelledby="why-me">
        <h2 className="services-block__title" id="why-me">Why work with me</h2>
        <ul className="services-proof">
          {PROOF.map((p) => (
            <li key={p}><LuCircleCheck aria-hidden="true" /> <span>{p}</span></li>
          ))}
        </ul>
      </section>

      <section className="services-block" aria-labelledby="how-it-works">
        <h2 className="services-block__title" id="how-it-works">How it works</h2>
        <ol className="services-steps">
          {STEPS.map((step) => (
            <li className="services-step" key={step.title}>
              <h3 className="services-step__title">{step.title}</h3>
              <p className="services-step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="services-cta">
        <h2 className="services-cta__title">Have a problem worth solving?</h2>
        <p className="services-cta__lead">
          Tell me what is slowing your team down. If I can help, I will say so, and if I am not the
          right fit, I will tell you that too.
        </p>
        <div className="services-cta__actions">
          <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          <a className="services-cta__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
