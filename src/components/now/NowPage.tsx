import React, { useEffect, useState } from 'react';
import { LuBrain, LuTimer, LuFlame, LuMonitorSmartphone, LuZap, LuFilm, LuBookOpen } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import './now.scss';

// ─── Live focus stats contract ───────────────────────────────────────
// Filled by the local `dashboard` project's now-summary generator, which
// writes a sanitized summary to public/now-data.json (income stays private).
interface NowData {
  updatedAt: string | null;
  focusHoursWeek: number | null;
  pomodorosTotal: number | null;
  focusStreakDays: number | null;
  screenTimeHoursWeek: number | null;
  caughtSlackingWeek: number | null;
}
interface Film { title: string; year: string; rating: number | null; link: string; poster: string }
interface Book { title: string; author: string; cover: string; link: string }

const fmt = (v: number | null, suffix = ''): string =>
  v === null || v === undefined ? '—' : `${v}${suffix}`;

const stars = (r: number | null): string =>
  r === null ? '' : '★'.repeat(Math.floor(r)) + (r % 1 ? '½' : '');

const NowPage: React.FC = () => {
  const [data, setData] = useState<NowData | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/now-data.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => {});
    fetch('/api/letterboxd')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setFilms(d.items || []))
      .catch(() => {});
    fetch('/api/goodreads')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setBooks(d.items || []))
      .catch(() => {});
  }, []);

  const stats = [
    { key: 'focus', icon: <LuBrain />, label: 'Focused this week', value: fmt(data?.focusHoursWeek ?? null, 'h') },
    { key: 'pomo', icon: <LuTimer />, label: 'Pomodoros logged', value: fmt(data?.pomodorosTotal ?? null) },
    { key: 'streak', icon: <LuFlame />, label: 'Focus streak', value: fmt(data?.focusStreakDays ?? null, ' days') },
    { key: 'screen', icon: <LuMonitorSmartphone />, label: 'Screen time / week', value: fmt(data?.screenTimeHoursWeek ?? null, 'h') },
    { key: 'zap', icon: <LuZap />, label: 'Times caught slacking', value: fmt(data?.caughtSlackingWeek ?? null) },
  ];
  // Only show the stats block once the dashboard has actually synced data.
  const hasStats = !!data && [
    data.focusHoursWeek, data.pomodorosTotal, data.focusStreakDays,
    data.screenTimeHoursWeek, data.caughtSlackingWeek,
  ].some((v) => v !== null && v !== undefined);

  return (
    <div className="now-page" id="now">
      <Seo
        title="Now"
        description="What Eduard Hvižďák is focused on right now — current projects, plus what he's reading and watching."
        path="/now"
      />
      <header className="now-hero">
        <span className="now-hero__kicker">/now</span>
        <h1 className="now-hero__title">What I'm doing now</h1>
        <p className="now-hero__lead">
          A snapshot of what's got my attention — inspired by Derek Sivers'{' '}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">/now movement</a>.
        </p>
      </header>

      <section className="now-block">
        <p>
          Finishing my Computer Science degree at <strong>Masaryk University</strong> (graduating 2026) while running my
          products: <strong>InzerPro</strong> (classifieds automation with paying customers), <strong>NasadClaw</strong>{' '}
          (B2B AI deployment), and <strong>KouzelníkNaAkci.cz</strong> (a magician marketplace).
        </p>
        <p>
          Day to day I'm deep in <span className="now-hl">agentic AI systems, retrieval pipelines, and large-scale
          document analysis</span> — and shipping most of it through Claude Code.
        </p>
        <p>
          I also built a local <strong>focus dashboard</strong> that watches my screen with a vision model and{' '}
          <span className="now-hl">zaps me (literally, via a Pavlok)</span> when I drift onto YouTube. When it's running,
          the focus stats here come straight from it.
        </p>
      </section>

      {hasStats && (
        <section className="now-stats" aria-label="Live focus stats from my dashboard">
          {stats.map((s) => (
            <div className="now-stat" key={s.key}>
              <span className="now-stat__icon">{s.icon}</span>
              <span className="now-stat__value">{s.value}</span>
              <span className="now-stat__label">{s.label}</span>
            </div>
          ))}
        </section>
      )}

      {books.length > 0 && (
        <section className="now-media">
          <h2 className="now-media__title"><LuBookOpen /> Reading now</h2>
          <div className="now-media__grid">
            {books.map((b, i) => (
              <a className="now-card" key={i} href={b.link} target="_blank" rel="noopener noreferrer" title={`${b.title} — ${b.author}`}>
                {b.cover && <img className="now-card__cover" src={b.cover} alt="" loading="lazy" />}
                <span className="now-card__title">{b.title}</span>
                <span className="now-card__sub">{b.author}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {films.length > 0 && (
        <section className="now-media">
          <h2 className="now-media__title"><LuFilm /> Recently watched</h2>
          <div className="now-media__grid">
            {films.map((f, i) => (
              <a className="now-card" key={i} href={f.link} target="_blank" rel="noopener noreferrer" title={`${f.title} (${f.year})`}>
                {f.poster && <img className="now-card__cover" src={f.poster} alt="" loading="lazy" />}
                <span className="now-card__title">{f.title}</span>
                <span className="now-card__sub">
                  {f.year}{f.rating ? <span className="now-card__stars"> · {stars(f.rating)}</span> : null}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NowPage;
