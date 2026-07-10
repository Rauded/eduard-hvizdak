import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Seo from '../../seo/Seo';
import './styleguide.scss';

// ─── Living type specimen ──────────────────────────────────────────────────
// Renders every step of the type scale (typescale.scss) and reads its COMPUTED
// values back with getComputedStyle, so the numbers shown here are whatever the
// browser actually painted. That makes this page double as visual QA: if a
// token changes, the specimen updates itself, and it can never drift from the
// real CSS the way a hand-written table would.

type Step = {
  cls: string;         // scale utility class under test
  tag: keyof JSX.IntrinsicElements;
  name: string;        // human label
  token: string;       // the size token it composes
  sample: string;
};

// The scale steps, in visual order. Names match STYLEGUIDE.md and the tokens.
const STEPS: Step[] = [
  // tag kept semantic-neutral (p): this is a visual specimen, and the page's real
  // heading is the single <h1> below. Two more h1s here would be a heading-order bug.
  { cls: 't-display', tag: 'p', name: 'Display', token: '--text-display', sample: 'Eduard builds things' },
  { cls: 't-h1', tag: 'p', name: 'Heading 1', token: '--text-h1', sample: 'Section headline' },
  { cls: 't-h2', tag: 'h2', name: 'Heading 2', token: '--text-h2', sample: 'Subsection headline' },
  { cls: 't-h3', tag: 'h3', name: 'Heading 3', token: '--text-h3', sample: 'Card title' },
  { cls: 't-h4', tag: 'h4', name: 'Heading 4', token: '--text-h4', sample: 'Minor heading' },
  { cls: 't-h5', tag: 'h5', name: 'Heading 5', token: '--text-h5', sample: 'Small heading' },
  { cls: 't-h6', tag: 'h6', name: 'Heading 6', token: '--text-h6', sample: 'Smallest heading' },
  { cls: 't-lead', tag: 'p', name: 'Lead', token: '--text-lead', sample: 'An intro paragraph that leads a section with a touch more size than body copy.' },
  { cls: 't-body', tag: 'p', name: 'Body', token: '--text-body', sample: 'The default reading size. Most paragraphs, list items, and prose on the site live here in Geist Sans at a comfortable line height.' },
  { cls: 't-small', tag: 'p', name: 'Small', token: '--text-small', sample: 'Secondary copy, captions with weight, and dense UI text.' },
  { cls: 't-caption', tag: 'p', name: 'Caption', token: '--text-caption', sample: 'Muted fine print and image captions.' },
  { cls: 't-label', tag: 'span', name: 'Label', token: '--text-label', sample: 'Eyebrow / Tag' },
  { cls: 't-mono', tag: 'span', name: 'Mono', token: '--text-small', sample: 'const signature = "Geist Mono";' },
];

// Font specimens, one per loaded family, so the whole palette is visible at once.
const FAMILIES: { name: string; varName: string; style?: React.CSSProperties; sample: string }[] = [
  { name: 'Geist Sans', varName: '--font-geist', sample: 'The quick brown fox jumps over the lazy dog 0123456789' },
  { name: 'Geist Mono', varName: '--font-mono', sample: 'the quick brown fox 0123456789 {} => []' },
  { name: 'Geist Pixel', varName: '--font-pixel', sample: 'EDUARD 0123456789' },
  { name: 'Jeju Myeongjo (serif accent)', varName: '--font-serif', style: { fontStyle: 'italic' }, sample: 'an editorial accent word' },
  { name: 'Source Serif 4 (blog reading)', varName: '--font-serif-reading', sample: 'Long-form prose reads in this serif.' },
];

function readSpec(el: HTMLElement): string {
  const cs = getComputedStyle(el);
  const px = (v: string) => `${Math.round(parseFloat(v) * 100) / 100}px`;
  const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
  const lh = cs.lineHeight === 'normal' ? 'normal' : px(cs.lineHeight);
  const ls = cs.letterSpacing === 'normal' ? '0' : cs.letterSpacing;
  return `${fam} · ${px(cs.fontSize)} · ${cs.fontWeight} · lh ${lh} · ls ${ls}`;
}

const StyleguidePage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [specs, setSpecs] = useState<Record<number, string>>({});

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const next: Record<number, string> = {};
    root.querySelectorAll<HTMLElement>('[data-step]').forEach((el) => {
      const i = Number(el.dataset.step);
      next[i] = readSpec(el);
    });
    setSpecs(next);
  }, []);

  useLayoutEffect(() => { measure(); }, [measure]);

  useEffect(() => {
    // clamp() sizes change with viewport, so re-measure on resize.
    window.addEventListener('resize', measure);
    // Fonts finish loading after first paint; re-measure once they settle.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <div className="styleguide" ref={rootRef}>
      <Seo
        title="Style guide"
        description="The typography system for eduardhvizdak.com: the Geist-led type scale, font roles, and usage rules."
        path="/styleguide"
        noindex
      />

      <header className="styleguide__head">
        <span className="t-label styleguide__eyebrow">Design language</span>
        <h1 className="t-display">Typography</h1>
        <p className="t-lead">
          One Geist-led system. Every heading, paragraph, and label on the site
          composes the tokens below. The specs are read live from the rendered
          page, so they always match reality.
        </p>
        <p className="t-small styleguide__note">
          The display face is switchable. The Jeju serif is the default; append{' '}
          <code>?type=geist</code> to any URL for the Geist Sans look, or{' '}
          <code>?type=reset</code> to return to the serif.
        </p>
      </header>

      <section className="styleguide__section">
        <h2 className="t-h2">Type scale</h2>
        <div className="styleguide__scale">
          {STEPS.map((s, i) => {
            const Tag = s.tag as any;
            return (
              <div className="sg-row" key={s.cls}>
                <div className="sg-row__meta">
                  <span className="sg-row__name">{s.name}</span>
                  <code className="sg-row__token">.{s.cls}</code>
                  <code className="sg-row__spec">{specs[i] || 'measuring…'}</code>
                </div>
                <Tag className={s.cls} data-step={i}>{s.sample}</Tag>
              </div>
            );
          })}
        </div>
      </section>

      <section className="styleguide__section">
        <h2 className="t-h2">Font roles</h2>
        <div className="styleguide__families">
          {FAMILIES.map((f) => (
            <div className="sg-fam" key={f.name}>
              <div className="sg-fam__meta">
                <span className="sg-fam__name">{f.name}</span>
                <code className="sg-fam__var">{f.varName}</code>
              </div>
              <p
                className="sg-fam__sample"
                style={{ fontFamily: `var(${f.varName})`, ...(f.style || {}) }}
              >
                {f.sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="styleguide__section">
        <h2 className="t-h2">Accents</h2>
        <div className="styleguide__accents">
          <p className="t-h3">
            A headline with a <span className="serif-accent">serif</span> accent word.
          </p>
          <p className="t-h3">
            A wordmark set in <span className="pixel-accent">PIXEL</span> display.
          </p>
          <p className="sg-numerals">
            <span className="pixel-accent">01</span>
            <span className="pixel-accent">02</span>
            <span className="pixel-accent">03</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default StyleguidePage;
