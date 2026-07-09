import React, { useEffect, useRef, useState } from 'react';

// Scramble/decode text: on first view, each character cycles through random
// glyphs and settles left to right. Adapted for our stack from the originkit
// "Scramble Text" pattern. Respects reduced-motion (shows the final text at
// once) and keeps the final string's length so there is no layout shift.

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>-_/[]{}*#%';

interface Props {
  text: string;
  className?: string;
  // ms between reveal ticks; lower is faster.
  speed?: number;
  // frames each character stays scrambled before it can settle.
  hold?: number;
}

const ScrambleText: React.FC<Props> = ({ text, className, speed = 38, hold = 2 }) => {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setOut(text);
      return undefined;
    }

    let timer: ReturnType<typeof setInterval> | undefined;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      timer = setInterval(() => {
        frame += 1;
        const revealed = Math.floor(frame / hold);
        let s = '';
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          if (ch === ' ') {
            s += ' ';
          } else if (i < revealed) {
            s += ch;
          } else {
            s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setOut(s);
        if (revealed >= text.length) {
          setOut(text);
          if (timer) clearInterval(timer);
        }
      }, speed);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        io.disconnect();
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
};

export default ScrambleText;
