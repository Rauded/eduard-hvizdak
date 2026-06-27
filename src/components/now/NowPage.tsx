import React, { useEffect, useState } from 'react';
import { LuBrain, LuTimer, LuFlame, LuMonitorSmartphone, LuZap } from 'react-icons/lu';
import './now.scss';

// ─── Live stats contract ─────────────────────────────────────────────
// Filled by the local `dashboard` project's now-summary generator, which
// writes a sanitized summary to public/now-data.json (income stays private).
// Any null field renders a graceful "—" until the first sync.
interface NowData {
  updatedAt: string | null;
  focusHoursWeek: number | null;
  pomodorosTotal: number | null;
  focusStreakDays: number | null;
  screenTimeHoursWeek: number | null;
  caughtSlackingWeek: number | null;
}

const fmt = (v: number | null, suffix = ''): string =>
  v === null || v === undefined ? '—' : `${v}${suffix}`;

const NowPage: React.FC = () => {
  const [data, setData] = useState<NowData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/now-data.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const stats = [
    { key: 'focus', icon: <LuBrain />, label: 'Focused this week', value: fmt(data?.focusHoursWeek ?? null, 'h') },
    { key: 'pomo', icon: <LuTimer />, label: 'Pomodoros logged', value: fmt(data?.pomodorosTotal ?? null) },
    { key: 'streak', icon: <LuFlame />, label: 'Focus streak', value: fmt(data?.focusStreakDays ?? null, ' days') },
    { key: 'screen', icon: <LuMonitorSmartphone />, label: 'Screen time / week', value: fmt(data?.screenTimeHoursWeek ?? null, 'h') },
    { key: 'zap', icon: <LuZap />, label: 'Times caught slacking', value: fmt(data?.caughtSlackingWeek ?? null) },
  ];

  const updated =
    data?.updatedAt && !failed
      ? new Date(data.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
      : null;

  return (
    <div className="now-page" id="now">
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
          <span className="now-hl">zaps me (literally, via a Pavlok)</span> when I drift onto YouTube. The numbers below
          come straight from it.
        </p>
      </section>

      <section className="now-stats" aria-label="Live focus stats from my dashboard">
        {stats.map((s) => (
          <div className="now-stat" key={s.key}>
            <span className="now-stat__icon">{s.icon}</span>
            <span className="now-stat__value">{s.value}</span>
            <span className="now-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      <p className="now-foot">
        {updated ? `Stats last synced ${updated} from my focus dashboard.` : 'Live stats sync from my focus dashboard — coming online soon.'}
      </p>
    </div>
  );
};

export default NowPage;
