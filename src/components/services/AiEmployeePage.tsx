import React from 'react';
import {
  LuArrowRight, LuMail, LuPhone, LuCalendar, LuMessageSquare, LuSearch, LuFileText,
  LuBell, LuShieldCheck, LuScrollText, LuUserCheck, LuServer, LuCircleCheck, LuMinus,
  LuSlack, LuGithub, LuDatabase, LuMail as LuMailbox, LuFolder, LuTable, LuTicket, LuCalendarClock,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
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

// What the agent can actually do, framed as jobs-to-be-done, not features.
const CAPABILITIES = [
  {
    icon: <LuMessageSquare />,
    title: 'Ask it anything about the business',
    body: 'One chat box in Slack and on the web. It knows where the answer lives, pulls it from the right system, and replies with the source attached.',
  },
  {
    icon: <LuSearch />,
    title: 'Investigate across every tool at once',
    body: 'A question that used to mean checking five apps and messaging three people gets answered in a minute, with the trail of where it looked.',
  },
  {
    icon: <LuFileText />,
    title: 'Produce the finished artifact',
    body: 'The updated deck, the drafted contract reply, the filled RFP, the ticket summary. Real output back in your tools, not a chat message telling you what to change.',
  },
  {
    icon: <LuBell />,
    title: 'Act before it is asked',
    body: 'A ticket lands, a review comes in, a deadline nears. It takes the first pass and brings a person in only when judgment is actually needed.',
  },
];

// The trust story. This is what turns "give AI access to everything" from a
// non-starter into a yes.
const SECURITY = [
  {
    icon: <LuUserCheck />,
    title: 'It inherits each person’s access',
    body: 'The agent can only see what that specific employee is already allowed to see. Nobody gets a backdoor to data they could not open themselves.',
  },
  {
    icon: <LuScrollText />,
    title: 'Every action is logged',
    body: 'A full audit trail of what was read, what was done, and on whose behalf. You can always answer "who touched this, and when".',
  },
  {
    icon: <LuShieldCheck />,
    title: 'Policy enforced at every step',
    body: 'Sensitive systems and customer data are fenced off with rules checked on every single tool call, not trusted to the model to remember.',
  },
  {
    icon: <LuServer />,
    title: 'Runs where your data lives',
    body: 'Cloud, your own tenant, or fully on your servers for regulated work. Nothing sensitive has to leave your building. EU-based and GDPR-minded by default.',
  },
];

// Integrations the agent commonly connects to. Illustrative, not exhaustive.
const CONNECTORS = [
  { icon: <LuSlack />, label: 'Slack' },
  { icon: <LuMailbox />, label: 'Email' },
  { icon: <LuGithub />, label: 'GitHub' },
  { icon: <LuTicket />, label: 'CRM' },
  { icon: <LuTable />, label: 'Spreadsheets' },
  { icon: <LuFolder />, label: 'Drive / Docs' },
  { icon: <LuDatabase />, label: 'Your database' },
  { icon: <LuTicket />, label: 'Helpdesk' },
  { icon: <LuCalendarClock />, label: 'Calendar' },
  { icon: <LuScrollText />, label: 'Internal wiki' },
];

// The engagement, phase by phase, so a prospect can see exactly how it goes.
const PROCESS = [
  {
    n: '01',
    title: 'Discovery workshop',
    dur: 'Week 0, half a day',
    body: 'We map the jobs your team actually does, the tools those jobs touch, and where the hours leak. We pick one flagship workflow to prove value on first, and agree what a good outcome is worth.',
  },
  {
    n: '02',
    title: 'Scope, security review, fixed price',
    dur: 'Week 0–1',
    body: 'You get a written scope: which systems connect, who gets access, the security model, one measurable success metric, a timeline, and a fixed price. Your IT signs off on access before anything is wired.',
  },
  {
    n: '03',
    title: 'Pilot build',
    dur: 'Week 1–3',
    body: 'I connect the first tools, stand up the agent in Slack and on the web behind the access gateway, and ship the flagship workflow. You are using it and giving feedback while it is still cheap to change.',
  },
  {
    n: '04',
    title: 'Company rollout',
    dur: 'Week 3–10',
    body: 'We widen it: more connectors, more workflows, proactive automations, artifact write-back into your systems of record. Access, audit logging, and cost controls are hardened as the surface grows.',
  },
  {
    n: '05',
    title: 'Handover and care',
    dur: 'Ongoing',
    body: 'Documented, with training for your team so it runs without me. Then an optional care plan keeps the connectors healthy, tunes cost, and adds new workflows as you find them.',
  },
];

// Pricing. "From" figures give room to scope up; usage billed at cost.
const TIERS = [
  {
    name: 'Proof of Value',
    tag: 'Start here',
    price: 'from €4,900',
    priceNote: 'fixed, one-off',
    dur: '~3 weeks',
    blurb: 'Prove it saves real hours on one workflow before any bigger commitment.',
    features: [
      { t: 'One team, one flagship workflow', on: true },
      { t: 'Up to 3 tool connections', on: true },
      { t: 'Chat in Slack + on the web', on: true },
      { t: 'Per-user access + audit logging', on: true },
      { t: 'Measured against one success metric', on: true },
      { t: 'Company-wide rollout', on: false },
      { t: 'Proactive automations', on: false },
      { t: 'Ongoing care', on: false },
    ],
    cta: 'Book the discovery call',
    featured: false,
  },
  {
    name: 'Company Rollout',
    tag: 'Most teams',
    price: 'from €18,000',
    priceNote: 'fixed, project',
    dur: '6–10 weeks',
    blurb: 'One agent across the whole company, wired into your stack and handed over to your team.',
    features: [
      { t: 'Single agent for the whole company', on: true },
      { t: 'Up to ~8 tool connections', on: true },
      { t: 'Secure access gateway + full audit trail', on: true },
      { t: 'Proactive automations', on: true },
      { t: 'Writes finished artifacts back to your tools', on: true },
      { t: 'On-prem / your-tenant deployment option', on: true },
      { t: 'Team training + full handover docs', on: true },
      { t: 'Everything in Proof of Value', on: true },
    ],
    cta: 'Book the discovery call',
    featured: true,
  },
  {
    name: 'Care & Scale',
    tag: 'After launch',
    price: 'from €1,900',
    priceNote: 'per month',
    dur: 'rolling, cancel anytime',
    blurb: 'Keep it healthy and growing: new workflows, cost tuning, monitoring, a monthly outcome report.',
    features: [
      { t: 'Connectors kept working as your tools change', on: true },
      { t: 'New workflows added each month', on: true },
      { t: 'Model routing + cost optimization', on: true },
      { t: 'Monitoring, uptime, and error triage', on: true },
      { t: 'Monthly outcome report', on: true },
      { t: 'Priority access to me', on: true },
      { t: 'Model / API usage billed at cost', on: true },
      { t: 'No lock-in, cancel anytime', on: true },
    ],
    cta: 'Add after your build',
    featured: false,
  },
];

// What the client needs to bring for a smooth build.
const CLIENT_PROVIDES = [
  'A decision-maker who can approve which systems the agent connects to.',
  'Admin or API access to the tools in scope (Slack, email, CRM, docs, database, and so on), granted through your normal IT process.',
  'One person per team to name the workflows that eat the most time.',
  'A short list of what counts as sensitive data, so we fence it correctly.',
  'Sign-off on the security model before anything goes live.',
];

const FAQ = [
  {
    q: 'Is our data safe if one agent can see everything?',
    a: 'It never sees more than the person using it already can. Access is inherited per employee, every action is logged, policy is enforced on each tool call, and for regulated work the whole thing runs on your own infrastructure so nothing sensitive leaves your building.',
  },
  {
    q: 'Do we have to replace our current tools?',
    a: 'No. The agent sits across your existing tools. GitHub keeps the code, your CRM keeps the accounts, your drive keeps the docs. The agent is the layer that reads from and writes to them.',
  },
  {
    q: 'What does it cost to run after it is built?',
    a: 'Two things: an optional care plan, and model usage billed at cost. Usage scales with how much the team leans on it. I set up routing so each task uses the cheapest model that can do it well, and I show you the numbers.',
  },
  {
    q: 'What if the pilot does not prove out?',
    a: 'That is the point of starting small and fixed-price. You get a working system and a clear read on the hours saved before deciding whether to roll it out company-wide. No open-ended spend.',
  },
];

const AiEmployeePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="services" data-theme={theme}>
        <Seo
          title="An AI Employee for Your Whole Company"
          description="A single AI agent connected to your entire company that your team can chat with, that investigates across every tool, produces finished work, and runs securely with per-user access and a full audit trail."
          path="/services/ai-employee"
          noindex
        />

        <header className="services-hero aie-hero">
          <span className="services-hero__eyebrow">Private proposal &middot; AI Employee</span>
          <h1 className="services-hero__title">
            One AI agent that knows your whole company.
          </h1>
          <p className="services-hero__lead">
            Not another chatbot bolted onto one app. A single agent your whole team talks to in
            Slack and on the web, connected to the tools you already use, that investigates across
            all of them, produces the finished work, and does it under a security model your IT
            can sign off on.
          </p>
          <div className="services-hero__cta">
            <a className="services-btn services-btn--primary svc-free-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <span className="svc-free-btn__shine" aria-hidden="true" />
              <LuCalendar aria-hidden="true" />
              Book a discovery call
              <LuArrowRight className="services-btn__arrow" aria-hidden="true" />
            </a>
            <a className="services-btn services-btn--ghost" href={`mailto:${EMAIL}?subject=AI%20Employee%20enquiry`}>
              <LuMail aria-hidden="true" />
              Email me
            </a>
            <a className="services-btn services-btn--ghost" href={`tel:${PHONE}`}>
              <LuPhone aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </header>

        {/* What it does */}
        <section className="services-block" aria-labelledby="aie-what">
          <Reveal><h2 className="services-block__title" id="aie-what">What it actually does</h2></Reveal>
          <div className="services-grid">
            {CAPABILITIES.map((c, i) => (
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
          <p className="aie-connectors__kicker">Connects to the tools you already run</p>
          <div className="aie-connectors__grid">
            {CONNECTORS.map((c) => (
              <div className="aie-connector" key={c.label}>
                <span className="aie-connector__icon">{c.icon}</span>
                <span className="aie-connector__label">{c.label}</span>
              </div>
            ))}
          </div>
          <p className="aie-connectors__note">
            If it has an API or a login, it can almost certainly be connected. These are the common
            ones; we scope your exact stack in discovery.
          </p>
        </Reveal>

        {/* Security */}
        <section className="services-block" aria-labelledby="aie-secure">
          <Reveal>
            <p className="services-how__eyebrow">The part that lets you say yes</p>
            <h2 className="services-block__title" id="aie-secure">Built so it can be trusted with everything</h2>
            <p className="aie-lead-muted">
              Giving one agent reach across the company is only safe with the right guardrails.
              These are non-negotiable and they are in from day one, not bolted on later.
            </p>
          </Reveal>
          <div className="services-grid aie-grid-2">
            {SECURITY.map((s, i) => (
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
          <Reveal><h2 className="services-block__title" id="aie-process">How the engagement runs</h2></Reveal>
          <ol className="services-steps aie-steps">
            {PROCESS.map((step, i) => (
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
          <Reveal><h2 className="services-block__title" id="aie-pricing">Investment</h2></Reveal>
          <Reveal>
            <p className="aie-lead-muted">
              Fixed prices, scoped in writing before we start. Figures are a starting point; the
              discovery call sets the exact number. Model usage is always billed at cost, with the
              meter visible to you.
            </p>
          </Reveal>
          <div className="aie-tiers">
            {TIERS.map((tier, i) => (
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
          <Reveal><h2 className="services-block__title" id="aie-provide">What you provide</h2></Reveal>
          <ul className="services-proof">
            {CLIENT_PROVIDES.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 70}><LuCircleCheck aria-hidden="true" /> <span>{p}</span></Reveal>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="services-block" aria-labelledby="aie-faq">
          <Reveal><h2 className="services-block__title" id="aie-faq">Questions you are probably asking</h2></Reveal>
          <div className="aie-faq">
            {FAQ.map((f, i) => (
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
