import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowLeft, LuArrowRight, LuCalendar, LuMail, LuExternalLink, LuRefreshCw,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import Reveal from '../_21test/Reveal';
import { asset } from '../portfolio/projectsData';
import './czs-chatbot.scss';

const demoVideo = asset('inzerpro.mp4');
const demoPoster = asset('inzerpro-poster.webp');

// The czs-* classes are the shared case-study design system (hero, metric
// band, mix bar, pipeline nodes, mock windows, win tiles, CTA); this page
// reuses them wholesale so both case studies stay visually identical.

const EMAIL = 'eduardd.hv@gmail.com';
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';

// Marketplace favicons, the same set the InzerPro app itself uses. Bazos and
// the third-party icons are the official ones; bazar-sk.svg is a vector
// recreation of their favicon (the original only exists at 16px).
const MKT_ICONS: Record<string, string> = {
  'bazos-cz': '/brand/marketplaces/bazos.svg',
  'bazos-sk': '/brand/marketplaces/bazos.svg',
  'bazar-cz': '/brand/marketplaces/bazar-cz.png',
  'bazar-sk': '/brand/marketplaces/bazar-sk.svg',
  'aukro': '/brand/marketplaces/aukro.png',
};

// Anonymized illustrative rows for the Scheduled jobs mock. No real customer
// data: invented listings, times and statuses.
const JOB_ROWS = [
  { id: 9312, action: 'relist', mkt: 'bazos-cz', market: 'Bazoš.cz', listing: 'iPhone 13, 128 GB', when: '06:00', status: 'ok' },
  { id: 9311, action: 'relist', mkt: 'bazos-sk', market: 'Bazoš.sk', listing: 'iPhone 13, 128 GB', when: '06:00', status: 'ok' },
  { id: 9310, action: 'post', mkt: 'bazar-cz', market: 'Bazar.cz', listing: 'Skoda Octavia III 2.0 TDI', when: '05:45', status: 'ok' },
  { id: 9309, action: 'relist', mkt: 'bazar-sk', market: 'Bazar.sk', listing: 'Detsky bicykel 16"', when: '05:30', status: 'retry' },
  { id: 9308, action: 'delete', mkt: 'bazos-cz', market: 'Bazoš.cz', listing: 'Herna konzole PS5 (sold)', when: '05:15', status: 'ok' },
  { id: 9307, action: 'relist', mkt: 'bazos-sk', market: 'Bazoš.sk', listing: 'Sedaci souprava, rohova', when: '05:00', status: 'ok' },
];

const CANARY_ROWS = [
  { check: 'Relay reachable', detail: 'POST /health via residential proxy', ok: true },
  { check: 'Proxy exit country', detail: 'CZ (required for Bazos)', ok: true },
  { check: 'Credentials valid', detail: '4 of 4 marketplace logins', ok: true },
  { check: 'Image acceptance', detail: 'test upload passed pixel dedup', ok: true },
];

const InzerproCaseStudyPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('inzerproCaseStudy');

  return (
    <div className="czs" data-theme={theme}>
      <Seo title={t.seo.title} description={t.seo.description} path="/projects/inzerpro" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="czs-hero">
        <Link to="/" className="czs-back"><LuArrowLeft aria-hidden="true" /> {t.back}</Link>
        <img className="czs-clientlogo" src="/brand/sites/inzerpro.svg" alt="InzerPro" width="48" height="48" />
        <span className="czs-eyebrow">{t.hero.eyebrow}</span>
        <h1 className="czs-hero__title">{t.hero.title}</h1>
        <p className="czs-hero__lead" dangerouslySetInnerHTML={{ __html: t.hero.lead }} />
        <div className="czs-hero__cta">
          <a className="czs-btn czs-btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <LuCalendar aria-hidden="true" /> {t.hero.book}
            <LuArrowRight className="czs-btn__arrow" aria-hidden="true" />
          </a>
          <a className="czs-btn czs-btn--ghost" href={`mailto:${EMAIL}?subject=Automation%20enquiry`}>
            <LuMail aria-hidden="true" /> {t.hero.email}
          </a>
          <a className="czs-btn czs-btn--ghost" href={t.hero.liveUrl} target="_blank" rel="noopener noreferrer">
            <LuExternalLink aria-hidden="true" /> {t.hero.live}
          </a>
        </div>
        <dl className="czs-meta">
          {t.hero.meta.map(m => (
            <div className="czs-meta__item" key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ── Hero proof: the live product ─────────────────────── */}
      <Reveal as="figure" className="czs-herofig">
        <div className="czs-frame czs-frame--browser">
          <span className="czs-frame__bar">
            <span className="czs-frame__dots"><i /><i /><i /></span>
            <span className="czs-frame__url">www.inzerpro.cz</span>
          </span>
          <video src={demoVideo} poster={demoPoster} autoPlay muted loop playsInline aria-label="InzerPro dashboard walkthrough" />
        </div>
        <figcaption className="czs-caption">{t.hero.figureCaption}</figcaption>
      </Reveal>

      {/* ── Metric band ──────────────────────────────────────── */}
      <Reveal as="section" className="czs-metrics" aria-label="Key numbers">
        {t.metrics.map(m => (
          <div className="czs-metric" key={m.label}>
            <span className="czs-metric__value pixel-accent">{m.value}</span>
            <span className="czs-metric__label">{m.label}</span>
          </div>
        ))}
      </Reveal>

      {/* ── Problem ──────────────────────────────────────────── */}
      <section className="czs-block">
        <Reveal><span className="czs-kicker">01 / Problem</span><h2 className="czs-block__title">{t.problem.title}</h2></Reveal>
        <Reveal><p className="czs-prose" dangerouslySetInnerHTML={{ __html: t.problem.body }} /></Reveal>
        <Reveal className="czs-mix">
          <span className="czs-mix__label">{t.problem.corpusLabel}</span>
          <div className="czs-mkts">
            {t.problem.marketplaces.map(m => (
              <div className="czs-mkt" key={m.id}>
                <img className="czs-mkt__icon" src={MKT_ICONS[m.id]} alt={m.name} width="28" height="28" loading="lazy" />
                <span className="czs-mkt__meta">
                  <span className="czs-mkt__name">{m.name} <span className={`czs-badge ${m.badge === 'live' ? 'ok' : 'changed'}`}>{m.badge}</span></span>
                  <span className="czs-mkt__detail">{m.detail}</span>
                </span>
              </div>
            ))}
          </div>
          <span className="czs-mix__before">{t.problem.before}</span>
        </Reveal>
      </section>

      {/* ── Product ──────────────────────────────────────────── */}
      <section className="czs-block">
        <Reveal><span className="czs-kicker">02 / Product</span><h2 className="czs-block__title">{t.product.title}</h2></Reveal>
        <div className="czs-prose">
          {t.product.body.map((p, i) => <Reveal key={i}><p dangerouslySetInnerHTML={{ __html: p }} /></Reveal>)}
        </div>
      </section>

      {/* ── Architecture ─────────────────────────────────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">03 / System</span><h2 className="czs-block__title">{t.architecture.title}</h2></Reveal>
        <div className="czs-prose">
          {t.architecture.body.map((p, i) => <Reveal key={i}><p dangerouslySetInnerHTML={{ __html: p }} /></Reveal>)}
        </div>

        <Reveal className="czs-pipe">
          <span className="czs-pipe__label">{t.architecture.stepsLabel}</span>
          <ol className="czs-pipe__row">
            {t.architecture.steps.map((s, i) => (
              <li className="czs-node" key={s.k}>
                <span className="czs-node__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="czs-node__k">{s.k}</span>
                <span className="czs-node__v">{s.v}</span>
              </li>
            ))}
          </ol>
          <div className="czs-pipe__loop">
            <LuRefreshCw aria-hidden="true" />
            <span className="czs-pipe__loop-label">{t.architecture.freshnessLabel}:</span>
            <span dangerouslySetInnerHTML={{ __html: t.architecture.freshness }} />
          </div>
          <div className="czs-stack">
            <span className="czs-stack__label">{t.architecture.stackLabel}</span>
            {t.architecture.stack.map(s => <span className="czs-stack__chip" key={s}>{s}</span>)}
          </div>
        </Reveal>
      </section>

      {/* ── Decisions / before-after wins ────────────────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">04 / Decisions</span><h2 className="czs-block__title">{t.wins.title}</h2></Reveal>
        <div className="czs-wins">
          {t.wins.items.map(w => (
            <Reveal className="czs-win" key={w.tag} as="article">
              <span className="czs-win__tag">{w.tag}</span>
              <div className="czs-win__stat">
                <span className="czs-win__before pixel-accent">{w.before}</span>
                <LuArrowRight aria-hidden="true" />
                <span className="czs-win__after pixel-accent">{w.after}</span>
              </div>
              <span className="czs-win__scale">{w.scale}</span>
              <h3 className="czs-win__title">{w.title}</h3>
              <p className="czs-win__body" dangerouslySetInnerHTML={{ __html: w.body }} />
            </Reveal>
          ))}
        </div>
        <Reveal><p className="czs-wins__closer">{t.wins.intro}</p></Reveal>
      </section>

      {/* ── Operations ───────────────────────────────────────── */}
      <section className="czs-block czs-dashband">
        <Reveal><span className="czs-kicker">05 / Operations</span><h2 className="czs-block__title">{t.ops.title}</h2></Reveal>
        <Reveal><p className="czs-prose czs-prose--lead" dangerouslySetInnerHTML={{ __html: t.ops.intro }} /></Reveal>
        <Reveal><p className="czs-caption">{t.ops.note}</p></Reveal>
        <div className="czs-dash">
          {/* Scheduled jobs (full width) */}
          <Reveal className="czs-dashcard czs-dashcard--wide">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>www.inzerpro.cz/app/jobs</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name">Scheduled jobs</span>
                <span className="czs-apptoolbar__actions"><span className="czs-apptoolbar__btn">Today</span><span className="czs-apptoolbar__btn">All marketplaces</span></span>
              </div>
              <table className="czs-mock__table">
                <thead><tr><th>ID</th><th>Action</th><th>Marketplace</th><th>Listing</th><th>Time</th><th>Status</th></tr></thead>
                <tbody>
                  {JOB_ROWS.map(r => (
                    <tr key={r.id}>
                      <td className="mono dim">{r.id}</td>
                      <td className="mono">{r.action}</td>
                      <td className="mkt"><img className="czs-mkticon" src={MKT_ICONS[r.mkt]} alt="" width="16" height="16" loading="lazy" />{r.market}</td>
                      <td className="q">{r.listing}</td>
                      <td className="mono">{r.when}</td>
                      <td><span className={`czs-badge ${r.status === 'ok' ? 'ok' : 'changed'}`}>{r.status === 'ok' ? 'done' : 'retrying'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="czs-dashcard__title">{t.ops.items[0].title}</h3>
            <p className="czs-caption">{t.ops.items[0].caption}</p>
          </Reveal>

          {/* Posting canary */}
          <Reveal className="czs-dashcard czs-dashcard--wide">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>posting canary · hourly</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name">Posting canary</span>
                <span className="czs-apptoolbar__actions"><span className="czs-apptoolbar__btn">all green</span></span>
              </div>
              <table className="czs-mock__table">
                <thead><tr><th>Check</th><th>Detail</th><th>Status</th></tr></thead>
                <tbody>
                  {CANARY_ROWS.map((r, i) => (
                    <tr key={i}>
                      <td>{r.check}</td>
                      <td className="mono dim">{r.detail}</td>
                      <td><span className="czs-badge ok">pass</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="czs-dashcard__title">{t.ops.items[1].title}</h3>
            <p className="czs-caption">{t.ops.items[1].caption}</p>
          </Reveal>
        </div>
        <Reveal><p className="czs-closer">{t.ops.closer}</p></Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="czs-cta">
        <span className="czs-cta__eyebrow">{t.cta.eyebrow}</span>
        <h2 className="czs-cta__title">{t.cta.title}</h2>
        <p className="czs-cta__body">{t.cta.body}</p>
        <div className="czs-cta__actions">
          <a className="czs-btn czs-btn--onaccent" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <LuCalendar aria-hidden="true" /> {t.cta.book}
            <LuArrowRight className="czs-btn__arrow" aria-hidden="true" />
          </a>
          <a className="czs-btn czs-btn--onaccent-ghost" href={`mailto:${EMAIL}?subject=Automation%20enquiry`}>
            <LuMail aria-hidden="true" /> {t.cta.email}
          </a>
        </div>
        <p className="czs-cta__outcome">{t.cta.outcome}</p>
      </section>
    </div>
  );
};

export default InzerproCaseStudyPage;
