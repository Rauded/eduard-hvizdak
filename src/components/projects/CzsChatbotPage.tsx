import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowLeft, LuArrowRight, LuCalendar, LuMail, LuExternalLink,
  LuThumbsUp, LuThumbsDown, LuServer, LuRefreshCw,
} from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import Reveal from '../_21test/Reveal';
import livePage from '../../assets/projects/czs/czs-live-page.jpg';
import widgetShot from '../../assets/projects/czs/czs-widget.png';
import answerShot from '../../assets/projects/czs/czs-answer.png';
import './czs-chatbot.scss';

const EMAIL = 'eduardd.hv@gmail.com';
const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'https://cal.com/eduardhv/30min';

// Representative accuracy trend, derived from the real 37 eval cycles (accuracy
// held ~8.9 to 9.1 out of 10; hallucination counts stayed in the single digits
// per ~748 questions). Shown as a shape, not exact per-cycle figures.
// Real distribution of answer scores from the evaluation database
// (continuous_eval.sqlite). Index = score 0..10, value = number of graded
// answers. Of 15,362 eval runs, 10,438 produced a gradeable answer (the rest
// were clarifications, out-of-scope probes, or empty retrievals). 84 percent
// of gradeable answers scored 9 or 10; the average is 9.0 out of 10.
const SCORE_DIST = [117, 135, 76, 91, 152, 2, 66, 618, 394, 2690, 6097];

// Anonymized illustrative rows for the Conversation Database mock. No real
// student data: generic procedural questions, invented confidence and timing.
const CONVO_ROWS = [
  { id: 4821, src: 'student', conf: 0.94, fb: 'up', time: '8.1s', intent: 'check_requirements', program: 'Erasmus+', q: 'What documents do I need for the selection?' },
  { id: 4820, src: 'student', conf: 0.88, fb: '', time: '11.4s', intent: 'find_deadline', program: 'Erasmus', q: 'When is the application deadline this year?' },
  { id: 4819, src: 'student', conf: 0.72, fb: 'down', time: '9.7s', intent: 'scholarship_query', program: 'Erasmus+', q: 'How much is the grant for a semester in Norway?' },
  { id: 4818, src: 'student', conf: 0.91, fb: 'up', time: '7.3s', intent: 'find_contact', program: 'Bilateral', q: 'Who is the coordinator for my faculty?' },
  { id: 4817, src: 'dev', conf: 0.83, fb: '', time: '10.2s', intent: 'explain_procedure', program: 'Internship', q: 'How do I get my traineeship certificate signed?' },
  { id: 4816, src: 'student', conf: 0.79, fb: '', time: '12.8s', intent: 'clarify_document', program: 'BIP', q: 'Do I upload the Learning Agreement before or after?' },
  { id: 4815, src: 'student', conf: 0.96, fb: 'up', time: '6.9s', intent: 'find_deadline', program: 'Erasmus+', q: 'When do results of the selection come out?' },
  { id: 4814, src: 'student', conf: 0.87, fb: '', time: '9.1s', intent: 'check_requirements', program: 'CEEPUS', q: 'How many ECTS do I need to complete abroad?' },
];

const SOURCE_ROWS = [
  { url: 'czs.muni.cz/.../erasmus-evropa', status: 'ok', chunks: 35 },
  { url: 'czs.muni.cz/.../prakticke-staze/erasmus', status: 'ok', chunks: 18 },
  { url: 'czs.muni.cz/.../financni-podminky', status: 'changed', chunks: 12 },
  { url: 'czs.muni.cz/.../po-ukonceni-pobytu', status: 'ok', chunks: 9 },
  { url: 'czs.muni.cz/.../mezifakultni-dohody', status: 'ok', chunks: 14 },
];

const FAQ_ROWS = [
  { q: 'Can I go on Erasmus if I am over 26?', sim: 0.91 },
  { q: 'Which currency is the stipend paid in?', sim: 0.87 },
  { q: 'Is there a list of internship host institutions?', sim: 0.82 },
];

// Real, mundane study-abroad question types students actually ask (anonymized).
const QUESTION_CHIPS = [
  'When is the application deadline?',
  'Can I go on Erasmus in my first year?',
  'Which currency is the stipend paid in?',
  'Do I need a language certificate?',
  'Who is the coordinator for my faculty?',
  'How much is the grant for Norway?',
  'Can I do an internship instead of study?',
  'Where do I upload the Learning Agreement?',
];

// Build an SVG polyline for a series scaled into the chart box.
function polyline(values: number[], min: number, max: number, w: number, h: number, pad: number): string {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  return values
    .map((v, i) => {
      const x = pad + (innerW * i) / (values.length - 1);
      const y = pad + innerH * (1 - (v - min) / (max - min));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

const CzsChatbotPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('czsChatbot');

  // ── Answer-score distribution histogram geometry ──
  const CW = 860, CH = 300;
  const pL = 54, pR = CW - 24, pT = 34, pB = CH - 42;
  const pW = pR - pL, pH = pB - pT;
  const YMAX = 6500;
  const barY = (n: number) => pB - (n / YMAX) * pH;
  const slot = pW / SCORE_DIST.length;   // 11 slots for scores 0..10
  const barW = slot * 0.6;
  const barCX = (s: number) => pL + slot * (s + 0.5);
  const meanX = pL + slot * (9.0 + 0.5);  // mean score 9.0 sits between bars 9 and 10
  void polyline;

  return (
    <div className="czs" data-theme={theme}>
      <Seo title={t.seo.title} description={t.seo.description} path="/projects/czs-muni-chatbot" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="czs-hero">
        <Link to="/services" className="czs-back"><LuArrowLeft aria-hidden="true" /> {t.back}</Link>
        <img className="czs-clientlogo" src="/brand/clients/masaryk-university.png" alt="Masaryk University" width="130" height="61" />
        <span className="czs-eyebrow">{t.hero.eyebrow}</span>
        <h1 className="czs-hero__title">{t.hero.title}</h1>
        <p className="czs-hero__lead">{t.hero.lead}</p>
        <div className="czs-hero__cta">
          <a className="czs-btn czs-btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <LuCalendar aria-hidden="true" /> {t.hero.book}
            <LuArrowRight className="czs-btn__arrow" aria-hidden="true" />
          </a>
          <a className="czs-btn czs-btn--ghost" href={`mailto:${EMAIL}?subject=AI%20assistant%20enquiry`}>
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

      {/* ── Hero proof: the bot on the official MUNI site ─────── */}
      <Reveal as="figure" className="czs-herofig">
        <div className="czs-frame czs-frame--browser">
          <span className="czs-frame__bar">
            <span className="czs-frame__dots"><i /><i /><i /></span>
            <span className="czs-frame__url">czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa</span>
          </span>
          <img src={livePage} alt="The CZS chatbot live on Masaryk University's official Erasmus+ page" />
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
        <div className="czs-prose">
          {t.problem.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </div>
        <Reveal className="czs-qchips" aria-label="Example student questions">
          {QUESTION_CHIPS.map(q => <span className="czs-qchip" key={q}>{q}</span>)}
        </Reveal>
        <Reveal><p className="czs-qstat">{t.problem.mediaStat}</p></Reveal>
      </section>

      {/* ── Live product ─────────────────────────────────────── */}
      <section className="czs-block">
        <Reveal><span className="czs-kicker">02 / Product</span><h2 className="czs-block__title">{t.product.title}</h2></Reveal>
        <div className="czs-prose">
          {t.product.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </div>
        <div className="czs-shots czs-shots--widgets">
          <Reveal className="czs-shot">
            <div className="czs-widgetframe">
              <img src={widgetShot} alt="The open CZS chat widget with an AI disclaimer and suggested questions" loading="lazy" />
            </div>
            <p className="czs-caption">{t.product.captionWidgetLive}</p>
          </Reveal>
          <Reveal className="czs-shot">
            <div className="czs-widgetframe">
              <img src={answerShot} alt="A real chatbot answer citing 11 named source documents with feedback buttons" loading="lazy" />
            </div>
            <p className="czs-caption">{t.product.captionAnswerLive}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Architecture ─────────────────────────────────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">03 / System</span><h2 className="czs-block__title">{t.architecture.title}</h2></Reveal>
        <div className="czs-prose">
          {t.architecture.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
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
            <span>{t.architecture.freshness}</span>
          </div>
          <div className="czs-stack">
            <span className="czs-stack__label">{t.architecture.stackLabel}</span>
            {t.architecture.stack.map(s => <span className="czs-stack__chip" key={s}>{s}</span>)}
          </div>
        </Reveal>
        <Reveal className="czs-builders">
          <span className="czs-builders__label">{t.architecture.forBuildersLabel}</span>
          <p>{t.architecture.forBuilders}</p>
        </Reveal>
      </section>

      {/* ── Golden dataset / knowledge loop ──────────────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">04 / Knowledge</span><h2 className="czs-block__title">{t.golden.title}</h2></Reveal>
        <Reveal><p className="czs-prose czs-prose--lead">{t.golden.intro}</p></Reveal>
        <Reveal className="czs-flow">
          <span className="czs-flow__label">{t.golden.stepsLabel}</span>
          <ol className="czs-flow__list">
            {t.golden.steps.map((s, i) => (
              <li className="czs-flow__step" key={i}>
                <span className="czs-flow__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="czs-flow__t">{s}</span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal><p className="czs-closer">{t.golden.closer}</p></Reveal>
      </section>

      {/* ── Evaluation ───────────────────────────────────────── */}
      <section className="czs-block">
        <Reveal><span className="czs-kicker">05 / Evaluation</span><h2 className="czs-block__title">{t.evaluation.title}</h2></Reveal>
        <div className="czs-prose">
          {t.evaluation.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </div>
        <Reveal className="czs-chart">
          <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>chatbot.czs.muni.cz/evaluation</em></div>
          <span className="czs-chart__title">{t.evaluation.chartTitle}</span>
          <svg viewBox={`0 0 ${CW} ${CH}`} role="img" aria-label={t.evaluation.chartTitle} className="czs-chart__svg">
            {/* horizontal gridlines + count ticks */}
            {[0, 2000, 4000, 6000].map(tk => (
              <g key={`y${tk}`}>
                <line className="czs-chart__grid" x1={pL} y1={barY(tk)} x2={pR} y2={barY(tk)} />
                <text className="czs-chart__tick" x={pL - 8} y={barY(tk) + 3} textAnchor="end">{tk === 0 ? '0' : `${tk / 1000}k`}</text>
              </g>
            ))}
            {/* one bar per score, 9 and 10 highlighted */}
            {SCORE_DIST.map((n, s) => (
              <rect key={s} className={s >= 9 ? 'czs-chart__barhi' : 'czs-chart__barlo'} x={barCX(s) - barW / 2} y={barY(n)} width={barW} height={pB - barY(n)} rx={2} />
            ))}
            {/* counts above the two dominant bars */}
            <text className="czs-chart__vallabel" x={barCX(10)} y={barY(6097) - 7} textAnchor="middle">6,097</text>
            <text className="czs-chart__vallabel" x={barCX(9)} y={barY(2690) - 7} textAnchor="middle">2,690</text>
            {/* x-axis score labels */}
            {SCORE_DIST.map((n, s) => (
              <text key={`x${s}`} className="czs-chart__tick" x={barCX(s)} y={pB + 17} textAnchor="middle">{s}</text>
            ))}
            {/* axis titles */}
            <text className="czs-chart__axislabel" x={pL - 40} y={pT - 14}>answers</text>
            <text className="czs-chart__axislabel" x={(pL + pR) / 2} y={CH - 6} textAnchor="middle">answer score / 10</text>
            {/* mean marker */}
            <line className="czs-chart__anno" x1={meanX} y1={pT} x2={meanX} y2={pB} />
            <text className="czs-chart__annolabel" x={meanX + 5} y={pT + 7}>mean 9.0</text>
            {/* axes */}
            <line className="czs-chart__axis" x1={pL} y1={pT} x2={pL} y2={pB} />
            <line className="czs-chart__axis" x1={pL} y1={pB} x2={pR} y2={pB} />
          </svg>
          <div className="czs-chart__legend">
            <span className="czs-chart__key czs-chart__key--acc">{t.evaluation.chartAccuracy}</span>
            <span className="czs-chart__key czs-chart__key--hal">{t.evaluation.chartHallucination}</span>
          </div>
        </Reveal>
        <Reveal><p className="czs-caption">{t.evaluation.chartCaption}</p></Reveal>
      </section>

      {/* ── Before / after wins ──────────────────────────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">06 / Iteration</span><h2 className="czs-block__title">{t.wins.title}</h2></Reveal>
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
              <p className="czs-win__body">{w.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="czs-wins__closer">{t.wins.intro}</p></Reveal>
      </section>

      {/* ── Dashboards ───────────────────────────────────────── */}
      <section className="czs-block czs-dashband">
        <Reveal><span className="czs-kicker">07 / Operations</span><h2 className="czs-block__title">{t.dashboards.title}</h2></Reveal>
        <Reveal><p className="czs-prose czs-prose--lead">{t.dashboards.intro}</p></Reveal>
        <div className="czs-dash">
          {/* Conversation Database (full width) */}
          <Reveal className="czs-dashcard czs-dashcard--wide">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>chatbot.czs.muni.cz/dashboard</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name">Conversation Database</span>
                <span className="czs-apptoolbar__actions"><span className="czs-apptoolbar__btn">Export CSV</span><span className="czs-apptoolbar__btn">Columns</span></span>
              </div>
              <div className="czs-mock__filters">
                <span className="czs-filter"><b>Show:</b> Students</span>
                <span className="czs-filter"><b>Program:</b> All</span>
                <span className="czs-filter"><b>Direction:</b> Outgoing</span>
                <span className="czs-search">Search questions...</span>
              </div>
              <table className="czs-mock__table">
                <thead><tr><th>ID</th><th>Source</th><th>Conf.</th><th>FB</th><th>Time</th><th>Intent</th><th>Program</th><th>User query</th></tr></thead>
                <tbody>
                  {CONVO_ROWS.map((r) => (
                    <tr key={r.id}>
                      <td className="mono dim">{r.id}</td>
                      <td><span className={`czs-src ${r.src}`}>{r.src === 'student' ? 'STUDENT' : 'DEV'}</span></td>
                      <td><span className={`czs-conf ${r.conf < 0.8 ? 'lo' : ''}`}>{r.conf.toFixed(2)}</span></td>
                      <td>{r.fb === 'up' ? <LuThumbsUp className="fb up" /> : r.fb === 'down' ? <LuThumbsDown className="fb down" /> : <span className="fb none">·</span>}</td>
                      <td className="mono">{r.time}</td>
                      <td className="mono dim">{r.intent}</td>
                      <td>{r.program}</td>
                      <td className="q">{r.q}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="czs-dashcard__title">{t.dashboards.items[0].title}</h3>
            <p className="czs-caption">{t.dashboards.items[0].caption}</p>
          </Reveal>

          {/* Flagged & Resolved */}
          <Reveal className="czs-dashcard">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>chatbot.czs.muni.cz/flagged-resolved</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name">Flagged &amp; Resolved</span>
                <span className="czs-apptoolbar__actions"><span className="czs-apptoolbar__btn">3 open</span></span>
              </div>
              <div className="czs-mock__queue">
                <div className="czs-queue-item open">
                  <span className="czs-queue-item__flag"><span className="czs-statusdot czs-statusdot--flag" />Needs review</span>
                  <span className="czs-queue-item__q">Is the 20 ECTS requirement an Erasmus rule or an MU policy?</span>
                  <div className="czs-queue-item__actions"><span>Verify</span><span>Edit answer</span><span>Resolve</span></div>
                </div>
                <div className="czs-queue-item"><span className="czs-queue-item__flag lo"><span className="czs-statusdot czs-statusdot--flag" />Low confidence</span><span className="czs-queue-item__q">Which currency is the stipend paid in?</span></div>
                <div className="czs-queue-item"><span className="czs-queue-item__flag lo"><span className="czs-statusdot czs-statusdot--flag" />Thumbs down</span><span className="czs-queue-item__q">Is there a list of internship host institutions?</span></div>
              </div>
            </div>
            <h3 className="czs-dashcard__title">{t.dashboards.items[1].title}</h3>
            <p className="czs-caption">{t.dashboards.items[1].caption}</p>
          </Reveal>

          {/* Manage Sources */}
          <Reveal className="czs-dashcard">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>chatbot.czs.muni.cz/links</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name">Manage Sources · 778</span>
                <span className="czs-apptoolbar__actions"><span className="czs-apptoolbar__btn">+ Add source</span></span>
              </div>
              <table className="czs-mock__table">
                <thead><tr><th>Source URL</th><th>Status</th><th>Chunks</th></tr></thead>
                <tbody>
                  {SOURCE_ROWS.map((r, i) => (
                    <tr key={i}>
                      <td className="mono url">{r.url}</td>
                      <td><span className={`czs-badge ${r.status}`}>{r.status === 'changed' ? 'changed' : 'up to date'}</span></td>
                      <td className="mono">{r.chunks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="czs-dashcard__title">{t.dashboards.items[2].title}</h3>
            <p className="czs-caption">{t.dashboards.items[2].caption}</p>
          </Reveal>

          {/* FAQ Review */}
          <Reveal className="czs-dashcard">
            <div className="czs-mock">
              <div className="czs-mock__bar"><span className="d" /><span className="d" /><span className="d" /><em>chatbot.czs.muni.cz/faq-review</em></div>
              <div className="czs-apptoolbar">
                <span className="czs-apptoolbar__name">FAQ Review</span>
                <span className="czs-apptoolbar__actions"><span className="czs-apptoolbar__btn">42 pending</span></span>
              </div>
              <div className="czs-mock__faq">
                {FAQ_ROWS.map((r, i) => (
                  <div className="czs-faq-item" key={i}>
                    <span className="czs-faq-item__q">{r.q}</span>
                    <span className="czs-faq-item__sim mono">match {r.sim.toFixed(2)}</span>
                    <span className="czs-faq-item__actions"><span className="ok">Approve</span><span>Edit</span></span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="czs-dashcard__title">{t.dashboards.items[3].title}</h3>
            <p className="czs-caption">{t.dashboards.items[3].caption}</p>
          </Reveal>
        </div>
        <Reveal><p className="czs-closer">{t.dashboards.closer}</p></Reveal>
      </section>

      {/* ── Privacy ──────────────────────────────────────────── */}
      <section className="czs-block">
        <Reveal><span className="czs-kicker">08 / Privacy</span><h2 className="czs-block__title">{t.privacy.title}</h2></Reveal>
        <div className="czs-prose">
          {t.privacy.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </div>
      </section>

      {/* ── Cost ─────────────────────────────────────────────── */}
      <section className="czs-block czs-block--tint">
        <Reveal><span className="czs-kicker">09 / Cost</span><h2 className="czs-block__title">{t.cost.title}</h2></Reveal>
        <div className="czs-prose">
          {t.cost.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </div>
        <div className="czs-costcards">
          {t.cost.cards.map(c => (
            <Reveal className="czs-costcard" key={c.k}>
              <LuServer aria-hidden="true" />
              <span className="czs-costcard__k">{c.k}</span>
              <span className="czs-costcard__v">{c.v}</span>
            </Reveal>
          ))}
        </div>
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
          <a className="czs-btn czs-btn--onaccent-ghost" href={`mailto:${EMAIL}?subject=AI%20assistant%20enquiry`}>
            <LuMail aria-hidden="true" /> {t.cta.email}
          </a>
        </div>
        <p className="czs-cta__outcome">{t.cta.outcome}</p>
      </section>
    </div>
  );
};

export default CzsChatbotPage;
