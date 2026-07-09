import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './agent-pipeline.scss';
import {
  LuFileText, LuDatabase, LuGlobe, LuBrainCircuit,
  LuMailCheck, LuFileCheck2, LuZap,
} from 'react-icons/lu';

// ── TEST: 21st.dev "Animated Beam" (magicui) reimagined as an AI-agent ───────
// orchestration diagram. Sources feed a central agent core, which fans out to
// outputs. Beams are measured live from the node refs (responsive) and a glow
// "comet" travels along each path. Pure SVG + CSS, no extra deps.

type Pt = { x: number; y: number };

function edgePath(from: Pt, to: Pt): string {
  // Smooth horizontal S-curve between two points.
  const mx = (from.x + to.x) / 2;
  return `M ${from.x},${from.y} C ${mx},${from.y} ${mx},${to.y} ${to.x},${to.y}`;
}

// Per-node accent colors so the diagram reads as distinct inputs and outputs
// instead of a wall of navy.
const SOURCES = [
  { icon: LuFileText, label: 'Documents', color: '#2563eb' },
  { icon: LuDatabase, label: 'Your database', color: '#d97757' },
  { icon: LuGlobe, label: 'Web & APIs', color: '#1f8f4e' },
];
const OUTPUTS = [
  { icon: LuFileCheck2, label: 'Cited answers', color: '#0d9488' },
  { icon: LuMailCheck, label: 'Actions & email', color: '#7c3aed' },
  { icon: LuZap, label: 'Triggers', color: '#eab308' },
];

const AgentPipeline: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const srcRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const c = wrap.current;
    const k = core.current;
    if (!c || !k) return;
    const cb = c.getBoundingClientRect();
    const center = (el: HTMLElement, side: 'l' | 'r' | 'c'): Pt => {
      const r = el.getBoundingClientRect();
      const x = side === 'l' ? r.left : side === 'r' ? r.right : r.left + r.width / 2;
      return { x: x - cb.left, y: r.top + r.height / 2 - cb.top };
    };
    const coreL = center(k, 'l');
    const coreR = center(k, 'r');
    const next: string[] = [];
    srcRefs.current.forEach((el) => { if (el) next.push(edgePath(center(el, 'r'), coreL)); });
    outRefs.current.forEach((el) => { if (el) next.push(edgePath(coreR, center(el, 'l'))); });
    setPaths(next);
    setBox({ w: cb.width, h: cb.height });
  }, []);

  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [measure]);

  return (
    <section className="agent-pipe" aria-label="How an AI agent pipeline works">
      <div className="agent-pipe__head">
        <p className="agent-pipe__eyebrow">AI automation</p>
        <h2 className="agent-pipe__title">One agent, wired to everything you use</h2>
        <p className="agent-pipe__lead">
          Your sources flow into an orchestrated agent that reasons over them and takes action, with a
          human in the loop where it matters.
        </p>
      </div>

      <div className="agent-pipe__stage" ref={wrap}>
        <svg className="agent-pipe__beams" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} fill="none" aria-hidden>
          {paths.map((d, i) => (
            <g key={i}>
              <path d={d} className="agent-pipe__wire" pathLength={100} />
              <path d={d} className="agent-pipe__comet" pathLength={100} style={{ animationDelay: `${i * 0.5}s` }} />
            </g>
          ))}
        </svg>

        <div className="agent-pipe__col agent-pipe__col--src">
          {SOURCES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="agent-node" key={s.label} ref={(el) => { srcRefs.current[i] = el; }}>
                <Icon aria-hidden style={{ color: s.color }} />
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="agent-pipe__col agent-pipe__col--core">
          <div className="agent-core" ref={core}>
            <span className="agent-core__pulse" aria-hidden />
            <LuBrainCircuit aria-hidden />
            <strong>AI Agent</strong>
            <em>reason · plan · act</em>
          </div>
        </div>

        <div className="agent-pipe__col agent-pipe__col--out">
          {OUTPUTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="agent-node" key={s.label} ref={(el) => { outRefs.current[i] = el; }}>
                <Icon aria-hidden style={{ color: s.color }} />
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentPipeline;
