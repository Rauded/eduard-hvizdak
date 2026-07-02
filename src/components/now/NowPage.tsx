import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LuBrain, LuTimer, LuFlame, LuMonitorSmartphone, LuZap, LuMapPin, LuBlocks, LuArrowUpRight, LuClock, LuTrendingUp } from 'react-icons/lu';
import { FaYoutube, FaGithub, FaLinkedinIn, FaXTwitter, FaPlay } from 'react-icons/fa6';
import Seo from '../../seo/Seo';
import AgentsRunning from './AgentsRunning';
import LinkedInEmbed from '../embeds/LinkedInEmbed';
import Tweet from '../embeds/Tweet';
import { useTheme } from '../theme/ThemeContext';
import '../embeds/embeds.scss';
import './now.scss';

// LinkedIn posts to feature (updated manually). Paste a post's "Embed this
// post" URL (and its height) here when you post something new; newest first.
const LINKEDIN_POSTS: { src: string; height: number }[] = [
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7473426243208527872?collapsed=1', height: 628 },
];

// Favourite posts on X: add tweet URLs here to feature them. Empty = the
// whole "Favourite posts on X" section hides itself (guarded by length > 0).
const FAVOURITE_TWEETS: string[] = [];

// Hand-maintained "last updated" stamp for the /now header. Bump this whenever
// you meaningfully rewrite the "Right now" copy below; a real /now page proves
// it's alive by showing when it was last touched. Location is static.
const LAST_UPDATED = 'July 2026';
const LOCATION = 'Brno, Czech Republic';

// Products I'm actively running (hand-maintained, one honest line each). These
// lead above the auto-synced reading/watching feeds.
const BUILDING: {
  name: string;
  tagline: string;
  status: string;
  href: string;
  logo: string;
  accent: string;
}[] = [
  {
    name: 'InzerPro',
    tagline: 'A cross-listing and automation platform for Czech and Slovak second-hand marketplaces.',
    status: 'Live · paying customers',
    href: 'https://www.inzerpro.cz',
    logo: '/brand/sites/inzerpro.svg',
    accent: '#ff5c00',
  },
  {
    name: 'KouzelníkNaAkci',
    tagline: 'A marketplace connecting event organisers with magicians across Czechia and Slovakia, and my live sandbox for SEO, GEO, and online-ads experiments.',
    status: 'Live · marketplace + marketing lab',
    href: 'https://www.kouzelniknaakci.cz',
    logo: '/brand/sites/kouzelniknaakci.svg',
    accent: '#7c3aed',
  },
  {
    name: 'NasadClaw',
    tagline: 'A front-end brochure site for my AI consulting, automation, and deployment work, where people can read up and get in touch.',
    status: 'Live · services site',
    href: 'https://www.nasadclaw.cz',
    logo: '/brand/sites/nasadclaw.png',
    accent: '#e11d2f',
  },
];

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
interface Video { id: string; title: string; published: string; url: string; thumbnail: string; thumbnailFallback?: string; views?: number | null }
interface SeoItem { label: string; domain: string; impressions: number; clicks: number }
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

// Human-readable label for a contribution day, e.g. "3 contributions on Jun 14, 2025".
function contribLabel(day: ContribDay): string {
  const [y, m, d] = day.date.split('-').map(Number);
  const date = new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const noun = day.count === 1 ? 'contribution' : 'contributions';
  return `${day.count} ${noun} on ${date}`;
}

const fmt = (v: number | null, suffix = ''): string =>
  v === null || v === undefined ? '-' : `${v}${suffix}`;

// Short form for big counts, e.g. 128432 becomes "128K".
const compact = (n: number): string =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

// Live local time in Brno (Europe/Prague); home base even when I'm travelling.
// Prague runs CET (UTC+1) in winter, CEST (UTC+2) in summer, so derive the label
// from the actual offset instead of hardcoding it.
function pragueOffsetMin(now: number): number {
  const d = new Date(now);
  const local = new Date(d.toLocaleString('en-US', { timeZone: 'Europe/Prague' }));
  const utc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
  return Math.round((local.getTime() - utc.getTime()) / 60000);
}
function brnoClock(now: number): string {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(now);
  return `${time} ${pragueOffsetMin(now) === 120 ? 'CEST' : 'CET'}`;
}

const stars = (r: number | null): string =>
  r === null ? '' : '★'.repeat(Math.floor(r)) + (r % 1 ? '½' : '');

// ─── Loading skeletons ───────────────────────────────────────────────
// Reserve the same layout the real content will occupy, so feeds swap in
// place (no jumps) once their fetch resolves. Headers stay identical to the
// loaded state; only the cards shimmer → real.
const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="now-media__grid">
    {Array.from({ length: count }).map((_, i) => (
      <div className="now-card now-card--skeleton" key={i}>
        <span className="now-card__cover now-card__cover--skel now-skel" />
        <span className="now-skel now-skel--line" />
        <span className="now-skel now-skel--line now-skel--short" />
      </div>
    ))}
  </div>
);

const MediaSkeleton: React.FC<{ mark: React.ReactNode; title: string; auto: string; count?: number }> = ({
  mark, title, auto, count,
}) => (
  <section className="now-media" aria-hidden="true">
    <div className="now-media__head">
      <h2 className="now-media__title">{mark} {title}</h2>
      <span className="now-media__auto">{auto}</span>
    </div>
    <SkeletonGrid count={count} />
  </section>
);

const GitHubSkeleton: React.FC = () => (
  <section className="now-github" aria-hidden="true">
    <div className="now-media__head">
      <h2 className="now-media__title"><FaGithub className="now-icon" /> On GitHub</h2>
      <span className="now-media__auto">@Rauded</span>
    </div>
    <p className="now-github__count"><span className="now-skel now-skel--line now-skel--count" /></p>
    <div className="now-github__scroll">
      <div className="now-github__graph">
        {Array.from({ length: 52 }).map((_, wi) => (
          <div className="now-github__week" key={wi}>
            {Array.from({ length: 7 }).map((_, di) => (
              <span className="now-github__day" key={di} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const YouTubeSkeleton: React.FC = () => (
  <section className="now-media now-yt" aria-hidden="true">
    <div className="now-media__head">
      <h2 className="now-media__title"><FaYoutube className="now-icon now-icon--yt" /> Latest video</h2>
      <span className="now-media__auto">@eduardhvizdak</span>
    </div>
    <div className="now-ytcard">
      <span className="now-ytcard__thumb now-skel" />
      <span className="now-skel now-skel--line now-skel--yt" />
    </div>
  </section>
);

const NowPage: React.FC = () => {
  const { theme } = useTheme();
  // null = still loading (render a skeleton); [] = loaded but empty (hide the
  // section); [...] = loaded with data. This lets the page reserve layout up
  // front so content swaps in place instead of popping in and shifting things.
  const [data, setData] = useState<NowData | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [anime, setAnime] = useState<Anime[] | null>(null);
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [seo, setSeo] = useState<SeoItem[] | null>(null);
  const [gh, setGh] = useState<GitHubData | null | undefined>(undefined);
  // Styled hover tooltip for the contribution graph (native `title` is too subtle).
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  // Live Brno clock in the hero meta line; re-render on the minute.
  const [clock, setClock] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setClock(Date.now()), 15000);
    return () => window.clearInterval(id);
  }, []);

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
    fetch('/api/seo')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setSeo(d.items || []))
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
        description="What Eduard Hvižďák is focused on right now: current projects, plus what he's reading and watching."
        path="/now"
      />
      <header className="now-hero">
        <span className="now-hero__kicker">/now</span>
        <h1 className="now-hero__title">What I'm doing now</h1>
        <p className="now-hero__lead">
          A snapshot of what's got my attention, inspired by Derek Sivers'{' '}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">/now movement</a>.
        </p>
        <p className="now-hero__meta">
          <span className="now-hero__loc"><LuMapPin /> {LOCATION}</span>
          <span className="now-hero__mdot" aria-hidden="true" />
          <span className="now-hero__loc" title="My local time in Brno"><LuClock /> {brnoClock(clock)}</span>
          <span className="now-hero__mdot" aria-hidden="true" />
          <span className="now-hero__updated">Updated {LAST_UPDATED}</span>
        </p>
      </header>

      <section className="now-focus" aria-label="What I'm focused on right now">
        <p className="now-focus__lead">
          I'm wrapping up my <strong>BSc in Computer Science</strong> at Masaryk University and working
          as an <strong>AI engineer</strong>. Most of my time goes into building{' '}
          <strong>AI agents and agentic systems</strong>: automations, multi-agent orchestration, and
          the wiring that keeps them running. I've also had a go at running a few SaaS products of my
          own, and the one still going is{' '}
          <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">InzerPro</a>. On
          the side, more of an extra than a main job, I do AI consultations plus automation and AI
          implementation work, just me, no company behind it.
        </p>
      </section>

      <section className="now-building">
        <div className="now-media__head">
          <h2 className="now-media__title"><LuBlocks className="now-icon now-icon--build" /> Currently building</h2>
        </div>
        <div className="now-building__grid">
          {BUILDING.map((p) => {
            const s = seo?.find((x) => p.href.includes(x.domain));
            return (
              <a
                className="now-build"
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ['--accent' as string]: p.accent }}
              >
                <div className="now-build__top">
                  <span className="now-build__logo">
                    <img src={p.logo} alt="" loading="lazy" />
                  </span>
                  <span className="now-build__name">{p.name}</span>
                  <LuArrowUpRight className="now-build__arrow" />
                </div>
                <p className="now-build__tag">{p.tagline}</p>
                <div className="now-build__foot">
                  <span className="now-build__status">
                    <span className="now-build__dot" aria-hidden="true" />{p.status}
                  </span>
                  {s && s.impressions > 0 && (
                    <span
                      className="now-build__metric"
                      title={`${s.impressions.toLocaleString()} Google Search impressions in the last 28 days`}
                    >
                      <LuTrendingUp /> {compact(s.impressions)} search impressions / 28d
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <AgentsRunning />

      {gh === undefined ? (
        <GitHubSkeleton />
      ) : gh && (gh.total !== null || weeks.length > 0) ? (
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
                        <span
                          className="now-github__day"
                          key={di}
                          data-level={day.level}
                          onMouseEnter={(e) => setTip({ x: e.clientX, y: e.clientY, text: contribLabel(day) })}
                          onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY, text: contribLabel(day) })}
                          onMouseLeave={() => setTip(null)}
                        />
                      ) : (
                        <span className="now-github__day now-github__day--pad" key={di} />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tip && createPortal(
            <div className="now-github__tip" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>,
            document.body
          )}
        </section>
      ) : null}

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

      {books === null ? (
        <MediaSkeleton mark={<GoodreadsMark />} title="Reading now" auto="Auto-synced from Goodreads" count={4} />
      ) : books.length > 0 ? (
        <section className="now-media">
          <div className="now-media__head">
            <h2 className="now-media__title"><GoodreadsMark /> Reading now</h2>
            <span className="now-media__auto">Auto-synced from Goodreads</span>
          </div>
          <div className="now-media__grid">
            {books.map((b, i) => (
              <a className="now-card" key={i} href={b.link} target="_blank" rel="noopener noreferrer" title={`${b.title} · ${b.author}`}>
                {b.cover && <img className="now-card__cover" src={b.cover} alt="" loading="lazy" />}
                <span className="now-card__title">{b.title}</span>
                <span className="now-card__sub">{b.author}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {films === null ? (
        <MediaSkeleton mark={<LetterboxdMark />} title="Recently watched" auto="Auto-synced from Letterboxd" />
      ) : films.length > 0 ? (
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
      ) : null}

      {anime === null ? (
        <MediaSkeleton mark={<MalMark />} title="Recently watched anime" auto="Auto-synced from MyAnimeList" />
      ) : anime.length > 0 ? (
        <section className="now-media">
          <div className="now-media__head">
            <h2 className="now-media__title"><MalMark /> Recently watched anime</h2>
            <a className="now-media__auto" href="https://myanimelist.net/profile/rauded" target="_blank" rel="noopener noreferrer">Auto-synced from MyAnimeList</a>
          </div>
          <div className="now-media__grid">
            {anime.map((a, i) => (
              <a className="now-card" key={i} href={a.link} target="_blank" rel="noopener noreferrer" title={a.title}>
                {a.cover ? (
                  <img className="now-card__cover" src={a.cover} alt="" loading="lazy" />
                ) : (
                  <span className="now-card__cover now-card__cover--ph" aria-hidden="true">
                    {a.title.slice(0, 2)}
                  </span>
                )}
                <span className="now-card__title">{a.title}</span>
                {a.status && <span className="now-card__sub">{a.status}</span>}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {videos === null ? (
        <YouTubeSkeleton />
      ) : videos.length > 0 ? (
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
            <span className="now-ytcard__body">
              <span className="now-ytcard__title">{videos[0].title}</span>
              {typeof videos[0].views === 'number' && (
                <span className="now-ytcard__views">{videos[0].views.toLocaleString()} views</span>
              )}
            </span>
          </a>
        </section>
      ) : null}

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
