import React, { useEffect, useState } from 'react';
import { LuBrain, LuTimer, LuFlame, LuMonitorSmartphone, LuZap } from 'react-icons/lu';
import { FaYoutube, FaGithub, FaLinkedinIn, FaXTwitter, FaPlay } from 'react-icons/fa6';
import Seo from '../../seo/Seo';
import LinkedInEmbed from '../embeds/LinkedInEmbed';
import Tweet from '../embeds/Tweet';
import { useBlogTheme } from '../blog/useBlogTheme';
import ThemeToggle from '../blog/ThemeToggle';
import '../embeds/embeds.scss';
import './now.scss';

// LinkedIn posts to feature — updated manually. Paste a post's "Embed this
// post" URL (and its height) here when you post something new; newest first.
const LINKEDIN_POSTS: { src: string; height: number }[] = [
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7473426243208527872?collapsed=1', height: 628 },
];

// Favourite posts on X — add tweet URLs here to feature them. Empty = the
// whole "Favourite posts on X" section hides itself (guarded by length > 0).
const FAVOURITE_TWEETS: string[] = [];

// ─── Official brand marks ────────────────────────────────────────────
// Real, official logo files downloaded from each brand's own assets:
// Goodreads' official 2025 "g" badge and Letterboxd's official dots
// decal. Stored as SVGs in public/brand/ and served as images.
const GoodreadsMark: React.FC = () => (
  <img
    className="brandmark brandmark--goodreads"
    src="/brand/goodreads.svg"
    alt=""
    aria-hidden="true"
  />
);

const LetterboxdMark: React.FC = () => (
  <img
    className="brandmark brandmark--letterboxd"
    src="/brand/letterboxd.svg"
    alt=""
    aria-hidden="true"
  />
);

const MalMark: React.FC = () => (
  <img
    className="brandmark brandmark--mal"
    src="/brand/myanimelist.svg"
    alt=""
    aria-hidden="true"
  />
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
interface Anime { title: string; status?: string; link: string; cover: string }
interface Video { id: string; title: string; published: string; url: string; thumbnail: string; thumbnailFallback?: string }
interface ContribDay { date: string; count: number; level: number }
interface GitHubData { total: number | null; contributions: ContribDay[] }

// Group the day list into GitHub-style week columns (Sunday-aligned).
function toWeeks(days: ContribDay[]): (ContribDay | null)[][] {
  if (!days.length) return [];
  const weeks: (ContribDay | null)[][] = [];
  const [y, m, d] = days[0].date.split('-').map(Number);
  let week: (ContribDay | null)[] = new Array(new Date(y, m - 1, d).getDay()).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length) { while (week.length < 7) week.push(null); weeks.push(week); }
  return weeks;
}

const fmt = (v: number | null, suffix = ''): string =>
  v === null || v === undefined ? '—' : `${v}${suffix}`;

const stars = (r: number | null): string =>
  r === null ? '' : '★'.repeat(Math.floor(r)) + (r % 1 ? '½' : '');

const NowPage: React.FC = () => {
  const [theme, toggleTheme] = useBlogTheme();
  const [data, setData] = useState<NowData | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [anime, setAnime] = useState<Anime[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [gh, setGh] = useState<GitHubData | null>(null);

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
    fetch('/api/myanimelist')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setAnime(d.items || []))
      .catch(() => {});
    fetch('/api/youtube')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setVideos(d.items || []))
      .catch(() => {});
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : null))
      .then(setGh)
      .catch(() => {});
  }, []);

  const weeks = gh ? toWeeks(gh.contributions || []) : [];

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
    <div className="now-page" id="now" data-theme={theme}>
      <Seo
        title="Now"
        description="What Eduard Hvižďák is focused on right now — current projects, plus what he's reading and watching."
        path="/now"
      />
      <div className="now-topbar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <header className="now-hero">
        <span className="now-hero__kicker">/now</span>
        <h1 className="now-hero__title">What I'm doing now</h1>
        <p className="now-hero__lead">
          A snapshot of what's got my attention — inspired by Derek Sivers'{' '}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">/now movement</a>.
        </p>
      </header>

      {gh && (gh.total !== null || weeks.length > 0) && (
        <section className="now-github">
          <div className="now-media__head">
            <h2 className="now-media__title"><FaGithub className="now-icon" /> On GitHub</h2>
            <a className="now-media__auto" href="https://github.com/Rauded" target="_blank" rel="noopener noreferrer">@Rauded</a>
          </div>
          {gh.total !== null && (
            <p className="now-github__count">
              <strong>{gh.total.toLocaleString()}</strong> contributions in the last year
            </p>
          )}
          {weeks.length > 0 && (
            <div className="now-github__scroll">
              <div className="now-github__graph" role="img" aria-label={`${gh.total ?? ''} GitHub contributions in the last year`}>
                {weeks.map((week, wi) => (
                  <div className="now-github__week" key={wi}>
                    {week.map((day, di) =>
                      day ? (
                        <span className="now-github__day" key={di} data-level={day.level} title={`${day.count} on ${day.date}`} />
                      ) : (
                        <span className="now-github__day now-github__day--pad" key={di} />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

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

      {anime.length > 0 && (
        <section className="now-media">
          <div className="now-media__head">
            <h2 className="now-media__title"><MalMark /> Recently watched anime</h2>
            <a className="now-media__auto" href="https://myanimelist.net/profile/rauded" target="_blank" rel="noopener noreferrer">@rauded</a>
          </div>
          <div className="now-media__grid">
            {anime.map((a, i) => (
              <a className="now-card" key={i} href={a.link} target="_blank" rel="noopener noreferrer" title={a.title}>
                {a.cover && <img className="now-card__cover" src={a.cover} alt="" loading="lazy" />}
                <span className="now-card__title">{a.title}</span>
                {a.status && <span className="now-card__sub">{a.status}</span>}
              </a>
            ))}
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="now-media now-yt">
          <div className="now-media__head">
            <h2 className="now-media__title"><FaYoutube className="now-icon now-icon--yt" /> Latest video</h2>
            <a className="now-media__auto" href="https://www.youtube.com/@eduardhvizdak" target="_blank" rel="noopener noreferrer">@eduardhvizdak</a>
          </div>
          <a className="now-ytcard" href={videos[0].url} target="_blank" rel="noopener noreferrer" title={videos[0].title}>
            <span className="now-ytcard__thumb">
              <img
                src={videos[0].thumbnail}
                alt=""
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (videos[0].thumbnailFallback && img.src !== videos[0].thumbnailFallback) {
                    img.src = videos[0].thumbnailFallback;
                  }
                }}
              />
              <span className="now-ytcard__play"><FaPlay /></span>
            </span>
            <span className="now-ytcard__title">{videos[0].title}</span>
          </a>
        </section>
      )}

      {LINKEDIN_POSTS.length > 0 && (
        <section className="now-media now-linkedin">
          <div className="now-media__head">
            <h2 className="now-media__title"><FaLinkedinIn className="now-icon now-icon--li" /> Latest from LinkedIn</h2>
            <a className="now-media__auto" href="https://www.linkedin.com/in/eduard-hvizdak" target="_blank" rel="noopener noreferrer">@eduard-hvizdak</a>
          </div>
          <div className="now-embeds">
            {LINKEDIN_POSTS.map((p) => (
              <LinkedInEmbed key={p.src} src={p.src} height={p.height} />
            ))}
          </div>
        </section>
      )}

      {FAVOURITE_TWEETS.length > 0 && (
        <section className="now-media now-tweets">
          <div className="now-media__head">
            <h2 className="now-media__title"><FaXTwitter className="now-icon" /> Favourite posts on X</h2>
            <a className="now-media__auto" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">on X</a>
          </div>
          <div className="now-embeds">
            {FAVOURITE_TWEETS.map((url) => (
              <Tweet key={url} url={url} theme="dark" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NowPage;
