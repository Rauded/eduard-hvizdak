import React, { useState } from 'react';
import { SerifPreset, SERIF_PRESETS, getSerifPreset, setSerifPreset } from '../../config/serifPreview';

// TEMPORARY floating control to compare the three serif-heading strategies live
// (see src/config/serifPreview.ts). Inline-styled and self-contained so the
// whole feature can be deleted in one pass once a serif is chosen. Scroll to any
// heading (About, Experience, Projects) and toggle to compare, then switch
// language to confirm headings no longer shift.

const LABELS: Record<SerifPreset, string> = {
  jeju: 'Jeju (EN only)',
  source: 'Source Serif',
  playfair: 'Playfair',
};

const wrap: React.CSSProperties = {
  position: 'fixed',
  right: '14px',
  bottom: '14px',
  zIndex: 4000,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  padding: '8px',
  borderRadius: '12px',
  background: 'rgba(9, 9, 11, 0.9)',
  boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
  backdropFilter: 'blur(8px)',
  fontFamily: 'var(--font-mono, monospace)',
};

const cap: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  padding: '0 2px 2px',
};

const row: React.CSSProperties = { display: 'flex', gap: '5px' };

const btn = (active: boolean): React.CSSProperties => ({
  appearance: 'none',
  border: '1px solid ' + (active ? 'transparent' : 'rgba(255,255,255,0.18)'),
  background: active ? '#ffffff' : 'transparent',
  color: active ? '#09090b' : 'rgba(255,255,255,0.8)',
  fontFamily: 'inherit',
  fontSize: '11px',
  fontWeight: 500,
  padding: '6px 9px',
  borderRadius: '7px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
});

const SerifPreviewSwitcher: React.FC = () => {
  const [preset, setPreset] = useState<SerifPreset>(() => getSerifPreset());

  const pick = (p: SerifPreset) => {
    setSerifPreset(p);
    setPreset(p);
  };

  return (
    <div style={wrap} role="group" aria-label="Heading serif preview">
      <span style={cap}>Heading font (preview)</span>
      <div style={row}>
        {SERIF_PRESETS.map((p) => (
          <button key={p} type="button" style={btn(p === preset)} aria-pressed={p === preset} onClick={() => pick(p)}>
            {LABELS[p]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SerifPreviewSwitcher;
