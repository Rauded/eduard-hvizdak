import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowLeft, LuArrowRight, LuCalendar, LuMail, LuExternalLink,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import Reveal from '../_21test/Reveal';
import { asset } from '../portfolio/projectsData';
import './czs-chatbot.scss';
import './inzerpro-cs.scss';

const demoVideo = asset('inzerpro.mp4');
const demoPoster = asset('inzerpro-poster.webp');
const listingPhoto = asset('inzerpro-listing.webp');

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

const InzerproCaseStudyPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('inzerproCaseStudy');

  return (
    <div className="czs czs--inz" data-theme={theme}>
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
            <span className="czs-frame__url"><img src="/brand/sites/inzerpro.svg" alt="" />www.inzerpro.cz</span>
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

      {/* ── 02 Product: one listing fans out to every marketplace ── */}
      <section className="czs-block">
        <Reveal><span className="czs-kicker">02 / Product</span><h2 className="czs-block__title">{t.fanout.title}</h2></Reveal>
        <Reveal><p className="czs-prose inz-lead">{t.fanout.lead}</p></Reveal>
        <Reveal className="inz-fan">
          <article className="inz-listing">
            <img className="inz-listing__photo" src={listingPhoto} alt={t.fanout.card.photoAlt} loading="lazy" />
            <div className="inz-listing__body">
              <span className="inz-listing__title">{t.fanout.card.listingTitle}</span>
              <span className="inz-listing__price">{t.fanout.card.price}</span>
              <span className="inz-listing__pill">{t.fanout.card.pill}</span>
            </div>
          </article>
          <svg className="inz-fan__wires" viewBox="0 0 100 320" preserveAspectRatio="none" aria-hidden="true">
            {[28, 92, 156, 220, 284].map((y, i) => (
              <path key={y} className={i === 4 ? 'beta' : ''} d={`M 0 160 C 55 160, 45 ${y}, 100 ${y}`} />
            ))}
          </svg>
          <ul className="inz-fan__targets">
            {t.problem.marketplaces.map(m => (
              <li className="inz-target" key={m.id}>
                <img src={MKT_ICONS[m.id]} alt="" width="22" height="22" loading="lazy" />
                <span className="inz-target__name">{m.name}</span>
                <span className={`czs-badge ${m.badge === 'live' ? 'ok' : 'changed'}`}>
                  {m.badge === 'live' ? t.fanout.statusPosted : t.fanout.statusBeta}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="inz-hard" as="ul">
          {t.fanout.hard.map(h => (
            <li className="inz-hard__row" key={h.lead}>
              <strong>{h.lead}</strong> {h.rest}
            </li>
          ))}
        </Reveal>
      </section>

      {/* ── 03 Schedule: a seller's day on one rail ──────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">03 / Schedule</span><h2 className="czs-block__title">{t.day.title}</h2></Reveal>
        <Reveal className="inz-day">
          <div className="inz-day__scroll">
            <div className="inz-day__rail">
              <div className="inz-day__band" style={{ left: `${(5 / 24) * 100}%`, width: `${(1.5 / 24) * 100}%` }} />
              {[0, 6, 12, 18, 24].map(h => (
                <span className={`inz-day__hour${h === 0 ? ' is-start' : h === 24 ? ' is-end' : ''}`} key={h} style={{ left: `${(h / 24) * 100}%` }}>
                  <i />{String(h).padStart(2, '0')}:00
                </span>
              ))}
              {Array.from({ length: 23 }, (_, i) => i + 1).map(h => (
                <span className="inz-day__dot" key={h} style={{ left: `${(h / 24) * 100}%` }} />
              ))}
              <span className="inz-day__flag inz-day__flag--test" style={{ left: `${(2 / 24) * 100}%` }}>{t.day.events.test}</span>
              <span className="inz-day__flag inz-day__flag--reposts" style={{ left: `${(5.75 / 24) * 100}%` }}>{t.day.events.reposts}</span>
              <span className="inz-day__flag inz-day__flag--wake" style={{ left: `${(7.5 / 24) * 100}%` }}>{t.day.events.wake}</span>
            </div>
            <span className="inz-day__legend">{t.day.events.canary}</span>
          </div>
        </Reveal>
      </section>

      {/* ── 04 Reliability: the queue and the alerting policy ── */}
      <section className="czs-block czs-dashband">
        <Reveal><span className="czs-kicker">04 / Reliability</span><h2 className="czs-block__title">{t.ops.title}</h2></Reveal>
        <Reveal><p className="czs-prose inz-lead">{t.ops.lead}</p></Reveal>
        <Reveal className="inz-uptime">
          <div className="inz-uptime__row">
            {Array.from({ length: 48 }, (_, i) => (
              <i key={i} className={i >= 22 && i < 28 ? 'bad' : ''} />
            ))}
            <span className="inz-uptime__flag is-down" style={{ left: `${(22 / 48) * 100}%` }}><LuMail aria-hidden="true" />{t.ops.uptime.down}</span>
            <span className="inz-uptime__flag is-back" style={{ left: `${(28 / 48) * 100}%` }}><LuMail aria-hidden="true" />{t.ops.uptime.back}</span>
          </div>
          <span className="inz-uptime__caption">{t.ops.uptime.caption}</span>
        </Reveal>
        <div className="czs-dash">
          <Reveal className="czs-dashcard czs-dashcard--wide">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>www.inzerpro.cz/app/jobs</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name"><img src="/brand/sites/inzerpro.svg" alt="" />{t.ops.jobsTitle}</span>
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
            <p className="czs-caption">{t.ops.jobsCaption}</p>
          </Reveal>
        </div>
        <Reveal className="inz-hard inz-hard--tech" as="ul">
          {t.ops.tech.map(h => (
            <li className="inz-hard__row" key={h.lead}>
              <strong>{h.lead}</strong> {h.rest}
            </li>
          ))}
        </Reveal>
        <Reveal as="div" className="czs-metrics inz-stats" aria-label="Engineering numbers">
          {t.ops.stats.map(m => (
            <div className="czs-metric" key={m.label}>
              <span className="czs-metric__value pixel-accent">{m.value}</span>
              <span className="czs-metric__label">{m.label}</span>
            </div>
          ))}
        </Reveal>
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
