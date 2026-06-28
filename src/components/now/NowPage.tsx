import React, { useEffect, useState } from 'react';
import { LuBrain, LuTimer, LuFlame, LuMonitorSmartphone, LuZap } from 'react-icons/lu';
import { SiGoodreads } from 'react-icons/si';
import Seo from '../../seo/Seo';
import './now.scss';

// ─── Official brand marks (real logos, official colours) ─────────────
// Goodreads: brown "g" on its cream badge. Letterboxd: the three official
// dots (orange/green/blue) on its dark badge.
const GoodreadsMark: React.FC = () => (
  <span className="brandmark brandmark--goodreads" aria-hidden="true">
    <SiGoodreads />
  </span>
);

const LetterboxdMark: React.FC = () => (
  <span className="brandmark brandmark--letterboxd" aria-hidden="true">
    <svg viewBox="0 0 92 28" role="img">
      <circle cx="14" cy="14" r="14" fill="#FF8000" />
      <circle cx="78" cy="14" r="14" fill="#40BCF4" />
      <circle cx="46" cy="14" r="14" fill="#00E054" />
    </svg>
  </span>
);

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
          <div className="now-media__head">
            <h2 className="now-media__title"><GoodreadsMark /> Reading now</h2>
            <span className="now-media__auto">Auto-synced from Goodreads</span>
          </div>
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
          <div className="now-media__head">
            <h2 className="now-media__title"><LetterboxdMark /> Recently watched</h2>
            <span className="now-media__auto">Auto-synced from Letterboxd</span>
          </div>
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
