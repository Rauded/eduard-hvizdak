import React from 'react';
import './orbiting-stack.scss';
import { LuBrainCircuit } from 'react-icons/lu';
import {
  SiPython, SiPostgresql, SiSupabase, SiStripe,
  SiLangchain, SiFastapi, SiVercel,
} from 'react-icons/si';
// SiOpenai was removed from simple-icons; the Remix set still carries it.
import { RiOpenaiFill } from 'react-icons/ri';
import { useT } from '../../i18n';

// ── TEST: 21st.dev "Orbiting Circles" (magicui) ported to SCSS ──────────────
// Integration icons orbit a central AI core in two concentric rings.
// Each brand renders in its official color: Simple Icons draw as currentColor,
// so we set color inline per icon rather than forcing one accent for all.
type OrbitIcon = { Icon: React.ComponentType<any>; color: string };

const INNER: OrbitIcon[] = [
  { Icon: RiOpenaiFill, color: '#412991' },
  { Icon: SiLangchain, color: '#1C3C3C' },
  { Icon: SiPython, color: '#3776AB' },
  { Icon: SiFastapi, color: '#009688' },
];
const OUTER: OrbitIcon[] = [
  { Icon: SiPostgresql, color: '#4169E1' },
  { Icon: SiSupabase, color: '#3FCF8E' },
  { Icon: SiStripe, color: '#635BFF' },
  { Icon: SiVercel, color: '#000000' },
  { Icon: RiOpenaiFill, color: '#412991' },
  { Icon: SiPython, color: '#3776AB' },
];

function ring(icons: OrbitIcon[], radius: number, reverse = false) {
  const step = 360 / icons.length;
  return icons.map(({ Icon, color }, i) => {
    const angle = step * i;
    return (
      <span
        className="orbit__item"
        key={`${radius}-${i}`}
        style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)` }}
      >
        <span className={reverse ? 'orbit__counter orbit__counter--rev' : 'orbit__counter'}>
          <Icon aria-hidden style={{ color }} />
        </span>
      </span>
    );
  });
}

const OrbitingStack: React.FC = () => {
  const t = useT('orbitStack');
  return (
    <section className="orbit-stack" aria-label={t.aria}>
      <div className="orbit-stack__copy">
        <p className="orbit-stack__eyebrow">{t.eyebrow}</p>
        <h2 className="orbit-stack__title">{t.title}</h2>
        <p className="orbit-stack__lead">
          {t.lead}
        </p>
      </div>

      <div className="orbit-stage" aria-hidden>
        <div className="orbit-core"><LuBrainCircuit /></div>
        <div className="orbit orbit--inner">{ring(INNER, 92)}</div>
        <div className="orbit orbit--outer">{ring(OUTER, 168, true)}</div>
      </div>
    </section>
  );
};

export default OrbitingStack;
