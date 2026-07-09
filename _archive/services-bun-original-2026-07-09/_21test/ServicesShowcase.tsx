import React, { useEffect, useRef, useState } from 'react';
import './services-showcase.scss';
import { LuCheck, LuLoader } from 'react-icons/lu';

// ── TEST: combined Services "See it run" showcase ───────────────────────────
// One coherent panel: an AI agent runs a multi-step task (left) and the
// outcomes it produces tick up (right). Single flat visual language, one
// motion idea (progress), no competing glow effects.

const AGENT_STEPS = [
  'Reading 240 uploaded documents',
  'Building vector index (VoyageAI)',
  'Retrieving the relevant clauses',
  'Cross-checking against the source',
  'Drafting a cited answer',
];

// Outcomes that describe the exact task the agent above just ran.
type Stat = { value: number; suffix?: string; prefix?: string; decimals?: number; label: string };
const STATS: Stat[] = [
  { value: 240, label: 'Documents indexed in the run' },
  { value: 1.4, suffix: 's', decimals: 1, label: 'Median time to a cited answer' },
  { value: 100, suffix: '%', label: 'Answers traced back to the source' },
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
  const { ref, seen } = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (AGENT_STEPS.length + 1)), 1100);
    return () => clearInterval(id);
  }, [seen]);

  return (
    <section className="services-block sx-run" aria-labelledby="sx-run-title" ref={ref}>
      <h2 className="services-block__title" id="sx-run-title">See it run</h2>
      <p className="sx-run__lead">
        A document-intelligence task, start to finish: the agent works through the steps, and the
        results it produces are exactly what you get back.
      </p>

      <div className="sx-run__grid">
        <div className="sx-run__panel">
          <div className="sx-run__bar">
            <span /><span /><span />
            <span className="sx-run__bartitle">agent · run</span>
          </div>
          <ul className="sx-run__steps">
            {AGENT_STEPS.map((s, i) => {
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
          {STATS.map((s) => <Ticker key={s.label} {...s} run={seen} />)}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
