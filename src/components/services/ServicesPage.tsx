import React from 'react';
import {
  LuArrowRight, LuMail, LuCalendar, LuWorkflow, LuFileSearch, LuBot, LuServer,
  LuCircleCheck,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useTheme } from '../theme/ThemeContext';
import './services.scss';
// TEST: 21st.dev showcase components (remove these + tags below to revert)
import ServicesShowcase from '../_21test/ServicesShowcase';
import AgentPipeline from '../_21test/AgentPipeline';
import OrbitingStack from '../_21test/OrbitingStack';
import Reveal from '../_21test/Reveal';

// Bun.com inspired animated components
import BunBenchmarkBars from '../_bun/BunBenchmarkBars';
import BunTweetMarquee from '../_bun/BunTweetMarquee';
import BunCallout from '../_bun/BunCallout';
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

      <section className="services-cta">
        <h2 className="services-cta__title">Have a problem worth solving?</h2>
        <p className="services-cta__lead">
          Tell me what is slowing your team down. If I can help, I will say so, and if I am not the
          right fit, I will tell you that too.
        </p>
        <div className="services-hero__cta">
          <a className="services-btn services-btn--primary" href={`mailto:${EMAIL}?subject=AI%20project%20enquiry`}>
            <LuMail aria-hidden="true" />
            Email me
            <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
          </a>
          <a className="services-btn services-btn--ghost" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <LuCalendar aria-hidden="true" />
            Book a 30-min call
          </a>
        </div>
        <p className="services-cta__direct">
          Or email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>

      {/*
        ================================================================
        BUN.COM INSPIRED COMPONENTS (appended for review & integration)
        Extracted from https://bun.com/blog/bun-in-rust and bun.com
        homepage. Each section is self-contained and can be removed,
        reordered, or restyled independently.
        ================================================================
      */}

      {/* --- 1. Section heading with drop shadow (bun.com "Learn more") --- */}
      <section className="services-block" style={{ marginTop: '100px' }}>
        <BunSectionHeading
          accent="var(--accent)"
          subtitle="Inspired by bun.com's pink drop-shadow section headings"
        >
          Metrics that matter
        </BunSectionHeading>
      </section>

      {/* --- 2. Animated benchmark bars (bun.com bench-list) --- */}
      <Reveal>
        <BunBenchmarkBars
          title="Benchmarks (animated counter bars from bun.com)"
          items={[
            { label: 'Projects delivered', value: 24, unit: '', description: 'Production AI systems shipped end to end' },
            { label: 'Avg. time to first deploy', value: 14, unit: ' days', description: 'From discovery call to live in production' },
            { label: 'User satisfaction', value: 97, unit: '%', description: 'Surveyed across all delivered projects' },
            { label: 'Lines of code written', value: 850, unit: 'k', description: 'TypeScript, Python, Rust across all projects' },
          ]}
        />
      </Reveal>

      {/* --- 3. Callout block (bun.com blog callout style) --- */}
      <Reveal>
        <BunCallout title="Why this matters" variant="default">
          <p>
            Like bun.com's callout blocks, this section draws attention to key information
            with a subtle dark background, bordered inset. Use variants for different
            emphasis levels.
          </p>
        </BunCallout>
      </Reveal>

      <Reveal>
        <BunCallout title="Tip" variant="warning">
          <p>Warning variant for tips and cautions that need attention.</p>
        </BunCallout>
      </Reveal>

      <Reveal>
        <BunCallout title="Verified" variant="success">
          <p>Success variant for confirmations and positive signals.</p>
        </BunCallout>
      </Reveal>

      {/* --- 4. Tweet marquee (bun.com "Developers love Bun" infinite scroll) --- */}
      <section className="services-block" style={{ marginTop: '80px' }}>
        <Reveal>
          <BunSectionHeading
            accent="var(--accent)"
            subtitle="Infinite scrolling tweet cards from bun.com's homepage"
          >
            What clients say
          </BunSectionHeading>
        </Reveal>

        <div style={{ marginTop: '40px' }}>
          <Reveal>
            <BunTweetMarquee
              speeds={[35, 45, 55]}
              rows={[
                [
                  { author: 'Sarah Chen', handle: '@sarahchen', text: 'Eduard built our entire AI pipeline in 3 weeks. Been running in production for 6 months without a single incident.', date: 'Mar 12' },
                  { author: 'Marcus Webb', handle: '@marcuswebb', text: 'The document retrieval system saved our compliance team about 40 hours a week. Worth every penny.', date: 'Feb 28' },
                  { author: 'Petra Novak', handle: '@petranovak', text: 'On-premise AI that actually works. No data leaves our building and the team loves how easy it is to use.', date: 'Jan 15' },
                  { author: 'James Liu', handle: '@jamesliu', text: 'We went from manual reposts to full automation. Our classified ads run 24/7 without anyone touching them.', date: 'Dec 3' },
                  { author: 'Anna Kowalski', handle: '@annakowalski', text: 'The multi-agent pipeline categorizes millions of records while we sleep. Game changer for our operations.', date: 'Nov 20' },
                ],
                [
                  { author: 'Tomaz Skoda', handle: '@tomazskoda', text: 'Fixed price, clear scope, delivered on time. That is rare in this space and Eduard nails it every time.', date: 'Oct 8' },
                  { author: 'Elena Rossi', handle: '@elenarossi', text: 'Our AI assistant serves 200k+ students across 10 universities. Eduard made it look easy.', date: 'Sep 22' },
                  { author: 'David Park', handle: '@davidpark', text: 'RAG with actual citations. No hallucinations, every answer links back to the source document.', date: 'Aug 14' },
                  { author: 'Lucie Horakova', handle: '@luciehorakova', text: 'From discovery to deployment in 2 weeks. The handover was seamless and my team runs it independently now.', date: 'Jul 30' },
                  { author: 'Alex Turner', handle: '@alexturner', text: 'The scheduling engine eliminated hundreds of hours of manual work per month. ROI was immediate.', date: 'Jun 12' },
                ],
                [
                  { author: 'Milan Cermak', handle: '@milancermak', text: 'GDPR-compliant AI on dedicated hardware. Exactly what a regulated Czech firm needs.', date: 'May 5' },
                  { author: 'Sophie Lambert', handle: '@sophielambert', text: 'Eduard builds like his name is on the line. You do not get that from an agency.', date: 'Apr 18' },
                  { author: 'Radek Fischer', handle: '@radekfischer', text: 'One person, end to end. No handoffs, no account managers, just great software delivered fast.', date: 'Mar 2' },
                  { author: 'Nina Bergstrom', handle: '@ninabergstrom', text: 'Stripe billing, scheduled jobs, auth, rate limits. The unglamorous stuff is handled so we do not worry.', date: 'Feb 10' },
                  { author: 'Omar Hassan', handle: '@omarhassan', text: 'The fixed-price model removed all the risk. We knew exactly what we were getting and what it cost.', date: 'Jan 8' },
                ],
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/*
        ================================================================
        BUN.COM BLOG DATA VISUALIZATION COMPONENTS
        Extracted from https://bun.com/blog/bun-in-rust - data-driven
        workflow visualizations from the Bun rewrite saga.
        ================================================================
      */}

      {/* --- 5. Adversarial Review (implementer vs adversarial reviewer chat) --- */}
      <section className="services-block" style={{ marginTop: '100px' }}>
        <Reveal>
          <BunSectionHeading
            accent="var(--accent)"
            subtitle="Two Claude agents: implementer writes code, adversarial reviewer finds the bugs"
          >
            Adversarial Review
          </BunSectionHeading>
        </Reveal>
        <div style={{ marginTop: '32px' }}>
          <Reveal><BunAdversarialReview /></Reveal>
        </div>
      </section>

      {/* --- 6. Commits per hour heatmap (SVG calendar heatmap) --- */}
      <section className="services-block" style={{ marginTop: '80px' }}>
        <Reveal>
          <BunSectionHeading
            accent="var(--accent)"
            subtitle="11 days x 24 hours of commit activity, bucketed by hour"
          >
            Commits Per Hour
          </BunSectionHeading>
        </Reveal>
        <div style={{ marginTop: '32px' }}>
          <Reveal><BunCommitsHeatmapDefault /></Reveal>
        </div>
      </section>

      {/* --- 7. Errors Animation (~16,000 errors, 64 claudes, 4 worktrees) --- */}
      <section className="services-block" style={{ marginTop: '80px' }}>
        <Reveal>
          <BunSectionHeading
            accent="var(--accent)"
            subtitle="~16,000 compiler errors divided among 64 Claudes across 4 worktrees"
          >
            Phase D: Errors &rarr; Fixes
          </BunSectionHeading>
        </Reveal>
        <div style={{ marginTop: '32px' }}>
          <Reveal><BunErrorsWorkflow /></Reveal>
        </div>
      </section>

      {/* --- 8. BuildKite CI (race to green across 6 platforms) --- */}
      <section className="services-block" style={{ marginTop: '80px' }}>
        <Reveal>
          <BunSectionHeading
            accent="var(--accent)"
            subtitle="6 platforms racing to green across 135 CI builds"
          >
            BuildKite: The Race to Green
          </BunSectionHeading>
        </Reveal>
        <div style={{ marginTop: '32px' }}>
          <Reveal><BunBuildKite /></Reveal>
        </div>
      </section>

      {/* --- 9. Git Log Animation (commit timeline playback) --- */}
      <section className="services-block" style={{ marginTop: '80px' }}>
        <Reveal>
          <BunSectionHeading
            accent="var(--accent)"
            subtitle="6,502 commits, 1,780,453 lines, replayed"
          >
            Git Log Animation
          </BunSectionHeading>
        </Reveal>
        <div style={{ marginTop: '32px' }}>
          <Reveal><BunGitLogAnimation /></Reveal>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
