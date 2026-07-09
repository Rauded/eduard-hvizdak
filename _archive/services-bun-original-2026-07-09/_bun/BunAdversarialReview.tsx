import React, { useEffect, useRef } from 'react';

const LABELS = ['the async close', 'the negative timestamp', 'the eager default'];

interface BugStep {
  file: string;
  codeLines: string[];
  badLines: number[];
  flaw: string;
  fixCode: string[];
  commit: string;
}

const BUGS: BugStep[] = [
  {
    file: 'src/runtime/api/bun/js_bun_spawn_bindings.rs',
    codeLines: [
      'for stdio in [spawned_stdout, spawned_stderr] {',
      '    match stdio {',
      '        StdioResult::Buffer(mut pipe) => {',
      '            pipe.close(Subprocess::on_pipe_close)',
      '        }',
      '        StdioResult::Fd(fd) => fd.close(),',
      '        StdioResult::Unavailable => {}',
      '    }',
      '}',
    ],
    badLines: [2, 3],
    flaw: 'uv_close is asynchronous: libuv keeps the raw handle pointer until the next loop tick, then calls on_pipe_close, which frees the allocation. But `pipe` is a Box that drops at the end of this match arm libuv is left holding freed memory, and the close callback then frees it a second time. Use-after-free, then double-free.',
    fixCode: [
      'for stdio in [spawned_stdout, spawned_stderr] {',
      '    match stdio {',
      '        StdioResult::Buffer(pipe) => {',
      '            Box::leak(pipe).close(Subprocess::on_pipe_close)',
      '        }',
      '        StdioResult::Fd(fd) => fd.close(),',
      '        StdioResult::Unavailable => {}',
      '    }',
      '}',
    ],
    commit: 'f0a454376c14 · win-review: js_bun_spawn_bindings.rs leak Box<uv::Pipe> before async uv_close to avoid UAF/double-free in on_pipe_close',
  },
  {
    file: 'src/runtime/node/node_fs.rs',
    codeLines: [
      '// split f64 seconds into a timespec-style {sec, nsec}',
      'let sec = t.trunc();',
      'TimeLike {',
      '    sec: sec as i64,',
      '    nsec: ((t - sec) * 1e9) as i64,',
      '}',
    ],
    badLines: [1, 4],
    flaw: 'For a negative, non-integer time a file mtime before 1970 trunc rounds toward zero: -1.5 becomes {sec: -1, nsec: -500_000_000}. A negative nsec is an invalid timespec. floor keeps nsec in [0, 1e9): {sec: -2, nsec: 500_000_000}.',
    fixCode: [
      '// split f64 seconds into a timespec-style {sec, nsec}',
      'let sec = t.floor();',
      'TimeLike {',
      '    sec: sec as i64,',
      '    nsec: ((t - sec) * 1e9).round() as i64,',
      '}',
    ],
    commit: '7cc88f00141 · crossplat review fixes: ... node_fs win to_sys_time_like floor() so nsec is in [0,1e9) for negative t ...',
  },
  {
    file: 'src/css/values/color.rs',
    codeLines: [
      '// each side of color-mix() may omit its percentage;',
      '// a missing one defaults to the remainder of the other side',
      'let p1 = first.percentage.unwrap_or(1.0 - second.percentage.unwrap());',
    ],
    badLines: [2],
    flaw: 'unwrap_or evaluates its argument eagerly second.percentage.unwrap() runs even when first.percentage is Some. So color-mix(in srgb, red 40%, blue), where only the second percentage is omitted, panics inside the argument expression before unwrap_or ever gets to ignore it. unwrap_or_else takes a closure and stays lazy.',
    fixCode: [
      'let p1 = first',
      '    .percentage',
      '    .unwrap_or_else(|| 1.0 - second.percentage.unwrap());',
    ],
    commit: '90111846a14 · phase-b2: color.rs gated_full_impl FULLY DISSOLVED (verify: parse_color_mix unwrap_or eager panic, Default CurrentColor vs transparent)',
  },
];

const BunAdversarialReview: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const busyRef = useRef(false);
  const curRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  const later = (ms: number, fn: () => void) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  };

  const clearTimers = () => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  };

  const play = (i: number) => {
    const root = rootRef.current;
    if (!root) return;

    startedRef.current = true;
    busyRef.current = true;
    curRef.current = i;

    const panes = Array.from(root.querySelectorAll('.rv-pane')) as HTMLElement[];
    const chapterEl = root.querySelector('.rv-chapter') as HTMLElement;
    const btn = root.querySelector('.rv-btn') as HTMLButtonElement;
    const N = BUGS.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    panes.forEach((p, j) => { p.style.display = j === i ? '' : 'none'; });
    chapterEl.textContent = 'bug ' + (i + 1) + ' of ' + N + ' \u00b7 ' + LABELS[i];

    const pane = panes[i];
    const msgs = Array.from(pane.querySelectorAll('.rv-m')) as HTMLElement[];
    const bads = Array.from(pane.querySelectorAll('[data-bad]')) as HTMLElement[];

    msgs.forEach((m) => {
      m.style.opacity = '0';
      m.style.transform = 'translateY(4px)';
    });
    bads.forEach((b) => { b.style.background = 'transparent'; });

    const end = (idx: number) => {
      busyRef.current = false;
      btn.textContent = idx + 1 < N ? '\u25b6 next bug \u00b7 ' + LABELS[idx + 1] : '\u21bb replay';
    };

    if (reduce) {
      msgs.forEach((m) => { m.style.opacity = '1'; m.style.transform = 'none'; });
      bads.forEach((b) => { b.style.background = '#7f1d1d55'; });
      end(i);
      return;
    }

    later(150, () => {
      if (msgs[0]) { msgs[0].style.opacity = '1'; msgs[0].style.transform = 'none'; }
    });
    later(700, () => {
      if (msgs[1]) { msgs[1].style.opacity = '1'; msgs[1].style.transform = 'none'; }
      bads.forEach((b) => { b.style.background = '#7f1d1d55'; });
    });
    later(1300, () => {
      if (msgs[2]) { msgs[2].style.opacity = '1'; msgs[2].style.transform = 'none'; }
    });
    later(1500, () => end(i));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const btn = root.querySelector('.rv-btn') as HTMLButtonElement;

    const handleClick = () => {
      if (busyRef.current) return;
      clearTimers();
      const N = BUGS.length;
      const next = !startedRef.current || curRef.current + 1 >= N ? 0 : curRef.current + 1;
      play(next);
    };

    btn.addEventListener('click', handleClick);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5) {
          io.disconnect();
          if (!startedRef.current) { play(0); }
          return;
        }
      }
    }, { threshold: [0.1, 0.3, 0.5, 0.75] });
    io.observe(root);

    return () => {
      btn.removeEventListener('click', handleClick);
      io.disconnect();
      clearTimers();
    };
    // Mount-once setup (observers + listeners); play is stable for our use.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={rootRef} id="rZQUQqMfyk" className="not-prose" style={{
      overflowAnchor: 'none', overflow: 'hidden', borderTop: '1px solid #1f2937',
      borderBottom: '1px solid #1f2937', background: '#0b0c10', color: '#d1d5db',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px 16px', padding: '20px 28px 4px' }}>
        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <span style={{ borderRadius: 999, border: '1px solid rgba(217,119,87,0.4)', padding: '2px 10px', fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#e8946f' }}>&#10039; claude code &middot; dynamic workflow</span>
          <span style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6b7280' }}>adversarial review</span>
        </span>
        <span style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 13, fontVariantNumeric: 'tabular-nums', color: '#4ade80' }}>3 of the many bugs adversarial review caught before merge</span>
      </div>

      <div className="rv-head" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px 16px', padding: '12px 28px 12px' }}>
        <span className="rv-chapter" style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 12, color: '#9ca3af' }}>bug 1 of 3 &middot; the async close</span>
        <button type="button" className="rv-btn" style={{ cursor: 'pointer', borderRadius: 6, border: '1px solid #374151', background: 'rgba(31,41,55,0.6)', padding: '6px 14px', fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 13, color: '#e5e7eb' }}>&#9654; play</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 28px 12px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', fontSize: 13, flexShrink: 0, background: '#fbf0df', color: '#0b0c10' }}>&#10039;</span>
            <span style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 12, fontWeight: 700, color: '#e5e7eb' }}>claude</span>
            <span style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 11, color: '#6b7280' }}>implementer</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 11.5, lineHeight: 1.3, color: '#6b7280' }}>its context: the .zig original, the port plan, its own reasoning</div>
        </div>
        <div style={{ minWidth: 0, textAlign: 'right' }}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', fontSize: 13, flexShrink: 0, background: '#d97757', color: '#0b0c10' }}>&#10039;</span>
            <span style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 12, fontWeight: 700, color: '#e5e7eb' }}>claude</span>
            <span style={{ fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 11, color: '#f87171' }}>adversarial reviewer</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 11.5, lineHeight: 1.3, color: '#6b7280' }}>its context: only the diff. told to assume the code is wrong.</div>
        </div>
      </div>

      <div className="rv-stage">
        {BUGS.map((bug, pi) => (
          <div key={pi} className="rv-pane" style={{ display: pi === 0 ? '' : 'none', padding: '0 28px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <div className="rv-m" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: 0, transform: 'translateY(4px)', transition: 'opacity 0.35s, transform 0.35s' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', fontSize: 13, flexShrink: 0, background: '#fbf0df', color: '#0b0c10', marginTop: 2 }}>&#10039;</span>
                <div style={{ minWidth: 0, maxWidth: '88%', borderRadius: 12, borderTopLeftRadius: 2, border: '1px solid #374151', background: 'rgba(0,0,0,0.4)' }}>
                  <div style={{ padding: '6px 12px', borderBottom: '1px solid rgba(31,41,55,0.8)', fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {bug.file}<span style={{ color: '#4b5563' }}> &middot; compiles clean</span>
                  </div>
                  <div style={{ overflowX: 'auto', padding: '10px 12px', fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 12, lineHeight: 1.75, whiteSpace: 'pre' }}>
                    {bug.codeLines.map((line, li) => (
                      <div key={li}
                        {...(bug.badLines.includes(li) ? { 'data-bad': '1' } : {})}
                        style={{
                          whiteSpace: 'pre',
                          borderRadius: 2,
                          paddingLeft: 4,
                          paddingRight: 4,
                          background: 'transparent',
                          transition: 'background 0.4s',
                        }}
                      >{line}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rv-m" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 10, opacity: 0, transform: 'translateY(4px)', transition: 'opacity 0.35s, transform 0.35s' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', fontSize: 13, flexShrink: 0, background: '#d97757', color: '#0b0c10', marginTop: 2 }}>&#10039;</span>
                <div style={{ minWidth: 0, maxWidth: '88%', borderRadius: 12, borderTopRightRadius: 2, border: '1px solid rgba(220,38,38,0.5)', background: '#19100f', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, color: '#d1d5db' }}>
                  {bug.flaw}
                </div>
              </div>

              <div className="rv-m" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: 0, transform: 'translateY(4px)', transition: 'opacity 0.35s, transform 0.35s' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', fontSize: 13, flexShrink: 0, background: '#fbf0df', color: '#0b0c10', marginTop: 2 }}>&#10039;</span>
                <div style={{ minWidth: 0, maxWidth: '88%', borderRadius: 12, borderTopLeftRadius: 2, border: '1px solid rgba(22,163,74,0.6)', background: 'rgba(5,46,22,0.2)' }}>
                  <div style={{ overflowX: 'auto', padding: '10px 12px', fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 12, lineHeight: 1.75, whiteSpace: 'pre' }}>
                    {bug.fixCode.map((line, li) => (
                      <div key={li} style={{ whiteSpace: 'pre' }}>{line}</div>
                    ))}
                  </div>
                  <div style={{ padding: '0 12px 8px', fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 10.5, color: '#4b5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {bug.commit}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(31,41,55,0.8)', padding: '12px 28px', fontSize: 12, lineHeight: 1.5, color: '#6b7280' }}>
        Three bugs the adversarial reviewers actually caught. every cited commit carries its review attribution in the subject line. All three compiled; all three looked plausible. The reviewer is a second Claude in its own context window: it gets the diff and nothing else none of the implementer's reasoning, and is told to find the way it's wrong. Code is condensed from the cited commits; same bugs, same fixes.
      </div>
    </section>
  );
};

export default BunAdversarialReview;
