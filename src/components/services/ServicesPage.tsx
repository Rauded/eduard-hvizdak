import React from 'react';
import {
  LuArrowRight, LuMail, LuCalendar, LuWorkflow, LuFileSearch, LuBot, LuServer,
  LuCircleCheck,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useTheme } from '../theme/ThemeContext';
import Contact from '../contact/contact';
import './services.scss';
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

// Specific problem → specific outcome. Each card names a real thing I built and
// the concrete result, not a generic capability.
const SERVICES = [
  {
    icon: <LuWorkflow />,
    title: 'Kill the copy-paste busywork',
    outcome: 'Give your team back the hours they lose to repetitive manual work.',
    example: 'A power seller was deleting and re-posting dozens of classified ads by hand every single day to stay at the top of the category. I replaced the whole grind with a scheduling engine that re-lists automatically, around the clock.',
    metric: 'Dozens of manual reposts a day → fully automated',
  },
  {
    icon: <LuFileSearch />,
    title: 'Turn document piles into instant answers',
    outcome: 'Ask in plain language, get an answer cited to the exact source.',
    example: 'For a public-contracts platform I built a retrieval system (vector search + reranking + fact-verification) over millions of government contracts, so staff find the exact clause in seconds instead of digging through PDFs, with a citation every time.',
    metric: 'Millions of documents · answers in seconds, with sources',
  },
  {
    icon: <LuBot />,
    title: 'Agents that do the work, not just chat',
    outcome: 'Hand off a whole process: read, research, verify, summarize, act.',
    example: 'An autonomous multi-agent pipeline running OCR, scraping, search, fact-verification and LLM summarization end to end, categorizing millions of records in parallel with a human in the loop where it counts.',
    metric: 'OCR → retrieve → verify → summarize, unattended',
  },
  {
    icon: <LuServer />,
    title: 'Private AI that never leaves your building',
    outcome: 'The leverage of AI without shipping sensitive data to someone else’s cloud.',
    example: 'For Czech and Slovak firms I deploy AI assistants on dedicated hardware installed on-site: GDPR-friendly, InfoSec-hardened and fully managed, so a non-technical team gets value from day one without babysitting it.',
    metric: 'On-premise · GDPR · fully managed',
  },
];

// Bold, specific numbers for the signature band.
const SIGNALS = [
  { value: 'Millions', label: 'of public contracts categorized and made searchable in parallel' },
  { value: '200k+', label: 'students served by an AI assistant across 10 European universities' },
  { value: 'End to end', label: 'one person scopes it, builds it, ships it, and hands it over' },
];

const PROOF = [
  'Real production systems with paying customers (InzerPro, NasadClaw, KouzelnikNaAkci), not demos that die after the pitch.',
  'RAG in the wild: vector search, BM25, MMR retrieval and LLM reranking, plus fact-verification so answers stay grounded in the source.',
  'The unglamorous parts are handled: scheduled jobs that fire on time, Stripe billing with trials and failed-payment recovery, auth, rate limits, on-prem hardening.',
  'One person, end to end. No agency layers, no handoffs, no account manager between you and the person writing the code.',
];

const STEPS = [
  { n: '01', title: 'Discovery call', body: 'A short call to find the specific bottleneck, who it hurts, and what a good outcome is actually worth in hours or money.' },
  { n: '02', title: 'Scope and fixed price', body: 'A written scope with one clear deliverable, a timeline and a fixed price. You know exactly what you get and what it costs before we start.' },
  { n: '03', title: 'Build in the open', body: 'I build in short cycles and show working software early, so we correct course while it is still cheap to change.' },
  { n: '04', title: 'Deploy and hand over', body: 'It goes live in your environment, documented, with a handover so your team can run it without me on retainer.' },
];

const ServicesPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
    <div className="services" data-theme={theme}>
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
          I help teams put AI to work on real problems: automating the manual work that slows them
          down, making their documents answerable, and deploying systems that run reliably in
          production. Scoped, built and delivered end to end.
        </p>
        <div className="services-hero__cta">
          <a className="services-btn services-btn--primary" href={`mailto:${EMAIL}?subject=AI%20project%20enquiry`}>
            <LuMail aria-hidden="true" />
            Start a conversation
            <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
          </a>
          <a className="services-btn services-btn--ghost" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <LuCalendar aria-hidden="true" />
            Book a 30-min call
          </a>
        </div>
      </header>

      {/* Signature band: the one bold, unmissable moment. */}
      <Reveal className="services-signal" as="section">
        <p className="services-signal__kicker">Shipped, in production, at scale</p>
        <div className="services-signal__grid">
          {SIGNALS.map((s) => (
            <div className="services-signal__item" key={s.label}>
              <div className="services-signal__value">{s.value}</div>
              <div className="services-signal__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="services-block" aria-labelledby="what-i-do">
        <Reveal><h2 className="services-block__title" id="what-i-do">What I do</h2></Reveal>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="services-card">
                <span className="services-card__icon">{s.icon}</span>
                <h3 className="services-card__title">{s.title}</h3>
                <p className="services-card__outcome">{s.outcome}</p>
                <p className="services-card__body">{s.example}</p>
                <p className="services-card__metric">{s.metric}</p>
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
        <Reveal><h2 className="services-block__title" id="why-me">Why work with me</h2></Reveal>
        <ul className="services-proof">
          {PROOF.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 80}><LuCircleCheck aria-hidden="true" /> <span>{p}</span></Reveal>
          ))}
        </ul>
      </section>

      <section className="services-block" aria-labelledby="how-it-works">
        <Reveal><h2 className="services-block__title" id="how-it-works">How it works</h2></Reveal>
        <ol className="services-steps">
          {STEPS.map((step, i) => (
            <Reveal as="li" className="services-step" key={step.n} delay={i * 80}>
              <span className="services-step__n">{step.n}</span>
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
          <p className="services-how__eyebrow">Under the hood</p>
          <h2 className="services-block__title" id="how-i-work">How I actually build</h2>
          <p className="services-how__lead">
            AI does not ship production software on its own. These are live visualizations of a
            real, large-scale AI-assisted engineering effort, shown as an example of how I run the
            work: many agents in parallel, an adversarial reviewer hunting every bug, and nothing
            merged until it is green everywhere.
          </p>
        </Reveal>

        {/* Adversarial review: implementer writes, reviewer refutes */}
        <div className="services-how__item">
          <Reveal>
            <BunSectionHeading
              accent="var(--accent)"
              subtitle="One agent writes the code, a second agent is told to break it. This is how I keep AI-generated code honest before it ever reaches you."
            >
              Adversarial review
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
              subtitle="Thousands of compiler errors split across many agents and worktrees, then cleared in batches. This is how I parallelize a migration that would take one person months."
            >
              Errors, cleared in parallel
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
              subtitle="Every change raced to green across every platform before it ships. Nothing goes live on a red build."
            >
              Shipped only when it is green
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
              subtitle="Commit activity by hour across the sprint: what steady, high-throughput delivery actually looks like."
            >
              Delivery, hour by hour
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
              subtitle="The whole effort replayed commit by commit: the scale of change behind a single shipped result."
            >
              The full history, replayed
            </BunSectionHeading>
          </Reveal>
          <div className="services-how__stage">
            <Reveal><BunGitLogAnimation /></Reveal>
          </div>
        </div>
      </section>

    </div>

    {/* The single, shared contact block, identical to the home page. */}
    <Contact />
    </>
  );
};

export default ServicesPage;
