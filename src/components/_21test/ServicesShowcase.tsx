import React, { useEffect, useRef, useState } from 'react';
import './services-showcase.scss';
import { LuCheck, LuLoader } from 'react-icons/lu';
import { useT } from '../../i18n';

// ── TEST: combined Services "See it run" showcase ───────────────────────────
// One coherent panel: an AI agent runs a multi-step task (left) and the
// outcomes it produces tick up (right). Single flat visual language, one
// motion idea (progress), no competing glow effects.

// Outcomes that describe the exact task the agent above just ran. The numeric
// config stays here; the labels come from the i18n dict, zipped by index.
type Stat = { value: number; suffix?: string; prefix?: string; decimals?: number; label: string };
const STAT_CONFIG: Omit<Stat, 'label'>[] = [
  { value: 240 },
  { value: 1.4, suffix: 's', decimals: 1 },
  { value: 100, suffix: '%' },
];

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setSeen(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

const Ticker: React.FC<Stat & { run: boolean }> = ({ value, suffix, prefix, decimals = 0, label, run }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const dur = 1400; const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return (
    <div className="sx-stat">
      <div className="sx-stat__num">{prefix}{n.toFixed(decimals)}{suffix}</div>
      <div className="sx-stat__label">{label}</div>
    </div>
  );
};

const ServicesShowcase: React.FC = () => {
  const t = useT('showcase');
  const { ref, seen } = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (t.steps.length + 1)), 1100);
    return () => clearInterval(id);
  }, [seen, t.steps.length]);

  return (
    <section className="services-block sx-run" aria-labelledby="sx-run-title" ref={ref}>
      <h2 className="services-block__title" id="sx-run-title">{t.title}</h2>
      <p className="sx-run__lead">
        {t.lead}
      </p>

      <div className="sx-run__grid">
        <div className="sx-run__panel">
          <div className="sx-run__bar">
            <span /><span /><span />
            <span className="sx-run__bartitle">{t.barTitle}</span>
          </div>
          <ul className="sx-run__steps">
            {t.steps.map((s, i) => {
              const done = i < active;
              const running = i === active;
              return (
                <li key={s} className={`sx-run__step${done ? ' is-done' : ''}${running ? ' is-running' : ''}`}>
                  <span className="sx-run__mark">
                    {done ? <LuCheck /> : running ? <LuLoader className="sx-spin" /> : <i />}
                  </span>
                  <span>{s}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sx-run__stats">
          {STAT_CONFIG.map((s, i) => <Ticker key={i} {...s} label={t.stats[i]} run={seen} />)}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
