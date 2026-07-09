import React from 'react';
import './orbiting-stack.scss';
import { LuBrainCircuit } from 'react-icons/lu';
import {
  SiOpenai, SiPython, SiPostgresql, SiSupabase, SiStripe,
  SiLangchain, SiFastapi, SiVercel,
} from 'react-icons/si';

// ── TEST: 21st.dev "Orbiting Circles" (magicui) ported to SCSS ──────────────
// Integration icons orbit a central AI core in two concentric rings.
const INNER = [SiOpenai, SiLangchain, SiPython, SiFastapi];
const OUTER = [SiPostgresql, SiSupabase, SiStripe, SiVercel, SiOpenai, SiPython];

function ring(icons: React.ComponentType<any>[], radius: number, reverse = false) {
  const step = 360 / icons.length;
  return icons.map((Icon, i) => {
    const angle = step * i;
    return (
      <span
        className="orbit__item"
        key={`${radius}-${i}`}
        style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)` }}
      >
        <span className={reverse ? 'orbit__counter orbit__counter--rev' : 'orbit__counter'}>
          <Icon aria-hidden />
        </span>
      </span>
    );
  });
}

const OrbitingStack: React.FC = () => (
  <section className="orbit-stack" aria-label="Integrations that plug into the agent">
    <div className="orbit-stack__copy">
      <p className="orbit-stack__eyebrow">Plugs into your stack</p>
      <h2 className="orbit-stack__title">Connected to the tools you already run</h2>
      <p className="orbit-stack__lead">
        Models, data stores, billing and infra, orchestrated together so the automation works with
        your existing systems instead of replacing them.
      </p>
    </div>

    <div className="orbit-stage" aria-hidden>
      <div className="orbit-core"><LuBrainCircuit /></div>
      <div className="orbit orbit--inner">{ring(INNER, 92)}</div>
      <div className="orbit orbit--outer">{ring(OUTER, 168, true)}</div>
    </div>
  </section>
);

export default OrbitingStack;
