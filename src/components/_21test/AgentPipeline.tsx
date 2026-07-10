import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './agent-pipeline.scss';
import {
  LuFileText, LuDatabase, LuGlobe, LuBrainCircuit,
  LuMailCheck, LuFileCheck2, LuZap,
} from 'react-icons/lu';
import { useT } from '../../i18n';

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
// Icons + colors only; labels come from the i18n dict, zipped by index.
const SOURCES = [
  { icon: LuFileText, color: '#2563eb' },
  { icon: LuDatabase, color: '#d97757' },
  { icon: LuGlobe, color: '#1f8f4e' },
];
const OUTPUTS = [
  { icon: LuFileCheck2, color: '#0d9488' },
  { icon: LuMailCheck, color: '#7c3aed' },
  { icon: LuZap, color: '#eab308' },
];

const AgentPipeline: React.FC = () => {
  const t = useT('agentPipeline');
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
    <section className="agent-pipe" aria-label={t.ariaSection}>
      <div className="agent-pipe__head">
        <p className="agent-pipe__eyebrow">{t.eyebrow}</p>
        <h2 className="agent-pipe__title">{t.title}</h2>
        <p className="agent-pipe__lead">
          {t.lead}
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
              <div className="agent-node" key={t.sources[i]} ref={(el) => { srcRefs.current[i] = el; }}>
                <Icon aria-hidden style={{ color: s.color }} />
                <span>{t.sources[i]}</span>
              </div>
            );
          })}
        </div>

        <div className="agent-pipe__col agent-pipe__col--core">
          <div className="agent-core" ref={core}>
            <span className="agent-core__pulse" aria-hidden />
            <LuBrainCircuit aria-hidden />
            <strong>{t.coreLabel}</strong>
            <em>{t.coreSub}</em>
          </div>
        </div>

        <div className="agent-pipe__col agent-pipe__col--out">
          {OUTPUTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="agent-node" key={t.outputs[i]} ref={(el) => { outRefs.current[i] = el; }}>
                <Icon aria-hidden style={{ color: s.color }} />
                <span>{t.outputs[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentPipeline;
