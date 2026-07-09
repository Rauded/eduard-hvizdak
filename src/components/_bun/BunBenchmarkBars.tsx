import React, { useEffect, useRef, useState } from 'react';
import './bun-benchmark-bars.scss';

interface BenchItem {
  label: string;
  value: number;        // milliseconds to count up to
  unit?: string;        // e.g. "ms", "s", "x"
  description?: string;
}

interface Props {
  items: BenchItem[];
  title?: string;
}

// Inspired by bun.com's animated benchmark bars. On scroll into view,
// loader bars animate width and numeric counters count up.
const BunBenchmarkBars: React.FC<Props> = ({ items, title }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => items.map(() => 0));
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const maxVal = Math.max(...items.map((i) => i.value), 1);
    const step = maxVal / 60; // ~60fps over ~1s
    let current = 0;

    const tick = () => {
      current += step;
      if (current >= maxVal) {
        setCounts(items.map((i) => i.value));
        return;
      }
      setCounts(items.map((i) => Math.min(Math.round(current * (i.value / maxVal)), i.value)));
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, items]);

  return (
    <div className="bun-bench" ref={rootRef}>
      {title && <h3 className="bun-bench__title">{title}</h3>}
      <div className="bun-bench__list">
        {items.map((item, i) => (
          <div className={`bun-bench__row ${visible ? 'is-visible' : ''}`} key={item.label}>
            <div className="bun-bench__header">
              <span className="bun-bench__label">{item.label}</span>
              <span className="bun-bench__counter">
                {counts[i]}
                {item.unit || ''}
              </span>
            </div>
            {item.description && (
              <p className="bun-bench__desc">{item.description}</p>
            )}
            <div className="bun-bench__track">
              <div
                className="bun-bench__bar"
                style={{
                  width: visible ? `${(counts[i] / Math.max(...items.map((x) => x.value), 1)) * 100}%` : '0%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BunBenchmarkBars;
