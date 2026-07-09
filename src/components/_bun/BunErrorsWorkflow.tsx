import React, { useRef, useEffect } from 'react';
import './bun-errors-workflow.scss';

const num = (n: number) => n.toLocaleString('en-US');

const FILE_LINES: [string, string][] = JSON.parse('[["error",": deref *mut EventLoop before field access"],["error",": js_parser/ast/E.rs: port json_stringify for Number/BigInt/RegExp"],["error",": NodeHTTPResponse.rs: wire JSNodeHTTPResponse cached accessors vi"],["error[E0034]",": multiple applicable items in scope"],["error",": test_command.rs: wire coverage fa\u00e7ade to bun_sourcemap_jsc::code"],["error",": bundler/ungate_support.rs: un-gate bun_css shim to real ::bun_cs"],["error",": dns.rs: implement pending_cache_for/get_key/get_or_put_into_reso"],["error",": css/css_parser.rs: port DefineShorthand contract, parse_bundler,"],["error",": runtime/crypto/mod.rs: create_crypto_error delegates to boringss"],["error",": bun_core/fmt.rs: implement format_ip reborrow (offset-based slic"],["error",": event_loop/EventLoopTimer.rs: port Timespec::ns from bun.zig"],["error[E0277]",": the trait bound `&mut dyn Api is not satisfied`"],["error",": zig/io_uring/CompletionQueue: missing field `user_data` in init"],["error[E0432]",": unresolved import `bun_core::pipe`"],["error",": serialize/JsonStringifier: add missing generic to write_big_int"],["error[E0308]",": mismatched types (EventLoop::now -> JSC::JSValue)"],["error",": bun:analytics/telemetry: flush on Drop not firing on pani"],["error",": js_parser/ParserContext: no method named `peek` found for `Peekable`"],["error",": runtime/body: Body.Value.writeJson: missing &mut on Write"],["error",": bun_sql/ConnectionPool: ConnectionPoolTask variant `ConnectTimeout`"],["error",": bun_crypto/rand: missing OsRng import after zig\u2192rust port"],["error[E0599]",": no method named `as_micros` found for struct `Timespec`"],["error",": cli/upgrade_command: File::open on non-existent temp path"],["error",": node:zlib bindings missing napi_async_work for deflate"],["error",": resolver/require_resolve: bad `ModuleType::MaybeESM` match"],["error",": bun:install/lockfile: migration dedup loses bin entries"],["error",": bun:jsc/class_handle: JSC::JSClass->constructor not called"],["error",": bun:css/parser: property_aliases incomplete for -webkit-*"],["error",": event_loop/io: kqueue EVFILTER_TIMER overflow on 32-bit"],["error",": bun:install/git: shallow clone fails on missing refspec"],["error",": bun:sql/mysql: PreparedStatement field count mismatch"],["error",": bun:bundler/splitting: code_splitter panic on export *"],["error",": bun:http/response: Response.arrayBuffer leaks via jsvalue"],["error",": bun:crypto/cipher: missing `finalize` for ChaCha20Poly13"],["error",": node:fs/promises: opendir not forwarding AbortSignal"],["error",": bun:runtime/module: require.cache not invalidated on .js"],["error",": bun:runtime/task: unhandled rejection crash in event loop"],["error",": bun:install/npm: registry returns 403 on scoped packages"],["error",": bun:transpiler: async arrow in decorator crashes parser"],["error",": node:buffer: Buffer.toString base64url incorrect padding"]]');

const SUBJECTS: [number, string][] = JSON.parse('[[0,"phase-d(src/runtime/shell): fix SystemErrno variant name NAMETOOLONG -> ENAMETOOLONG"],[924000,"phase-d(bun_core): fix reload_process Windows exit code, dupe envp/argv, err_generic"],[1663000,"phase-d(glob): DirEntryNameWrapper.value -> *const [u8] (drop fabricated \'static via from_"],[1828000,"phase-d(tier0): bun_dotenv/bun_uws/bun_io: adapt warn/debug_warn to (fmt,&args) signature,"],[2139000,"phase-d(sql_jsc/mysql/protocol): fix imports, ReaderContext bounds, WTFStringImpl helper"],[2455000,"phase-d(tier0): bun_sourcemap parse_json: BabyList.len field, Option<StoreRef> unwrapping "],[2841000,"phase-d(jpa): skipTypescript.rs \u2014 port real bodies, drop _draft/todo stubs"],[3000000,"phase-d(jpa): S.rs"],[3053000,"phase-d(jpa): visitExpr.rs \u2014 deref StoreRef<Call> for &mut E::Call hook helpers"],[3106000,"phase-d(jpa): Scope.rs derive Clone (Zig value-copy semantics for Ast.module_scope)"],[3116000,"phase-d(jpa): Lazy.rs: drop _draft, real ExprId"],[3232000,"phase-d(jpa): bump.rs: restore the old cast-based, then implement real bump from"],[3244000,"phase-d(jpa): bump_typed_arena: port to typed-arena from hand-rolled Zig"],[3257000,"phase-d(jpa): rewrite_const: reference from Stage 2 Phase C (dropping dead ast"],[3265000,"phase-d(jpa): Hoist.rs: new crate, split-scope & hoist machinery ref"],[4935000,"phase-d(jpa): T.rs: fix lifetime on arena (runaway generics)"],[5057000,"phase-d(jpa): ArenaRef rewrite: 32-bit handle, not pointer"],[5679000,"phase-d(jpa): switch from Vec<Cell> to slab (S.rs)"],[5690000,"phase-d(jpa): global type arena registry"],[5738000,"phase-d(jpa): ALLOWED_DEPRECATED .deref() -> *const"],[5821000,"phase-d(jpa): turn on FIXMEs: typed_arena::Arena vs Vec<Cell>"],[5856000,"phase-d(jpa): implicit reborrow of &mut StoreRef<[u8]>"],[5885000,"phase-d(jpa): remove -Zdrop-tracking from Cargo.toml"],[5952000,"phase-d(jpa): checkpoint \u2014 39 crates compiling"],[6145000,"phase-d(jpa): alloc w/ CustomAllocator (tracing)"],[6163000,"phase-d(jpa): remove unused import warnings sweep"],[6211000,"phase-d(jpa): unstable smir (stable MIR) cfg out"],[6261000,"phase-d(jpa): BENCHMARK: phase-c build time -50%"],[6666000,"phase-d(jpa): lint: fix all remaining clippy warnings"],[7789000,"phase-d(jpa): skip bindgen output"],[7799000,"phase-d(jpa): skip unnecessary bikelog in gitignore"],[7810000,"phase-d(tier0): clippy fixes"],[7851000,"phase-d(tier0): more clippy fix for bun_dotenv"],[7878000,"phase-d(tier0): constify StaticallyNamedClosure"],[7887000,"phase-d(tier0): constify JSC_Function"],[7904000,"phase-d(tier0): handle Zig-abi repr in bun_sys"],[7911000,"phase-d(tier0): bun_mimalloc stats fix"],[7916000,"phase-d(tier0): pipe/close err_generic"],[7924000,"phase-d(tier0): fix unused import build warning"],[7942000,"phase-d(runtime/windows): dns resolution on Windows"],[7942000,"phase-d(tier0): fmt::Display for IOError"],[7955000,"phase-d(tier0): construct err_generic from io::Error"],[7962000,"phase-d(tier0): pub use in bun_io"],[7974000,"phase-d(tier0): import cleanup"],[7979000,"phase-d(tier0): bun_io::pipe re-export"],[7986000,"phase-d(tier0): cli: alias -- for bun run"],[7990000,"phase-d(tier0): bun:install support for --no-summary"],[7994000,"phase-d(tier0): sql: jsc function type fix"],[7996000,"phase-d(tier0): error: bun_crypto on arm64"],[8015000,"phase-d(tier0): bun_wasi fix for file descriptor"],[8019000,"phase-d(tier0): analytics flush on shutdown"],[8022000,"phase-d(tier0): bun:jsc class_handle napi"],[8032000,"phase-d(tier0): install: legacy peer deps"],[8043000,"phase-d(tier0): napi: fn name fix"],[8053000,"phase-d(tier0): bun:sql: mysql charsets"],[8062000,"phase-d(tier0): wasm: link fix on mac"],[8078000,"phase-d(tier0): bun:bundler: import.meta.url"]]');

const EVENTS: [number, number][] = JSON.parse('[[0,0],[9000,0],[20000,0],[35000,0],[44000,0],[50000,0],[391000,3],[474000,23],[606000,9],[609000,24],[750000,8],[771000,25],[835000,16],[924000,8],[1001000,9],[1071000,26],[1073000,27],[1074000,28],[1134000,7],[1297000,29],[1312000,30],[1349000,31],[1412000,10],[1468000,17],[1502000,18],[1539000,32],[1663000,17],[1685000,10],[1737000,33],[1743000,8],[1744000,9],[1745000,11],[1748000,12],[1751000,13],[1759000,16],[1761000,7],[1767000,10],[1777000,14],[1784000,11],[1828000,18],[1882000,7],[1917000,13],[2012000,4],[2041000,5],[2046000,2],[2047000,4],[2064000,15],[2069000,19],[2073000,4],[2077000,6],[2082000,4],[2089000,19],[2139000,2],[2155000,2],[2165000,4],[2227000,4],[2297000,2],[2302000,4],[2326000,4],[2334000,6],[2341000,6],[2343000,6],[2371000,15],[2399000,4],[2447000,4],[2455000,15],[2461000,5],[2518000,2],[2564000,2],[2598000,6],[2686000,3],[2767000,3],[2789000,3],[2790000,3],[2795000,3],[2807000,5],[2827000,3],[2829000,3],[2841000,3],[2865000,3],[2891000,3],[2907000,3],[2911000,3],[2922000,3],[2939000,2],[2956000,3],[2965000,3],[2981000,3],[2984000,3],[2986000,3],[2995000,3],[3000000,3],[3027000,34],[3029000,3],[3031000,35],[3034000,3],[3036000,3],[3037000,11],[3040000,36],[3042000,3],[3043000,3],[3046000,20],[3050000,3],[3053000,20],[3053000,3],[3056000,6],[3056000,14],[3057000,3],[3062000,14],[3069000,3],[3073000,3],[3078000,3],[3083000,37],[3089000,21],[3089000,3],[3096000,3],[3098000,3],[3106000,3],[3116000,7],[3126000,3],[3232000,7],[3244000,3],[3257000,3],[3265000,6],[4935000,22],[5057000,38],[5679000,8],[5690000,13],[5738000,7],[5821000,32],[5856000,5],[5885000,22],[5952000,39],[6145000,12],[6163000,21],[6211000,5],[6261000,5],[6666000,12]]');

const LANE_TOTALS = [1162,252,67,40,10,7,7,6,4,3,3,3,3,3,3,3,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1];
const STAGES = ['#fbbf24', '#a78bfa', '#4ade80'];
const CRATES: [string, string][] = [["bun_runtime","#f472b6"],["bun_bundler","#fb923c"],["bun_sql","#f87171"],["bun_js_parser","#34d399"],["bun_css","#38bdf8"],["bun_http","#fbbf24"],["bun_interchange","#a78bfa"],["bun_sys","#22d3ee"],["bun_core","#a3e635"],["bun_string","#fb7185"],["bun_logger","#2dd4bf"],["bun_uws_sys","#c084fc"],["bun_alloc","#f472b6"],["bun_collections","#fb923c"],["bun_ptr","#f87171"],["bun_sourcemap","#34d399"],["bun_safety","#38bdf8"],["bun_glob","#fbbf24"],["bun_dotenv","#a78bfa"],["bun_router","#22d3ee"],["bun_uws","#a3e635"],["bun_io","#fb7185"],["bun_ini","#2dd4bf"],["bun_lolhtml_sys","#c084fc"],["bun_test_runner","#f472b6"],["bun_cares_sys","#fb923c"],["bun_url","#f87171"],["bun_picohttp","#34d399"],["bun_clap","#38bdf8"],["bun_boringssl","#fbbf24"],["bun_watcher","#a78bfa"],["bun_analytics","#22d3ee"],["bun_libarchive","#a3e635"],["bun_paths","#fb7185"],["bun_aio","#2dd4bf"],["bun_options_types","#c084fc"],["bun_zlib","#f472b6"],["bun_crash_handler","#fb923c"],["bun_js_printer","#f87171"],["bun_resolver","#34d399"],["bun_http_jsc","#38bdf8"],["bun_install","#fbbf24"]];
const LAST = 'phase-d: final link dedup \u2192 BINARY';
const t0 = 1778053205000;
const MAXV = 10;
const TOTAL = 1610;

const L = LANE_TOTALS.length;
const WORK = EVENTS.filter(e => e[1] >= 0);
const BATCH = Math.max(1, Math.ceil(WORK.length / 150));

function buildBatches() {
  const batches: [number, number][][] = [];
  for (let i = 0; i < WORK.length; i += BATCH) {
    batches.push(WORK.slice(i, i + BATCH));
  }
  return batches;
}
const BATCHES = buildBatches();

const clockFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const BunErrorsWorkflow: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  const play = () => {
    const root = rootRef.current;
    if (!root) return;

    const errsEl = root.querySelector('.wq-errs') as HTMLElement | null;
    const clockEl = root.querySelector('.wq-clock') as HTMLElement | null;
    const btn = root.querySelector('.wq-btn') as HTMLButtonElement | null;
    const commitsEl = root.querySelector('.wq-commits') as HTMLElement | null;
    const linesBox = root.querySelector('.wq-file-lines') as HTMLElement | null;
    const fileBox = root.querySelector('.wq-file') as HTMLElement | null;
    const flow = root.querySelector('.wq-flow') as HTMLElement | null;
    const rows = root.querySelectorAll('.wq-row');
    const fixed = root.querySelectorAll('.wq-fixed');
    const fills = root.querySelectorAll('.wq-fill');
    const pipes = Array.from(root.querySelectorAll('.wq-pipe'));
    const cells = pipes.map(p => Array.from(p.querySelectorAll('.wq-cell')) as HTMLElement[]);
    const logEls = root.querySelectorAll('.wq-log');

    if (!flow || !linesBox || !fileBox) return;
    const flowEl: HTMLElement = flow;
    const linesBoxEl: HTMLElement = linesBox;
    const fileBoxEl: HTMLElement = fileBox;

    const pending: number[] = [];
    let bi = 0;
    let playing = true;
    let doneCount = 0;
    let lineCursor = 0;
    const laneDone = new Array(L).fill(0);
    const lastUp = new Array(L).fill(-1);
    const visible = new Array(L).fill(false);
    let visCount = 0;
    let inflight = 0;

    function later(ms: number, fn: () => void) {
      pending.push(window.setTimeout(fn, ms));
    }

    function syncLane(l: number) {
      const pct = Math.min(100, (laneDone[l] / LANE_TOTALS[l]) * 100);
      if (fills[l]) (fills[l] as HTMLElement).style.width = pct.toFixed(0) + '%';
      if (fixed[l]) fixed[l].textContent = num(laneDone[l]);
    }

    function showRow(l: number, show: boolean) {
      if (rows[l]) (rows[l] as HTMLElement).style.display = show ? 'flex' : 'none';
      visible[l] = show;
    }

    function ensure(l: number) {
      if (visible[l]) return;
      if (visCount < MAXV) {
        showRow(l, true);
        visCount++;
        return;
      }
      let evict = -1;
      let oldest = 1 / 0;
      for (let k = 0; k < L; k++) {
        if (visible[k] && lastUp[k] < oldest) {
          oldest = lastUp[k];
          evict = k;
        }
      }
      if (evict >= 0) {
        showRow(evict, false);
        showRow(l, true);
      }
    }

    function mkLine(i: number, fixedLine?: boolean): HTMLElement {
      const [code, msg] = FILE_LINES[i % FILE_LINES.length];
      const d = document.createElement('div');
      d.className = 'truncate';
      const a = document.createElement('span');
      a.style.cssText = fixedLine ? 'color:#4ade80;font-weight:700' : 'color:#f87171;font-weight:700';
      a.textContent = fixedLine ? '\u2713 ' + code : code;
      const b = document.createElement('span');
      b.style.color = fixedLine ? '#4b5563' : '#9ca3af';
      b.textContent = msg;
      d.append(a, b);
      return d;
    }

    function fillFile() {
      linesBoxEl.textContent = '';
      for (let i = 0; i < 11; i++) {
        linesBoxEl.appendChild(mkLine(i, true));
      }
      lineCursor = 11;
    }

    function consumeLine() {
      if (linesBoxEl.firstChild) linesBoxEl.removeChild(linesBoxEl.firstChild);
      linesBoxEl.appendChild(mkLine(lineCursor++));
    }

    function applyBatch(batch: [number, number][]) {
      for (const [, l] of batch) {
        laneDone[l] = (laneDone[l] || 0) + 1;
      }
      const lanesIn = Array.from(new Set(batch.map(e => e[1])));
      for (const l of lanesIn) {
        lastUp[l] = bi;
        syncLane(l);
      }
      doneCount += batch.length;
      const t = batch[batch.length - 1][0];
      if (errsEl) errsEl.textContent = '\u2248' + num(Math.max(0, Math.round(16000 * (1 - doneCount / TOTAL))));
      if (commitsEl) commitsEl.textContent = num(doneCount) + ' fix commits';
      if (clockEl) clockEl.textContent = clockFmt.format(new Date(t0 + t)) + ' PDT';

      let hi = -1;
      for (let k = 0; k < SUBJECTS.length; k++) {
        if (SUBJECTS[k][0] <= t) hi = k;
        else break;
      }
      for (let j = 0; j < logEls.length; j++) {
        const k = hi - (logEls.length - 1 - j);
        if (k >= 0 && k < SUBJECTS.length) {
          logEls[j].textContent = '\u00b7 ' + SUBJECTS[k][1];
          (logEls[j] as HTMLElement).style.color = j === logEls.length - 1 ? '#fbf0df' : '#6b7280';
        } else {
          logEls[j].textContent = '\u00a0';
        }
      }
    }

    function placeChip(chip: HTMLElement, a: [number, number], ms: number) {
      chip.style.transition = ms ? 'transform ' + ms + 'ms cubic-bezier(0.4, 0, 0.3, 1)' : 'none';
      chip.style.transform = 'translate(' + (a[0] - 5) + 'px,' + (a[1] - 5) + 'px)';
    }

    function anchor(el: HTMLElement): [number, number] {
      const fr = flowEl.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return [r.left - fr.left + r.width / 2, r.top - fr.top + r.height / 2];
    }

    function glowCell(c: HTMLElement, color: string, ms: number) {
      c.style.opacity = '1';
      c.style.boxShadow = '0 0 9px ' + color;
      later(ms, () => {
        if (playing) {
          c.style.opacity = '0.22';
          c.style.boxShadow = 'none';
        }
      });
    }

    const chips: HTMLElement[] = pipes.map(() => {
      const chip = document.createElement('span');
      chip.style.cssText = 'position:absolute;width:10px;height:10px;border-radius:50%;background:#fbbf24;opacity:0;pointer-events:none;transition:transform 350ms cubic-bezier(0.4,0,0.3,1),opacity 150ms';
      flow.appendChild(chip);
      return chip;
    });

    function stopLoops() {
      playing = false;
      for (const t of pending) clearTimeout(t);
      pending.length = 0;
      for (const chip of chips) chip.style.opacity = '0';
      for (const cs of cells) {
        for (const c of cs) {
          c.style.opacity = '0.4';
          c.style.boxShadow = 'none';
        }
      }
    }

    function finalState() {
      for (let l = 0; l < L; l++) {
        laneDone[l] = LANE_TOTALS[l];
        syncLane(l);
        showRow(l, l < MAXV);
      }
      visCount = MAXV;
      if (errsEl) { errsEl.textContent = '0'; errsEl.style.color = '#4ade80'; }
      if (commitsEl) commitsEl.textContent = num(TOTAL) + ' fix commits';
      if (clockEl) clockEl.textContent = 'Wed, May 6, 12:42 PM PDT';
      linesBoxEl.textContent = '';
      for (let i = 0; i < 11; i++) linesBoxEl.appendChild(mkLine(i, true));
      if (logEls.length >= 3) {
        logEls[logEls.length - 1].textContent = '\u00b7 ' + LAST;
        (logEls[logEls.length - 1] as HTMLElement).style.color = '#fbf0df';
      }
    }

    function maybeFinish() {
      if (bi >= BATCHES.length && inflight === 0 && playing) {
        stopLoops();
        finalState();
      }
    }

    function runLoop(i: number) {
      if (!playing || bi >= BATCHES.length) {
        maybeFinish();
        return;
      }
      const batch = BATCHES[bi++];
      const lane = batch[batch.length - 1][1];
      inflight++;
      const chip = chips[i];
      const cs = cells[i];
      consumeLine();
      ensure(lane);
      lastUp[lane] = bi;

      placeChip(chip, anchor(fileBoxEl), 0);
      chip.style.opacity = '1';

      later(30, () => placeChip(chip, anchor(cs[0]), 320));
      later(350, () => glowCell(cs[0], STAGES[0], 360));
      later(710, () => {
        const a1 = anchor(cs[1]);
        const a2 = anchor(cs[2]);
        placeChip(chip, [(a1[0] + a2[0]) / 2, a1[1]], 130);
        glowCell(cs[1], STAGES[1], 440);
        glowCell(cs[2], STAGES[1], 440);
      });
      later(1150, () => {
        placeChip(chip, anchor(cs[3]), 130);
        glowCell(cs[3], STAGES[2], 240);
      });
      later(1400, () => {
        placeChip(chip, anchor(rows[lane] as HTMLElement), 360);
      });
      later(1760, () => {
        chip.style.opacity = '0';
        applyBatch(batch);
        inflight--;
        maybeFinish();
      });
      later(1900 + (i % 5) * 60, () => runLoop(i));
    }

    function rewind() {
      bi = 0;
      doneCount = 0;
      inflight = 0;
      visCount = 0;
      for (let l = 0; l < L; l++) {
        laneDone[l] = 0;
        lastUp[l] = -1;
        syncLane(l);
        showRow(l, false);
      }
      if (errsEl) { errsEl.textContent = '\u224816,000'; errsEl.style.color = ''; }
      if (commitsEl) commitsEl.textContent = '0 fix commits';
      if (clockEl) clockEl.textContent = clockFmt.format(new Date(t0)) + ' PDT';
      Array.from(logEls).forEach(le => {
        (le as HTMLElement).textContent = '\u00a0';
        (le as HTMLElement).style.color = '';
      });
      fillFile();
    }

    if (!btn) return;
    if (!btn.style.minWidth) btn.style.minWidth = btn.getBoundingClientRect().width + 'px';
    btn.textContent = '\u21bb replay';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      rewind();
      playing = true;
      while (bi < BATCHES.length) applyBatch(BATCHES[bi++]);
      stopLoops();
      finalState();
      return;
    }

    stopLoops();
    rewind();
    playing = true;
    pipes.forEach((_, i) => later(i * 125, () => runLoop(i)));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5) {
          io.disconnect();
          if (!playedRef.current) {
            playedRef.current = true;
            play();
          }
          return;
        }
      }
    }, { threshold: [0.1, 0.3, 0.5, 0.75] });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const worktrees = [1, 2, 3, 4];

  return (
    <section ref={rootRef} id="kNEWvTWBCT" style={{
      overflowAnchor: 'none', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid #1f2937', background: '#0b0c10', color: '#d1d5db',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px 16px', padding: '20px 28px 4px' }}>
        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px' }}>
          <span style={{
            borderRadius: '999px', border: '1px solid #d9775766', padding: '2px 10px',
            fontFamily: "'JetBrains Mono','RobotoMono',monospace", fontSize: '9px',
            fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
            color: '#e8946f',
          }}>&#10039; claude code &middot; dynamic workflow</span>
        </span>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: '12px 32px', padding: '12px 28px 16px',
      }}>
        <div style={{ fontFamily: "'JetBrains Mono','RobotoMono',monospace", fontSize: 'clamp(1.5em,4vw,2.2em)', fontWeight: 700, fontFeatureSettings: "'tnum'", color: '#fff' }}>
          <span className="wq-errs" style={{ display: 'inline-block', minWidth: '7ch', transition: 'color 0.4s' }}>&#8776;{num(TOTAL)}</span>
          <span style={{ fontSize: '0.6em', fontWeight: 400, color: '#6b7280' }}> errors left</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
          <button type="button" className="wq-btn" onClick={play} style={{
            cursor: 'pointer', borderRadius: '6px', border: '1px solid #374151',
            background: 'rgba(31,41,55,0.6)', padding: '6px 14px',
            fontFamily: "'JetBrains Mono','RobotoMono',monospace", fontSize: '13px',
            color: '#e5e7eb',
          }}>&#9654; replay phase D</button>
          <span className="wq-clock" style={{
            width: '27ch', fontFamily: "'JetBrains Mono','RobotoMono',monospace",
            fontSize: '13px', fontFeatureSettings: "'tnum'", color: '#fbf0df',
          }}>{clockFmt.format(new Date(t0)) + ' PDT'}</span>
        </div>
      </div>

      <div className="wq-flow" style={{
        display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 28px 16px',
        position: 'relative',
      }}>
        <div className="wq-file" style={{
          minWidth: 0, borderRadius: '8px', border: '1px solid #374151',
          background: 'rgba(0,0,0,0.4)', fontFamily: "'JetBrains Mono','RobotoMono',monospace",
        }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            gap: '12px', padding: '8px 12px', borderBottom: '1px solid #374151',
            fontSize: '11px', color: '#9ca3af',
          }}>
            <span>errors.txt</span>
            <span className="wq-commits" style={{ whiteSpace: 'nowrap', color: '#9ca3af' }}>0 fix commits</span>
          </div>
          <div className="wq-file-lines" style={{
            height: '252px', overflow: 'hidden', padding: '8px 12px',
            fontSize: '11px', lineHeight: '1.9',
          }}>
            {FILE_LINES.slice(0, 11).map(([level, msg], i) => (
              <div key={i} className="truncate">
                <span style={{ color: '#f87171', fontWeight: 700 }}>{level}</span>
                <span style={{ color: '#9ca3af' }}>{msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div style={{
            marginBottom: '8px', fontFamily: "'JetBrains Mono','RobotoMono',monospace",
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6b7280',
          }}>divvied up &middot; 64 claudes</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {worktrees.map((wt) => (
              <div key={wt} style={{
                borderRadius: '8px', border: '1px solid #374151',
                background: 'rgba(0,0,0,0.3)', padding: '8px 10px',
              }}>
                <div style={{
                  marginBottom: '6px', fontFamily: "'JetBrains Mono','RobotoMono',monospace",
                  fontSize: '10px', color: '#4b5563', whiteSpace: 'nowrap',
                }}>worktree {wt}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[0, 1, 2, 3].map((pi) => (
                    <div key={pi} className="wq-pipe" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="wq-cell" data-s="0" style={{
                        display: 'inline-block', width: '12px', height: '12px',
                        borderRadius: '3px', backgroundColor: STAGES[0], opacity: 0.4,
                        transition: 'opacity 0.3s', boxShadow: 'none',
                      }} />
                      <span style={{ fontSize: '9px', lineHeight: 1, color: '#374151' }}>&#8594;</span>
                      <span className="wq-cell" data-s="1" style={{
                        display: 'inline-block', width: '12px', height: '12px',
                        borderRadius: '3px', backgroundColor: STAGES[1], opacity: 0.4,
                        transition: 'opacity 0.3s', boxShadow: 'none',
                      }} />
                      <span className="wq-cell" data-s="1" style={{
                        display: 'inline-block', width: '12px', height: '12px',
                        borderRadius: '3px', backgroundColor: STAGES[1], opacity: 0.4,
                        transition: 'opacity 0.3s', boxShadow: 'none',
                      }} />
                      <span style={{ fontSize: '9px', lineHeight: 1, color: '#374151' }}>&#8594;</span>
                      <span className="wq-cell" data-s="2" style={{
                        display: 'inline-block', width: '12px', height: '12px',
                        borderRadius: '3px', backgroundColor: STAGES[2], opacity: 0.4,
                        transition: 'opacity 0.3s', boxShadow: 'none',
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            gap: '4px 12px', fontFamily: "'JetBrains Mono','RobotoMono',monospace",
            fontSize: '10px', color: '#6b7280',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '2px', backgroundColor: STAGES[0] }} />1 fixes
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '2px', backgroundColor: STAGES[1] }} />2 review
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '2px', backgroundColor: STAGES[2] }} />1 applies
            </span>
          </div>
        </div>

        <div style={{ width: '100%', minWidth: 0 }}>
          <div style={{
            marginBottom: '8px', fontFamily: "'JetBrains Mono','RobotoMono',monospace",
            fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6b7280',
          }}>by crate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {CRATES.map(([name, color], i) => (
              <div key={name} className="wq-row" style={{
                display: 'none', alignItems: 'center', gap: '10px',
                fontFamily: "'JetBrains Mono','RobotoMono',monospace", fontSize: '11.5px',
                height: '20px',
              }}>
                <span style={{
                  width: '6.5rem', textAlign: 'right', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#d1d5db',
                }}>{name}</span>
                <span style={{
                  height: '11px', flex: 1, overflow: 'hidden', borderRadius: '2px',
                  background: 'rgba(31,41,55,0.6)',
                }}>
                  <span className="wq-fill" style={{
                    display: 'block', height: '100%', borderRadius: '2px',
                    width: '0%', backgroundColor: color, transition: 'width 0.3s',
                  }} />
                </span>
                <span style={{
                  width: '44px', textAlign: 'right', fontFeatureSettings: "'tnum'", color: '#9ca3af',
                }}>
                  <span className="wq-fixed">0</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderRadius: '8px', border: '1px solid #374151', background: 'rgba(0,0,0,0.4)',
        padding: '12px 16px', margin: '0 28px 20px',
        fontFamily: "'JetBrains Mono','RobotoMono',monospace", fontSize: '12px', lineHeight: '1.25',
      }}>
        <div className="wq-log" style={{ height: '20px', overflow: 'hidden', color: '#6b7280' }}>
          &nbsp;
        </div>
        <div className="wq-log" style={{ height: '20px', overflow: 'hidden', color: '#6b7280' }}>
          &nbsp;
        </div>
        <div className="wq-log" style={{ height: '20px', overflow: 'hidden', color: '#fbf0df' }}>
          &nbsp;
        </div>
      </div>
    </section>
  );
};

export default BunErrorsWorkflow;
