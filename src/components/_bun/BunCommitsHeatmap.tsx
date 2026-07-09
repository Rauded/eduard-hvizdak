import React, { useEffect, useRef } from 'react';
import './bun-commits-heatmap.scss';

const CELLS = [{"x":52,"y":24,"fill":"#16181f"},{"x":73,"y":24,"fill":"#16181f"},{"x":94,"y":24,"fill":"#16181f"},{"x":115,"y":24,"fill":"#16181f"},{"x":136,"y":24,"fill":"#16181f"},{"x":157,"y":24,"fill":"#16181f"},{"x":178,"y":24,"fill":"#16181f"},{"x":199,"y":24,"fill":"rgb(106,40,164)","t":7,"n":6},{"x":220,"y":24,"fill":"rgb(88,37,141)","t":8,"n":2},{"x":241,"y":24,"fill":"rgb(80,36,130)","t":9,"n":1},{"x":262,"y":24,"fill":"#16181f"},{"x":283,"y":24,"fill":"rgb(80,36,130)","t":11,"n":1},{"x":304,"y":24,"fill":"rgb(94,38,149)","t":12,"n":3},{"x":325,"y":24,"fill":"rgb(88,37,141)","t":13,"n":2},{"x":346,"y":24,"fill":"#16181f"},{"x":367,"y":24,"fill":"rgb(94,38,149)","t":15,"n":3},{"x":388,"y":24,"fill":"#16181f"},{"x":409,"y":24,"fill":"rgb(103,39,160)","t":17,"n":5},{"x":430,"y":24,"fill":"rgb(103,39,160)","t":18,"n":5},{"x":451,"y":24,"fill":"rgb(80,36,130)","t":19,"n":1},{"x":472,"y":24,"fill":"#16181f"},{"x":493,"y":24,"fill":"rgb(127,37,161)","t":21,"n":13},{"x":514,"y":24,"fill":"#16181f"},{"x":535,"y":24,"fill":"rgb(106,40,164)","t":23,"n":6},{"x":52,"y":45,"fill":"rgb(116,39,165)","t":24,"n":9},{"x":73,"y":45,"fill":"rgb(109,40,168)","t":25,"n":7},{"x":94,"y":45,"fill":"rgb(99,39,154)","t":26,"n":4},{"x":115,"y":45,"fill":"rgb(99,39,154)","t":27,"n":4},{"x":136,"y":45,"fill":"rgb(80,36,130)","t":28,"n":1},{"x":157,"y":45,"fill":"rgb(88,37,141)","t":29,"n":2},{"x":178,"y":45,"fill":"#16181f"},{"x":199,"y":45,"fill":"#16181f"},{"x":220,"y":45,"fill":"rgb(88,37,141)","t":32,"n":2},{"x":241,"y":45,"fill":"rgb(88,37,141)","t":33,"n":2},{"x":262,"y":45,"fill":"#16181f"},{"x":283,"y":45,"fill":"rgb(88,37,141)","t":35,"n":2},{"x":304,"y":45,"fill":"rgb(99,39,154)","t":36,"n":4},{"x":325,"y":45,"fill":"rgb(80,36,130)","t":37,"n":1},{"x":346,"y":45,"fill":"rgb(99,39,154)","t":38,"n":4},{"x":367,"y":45,"fill":"rgb(88,37,141)","t":39,"n":2},{"x":388,"y":45,"fill":"rgb(80,36,130)","t":40,"n":1},{"x":409,"y":45,"fill":"rgb(99,39,154)","t":41,"n":4},{"x":430,"y":45,"fill":"rgb(99,39,154)","t":42,"n":4},{"x":451,"y":45,"fill":"rgb(99,39,154)","t":43,"n":4},{"x":472,"y":45,"fill":"rgb(99,39,154)","t":44,"n":4},{"x":493,"y":45,"fill":"rgb(176,29,143)","t":45,"n":43},{"x":514,"y":45,"fill":"rgb(231,71,108)","t":46,"n":139},{"x":535,"y":45,"fill":"rgb(231,72,107)","t":47,"n":141},{"x":52,"y":66,"fill":"rgb(191,34,135)","t":48,"n":60},{"x":73,"y":66,"fill":"rgb(248,126,72)","t":49,"n":296},{"x":94,"y":66,"fill":"rgb(248,129,70)","t":50,"n":306},{"x":115,"y":66,"fill":"rgb(242,93,93)","t":51,"n":196},{"x":136,"y":66,"fill":"rgb(206,49,125)","t":52,"n":86},{"x":157,"y":66,"fill":"rgb(134,36,159)","t":53,"n":16},{"x":178,"y":66,"fill":"#16181f"},{"x":199,"y":66,"fill":"#16181f"},{"x":220,"y":66,"fill":"rgb(103,39,160)","t":56,"n":5},{"x":241,"y":66,"fill":"rgb(252,171,64)","t":57,"n":458},{"x":262,"y":66,"fill":"rgb(253,224,71)","t":58,"n":695},{"x":283,"y":66,"fill":"rgb(214,56,119)","t":59,"n":102},{"x":304,"y":66,"fill":"rgb(140,35,156)","t":60,"n":19},{"x":325,"y":66,"fill":"rgb(94,38,149)","t":61,"n":3},{"x":346,"y":66,"fill":"#16181f"},{"x":367,"y":66,"fill":"rgb(193,37,134)","t":63,"n":64},{"x":388,"y":66,"fill":"rgb(246,117,78)","t":64,"n":264},{"x":409,"y":66,"fill":"rgb(246,118,78)","t":65,"n":268},{"x":430,"y":66,"fill":"rgb(247,122,75)","t":66,"n":281},{"x":451,"y":66,"fill":"rgb(245,115,80)","t":67,"n":258},{"x":472,"y":66,"fill":"rgb(249,135,67)","t":68,"n":327},{"x":493,"y":66,"fill":"rgb(200,42,129)","t":69,"n":74},{"x":514,"y":66,"fill":"rgb(136,36,158)","t":70,"n":17},{"x":535,"y":66,"fill":"rgb(122,38,163)","t":71,"n":11},{"x":52,"y":87,"fill":"rgb(136,36,158)","t":72,"n":17},{"x":73,"y":87,"fill":"rgb(146,34,154)","t":73,"n":22},{"x":94,"y":87,"fill":"rgb(144,34,155)","t":74,"n":21},{"x":115,"y":87,"fill":"rgb(186,30,139)","t":75,"n":53},{"x":136,"y":87,"fill":"rgb(160,32,149)","t":76,"n":31},{"x":157,"y":87,"fill":"rgb(116,39,165)","t":77,"n":9},{"x":178,"y":87,"fill":"rgb(99,39,154)","t":78,"n":4},{"x":199,"y":87,"fill":"rgb(103,39,160)","t":79,"n":5},{"x":220,"y":87,"fill":"#16181f"},{"x":241,"y":87,"fill":"#16181f"},{"x":262,"y":87,"fill":"#16181f"},{"x":283,"y":87,"fill":"rgb(94,38,149)","t":83,"n":3},{"x":304,"y":87,"fill":"rgb(80,36,130)","t":84,"n":1},{"x":325,"y":87,"fill":"rgb(103,39,160)","t":85,"n":5},{"x":346,"y":87,"fill":"rgb(116,39,165)","t":86,"n":9},{"x":367,"y":87,"fill":"rgb(184,28,140)","t":87,"n":51},{"x":388,"y":87,"fill":"rgb(188,32,137)","t":88,"n":56},{"x":409,"y":87,"fill":"rgb(238,78,103)","t":89,"n":159},{"x":430,"y":87,"fill":"rgb(174,30,144)","t":90,"n":42},{"x":451,"y":87,"fill":"rgb(179,29,142)","t":91,"n":46},{"x":472,"y":87,"fill":"rgb(185,29,139)","t":92,"n":52},{"x":493,"y":87,"fill":"rgb(154,33,151)","t":93,"n":27},{"x":514,"y":87,"fill":"rgb(154,33,151)","t":94,"n":27},{"x":535,"y":87,"fill":"rgb(159,32,149)","t":95,"n":30},{"x":52,"y":108,"fill":"rgb(154,33,151)","t":96,"n":27},{"x":73,"y":108,"fill":"rgb(130,37,160)","t":97,"n":14},{"x":94,"y":108,"fill":"rgb(113,39,167)","t":98,"n":8},{"x":115,"y":108,"fill":"rgb(127,37,161)","t":99,"n":13},{"x":136,"y":108,"fill":"rgb(94,38,149)","t":100,"n":3},{"x":157,"y":108,"fill":"rgb(132,36,159)","t":101,"n":15},{"x":178,"y":108,"fill":"rgb(125,38,162)","t":102,"n":12},{"x":199,"y":108,"fill":"rgb(130,37,160)","t":103,"n":14},{"x":220,"y":108,"fill":"rgb(187,31,138)","t":104,"n":55},{"x":241,"y":108,"fill":"rgb(166,31,147)","t":105,"n":35},{"x":262,"y":108,"fill":"rgb(80,36,130)","t":106,"n":1},{"x":283,"y":108,"fill":"#16181f"},{"x":304,"y":108,"fill":"rgb(80,36,130)","t":108,"n":1},{"x":325,"y":108,"fill":"rgb(88,37,141)","t":109,"n":2},{"x":346,"y":108,"fill":"rgb(116,39,165)","t":110,"n":9},{"x":367,"y":108,"fill":"rgb(153,33,152)","t":111,"n":26},{"x":388,"y":108,"fill":"rgb(138,35,157)","t":112,"n":18},{"x":409,"y":108,"fill":"rgb(88,37,141)","t":113,"n":2},{"x":430,"y":108,"fill":"rgb(88,37,141)","t":114,"n":2},{"x":451,"y":108,"fill":"rgb(122,38,163)","t":115,"n":11},{"x":472,"y":108,"fill":"rgb(142,35,156)","t":116,"n":20},{"x":493,"y":108,"fill":"rgb(125,38,162)","t":117,"n":12},{"x":514,"y":108,"fill":"rgb(88,37,141)","t":118,"n":2},{"x":535,"y":108,"fill":"rgb(106,40,164)","t":119,"n":6},{"x":52,"y":129,"fill":"rgb(116,39,165)","t":120,"n":9},{"x":73,"y":129,"fill":"rgb(116,39,165)","t":121,"n":9},{"x":94,"y":129,"fill":"rgb(113,39,167)","t":122,"n":8},{"x":115,"y":129,"fill":"rgb(193,36,134)","t":123,"n":63},{"x":136,"y":129,"fill":"rgb(122,38,163)","t":124,"n":11},{"x":157,"y":129,"fill":"rgb(99,39,154)","t":125,"n":4},{"x":178,"y":129,"fill":"rgb(94,38,149)","t":126,"n":3},{"x":199,"y":129,"fill":"rgb(106,40,164)","t":127,"n":6},{"x":220,"y":129,"fill":"rgb(80,36,130)","t":128,"n":1},{"x":241,"y":129,"fill":"rgb(122,38,163)","t":129,"n":11},{"x":262,"y":129,"fill":"#16181f"},{"x":283,"y":129,"fill":"rgb(80,36,130)","t":131,"n":1},{"x":304,"y":129,"fill":"rgb(99,39,154)","t":132,"n":4},{"x":325,"y":129,"fill":"rgb(109,40,168)","t":133,"n":7},{"x":346,"y":129,"fill":"rgb(106,40,164)","t":134,"n":6},{"x":367,"y":129,"fill":"rgb(103,39,160)","t":135,"n":5},{"x":388,"y":129,"fill":"rgb(136,36,158)","t":136,"n":17},{"x":409,"y":129,"fill":"rgb(88,37,141)","t":137,"n":2},{"x":430,"y":129,"fill":"rgb(99,39,154)","t":138,"n":4},{"x":451,"y":129,"fill":"rgb(80,36,130)","t":139,"n":1},{"x":472,"y":129,"fill":"#16181f"},{"x":493,"y":129,"fill":"#16181f"},{"x":514,"y":129,"fill":"#16181f"},{"x":535,"y":129,"fill":"#16181f"},{"x":52,"y":150,"fill":"rgb(99,39,154)","t":144,"n":4},{"x":73,"y":150,"fill":"rgb(88,37,141)","t":145,"n":2},{"x":94,"y":150,"fill":"rgb(80,36,130)","t":146,"n":1},{"x":115,"y":150,"fill":"rgb(88,37,141)","t":147,"n":2},{"x":136,"y":150,"fill":"rgb(80,36,130)","t":148,"n":1},{"x":157,"y":150,"fill":"rgb(80,36,130)","t":149,"n":1},{"x":178,"y":150,"fill":"rgb(88,37,141)","t":150,"n":2},{"x":199,"y":150,"fill":"rgb(80,36,130)","t":151,"n":1},{"x":220,"y":150,"fill":"rgb(99,39,154)","t":152,"n":4},{"x":241,"y":150,"fill":"rgb(80,36,130)","t":153,"n":1},{"x":262,"y":150,"fill":"rgb(88,37,141)","t":154,"n":2},{"x":283,"y":150,"fill":"rgb(80,36,130)","t":155,"n":1},{"x":304,"y":150,"fill":"rgb(88,37,141)","t":156,"n":2},{"x":325,"y":150,"fill":"rgb(80,36,130)","t":157,"n":1},{"x":346,"y":150,"fill":"rgb(103,39,160)","t":158,"n":5},{"x":367,"y":150,"fill":"rgb(106,40,164)","t":159,"n":6},{"x":388,"y":150,"fill":"rgb(99,39,154)","t":160,"n":4},{"x":409,"y":150,"fill":"rgb(94,38,149)","t":161,"n":3},{"x":430,"y":150,"fill":"rgb(88,37,141)","t":162,"n":2},{"x":451,"y":150,"fill":"rgb(80,36,130)","t":163,"n":1},{"x":472,"y":150,"fill":"rgb(80,36,130)","t":164,"n":1},{"x":493,"y":150,"fill":"rgb(88,37,141)","t":165,"n":2},{"x":514,"y":150,"fill":"rgb(80,36,130)","t":166,"n":1},{"x":535,"y":150,"fill":"rgb(103,39,160)","t":167,"n":5},{"x":52,"y":171,"fill":"rgb(88,37,141)","t":168,"n":2},{"x":73,"y":171,"fill":"rgb(99,39,154)","t":169,"n":4},{"x":94,"y":171,"fill":"rgb(88,37,141)","t":170,"n":2},{"x":115,"y":171,"fill":"rgb(94,38,149)","t":171,"n":3},{"x":136,"y":171,"fill":"rgb(109,40,168)","t":172,"n":7},{"x":157,"y":171,"fill":"#16181f"},{"x":178,"y":171,"fill":"rgb(88,37,141)","t":174,"n":2},{"x":199,"y":171,"fill":"rgb(88,37,141)","t":175,"n":2},{"x":220,"y":171,"fill":"rgb(119,38,164)","t":176,"n":10},{"x":241,"y":171,"fill":"rgb(134,36,159)","t":177,"n":16},{"x":262,"y":171,"fill":"rgb(138,35,157)","t":178,"n":18},{"x":283,"y":171,"fill":"rgb(116,39,165)","t":179,"n":9},{"x":304,"y":171,"fill":"rgb(94,38,149)","t":180,"n":3},{"x":325,"y":171,"fill":"rgb(125,38,162)","t":181,"n":12},{"x":346,"y":171,"fill":"rgb(237,77,103)","t":182,"n":157},{"x":367,"y":171,"fill":"rgb(134,36,159)","t":183,"n":16},{"x":388,"y":171,"fill":"rgb(94,38,149)","t":184,"n":3},{"x":409,"y":171,"fill":"rgb(173,30,144)","t":185,"n":41},{"x":430,"y":171,"fill":"rgb(187,31,138)","t":186,"n":55},{"x":451,"y":171,"fill":"rgb(186,30,139)","t":187,"n":53},{"x":472,"y":171,"fill":"rgb(162,32,148)","t":188,"n":32},{"x":493,"y":171,"fill":"rgb(179,29,142)","t":189,"n":46},{"x":514,"y":171,"fill":"rgb(178,29,142)","t":190,"n":45},{"x":535,"y":171,"fill":"rgb(185,29,139)","t":191,"n":52},{"x":52,"y":192,"fill":"rgb(159,32,149)","t":192,"n":30},{"x":73,"y":192,"fill":"rgb(149,34,153)","t":193,"n":24},{"x":94,"y":192,"fill":"rgb(173,30,144)","t":194,"n":41},{"x":115,"y":192,"fill":"rgb(171,30,145)","t":195,"n":39},{"x":136,"y":192,"fill":"rgb(154,33,151)","t":196,"n":27},{"x":157,"y":192,"fill":"rgb(148,34,154)","t":197,"n":23},{"x":178,"y":192,"fill":"rgb(80,36,130)","t":198,"n":1},{"x":199,"y":192,"fill":"rgb(88,37,141)","t":199,"n":2},{"x":220,"y":192,"fill":"rgb(88,37,141)","t":200,"n":2},{"x":241,"y":192,"fill":"rgb(88,37,141)","t":201,"n":2},{"x":262,"y":192,"fill":"rgb(103,39,160)","t":202,"n":5},{"x":283,"y":192,"fill":"rgb(88,37,141)","t":203,"n":2},{"x":304,"y":192,"fill":"rgb(80,36,130)","t":204,"n":1},{"x":325,"y":192,"fill":"rgb(159,32,149)","t":205,"n":30},{"x":346,"y":192,"fill":"rgb(173,30,144)","t":206,"n":41},{"x":367,"y":192,"fill":"rgb(99,39,154)","t":207,"n":4},{"x":388,"y":192,"fill":"rgb(154,33,151)","t":208,"n":27},{"x":409,"y":192,"fill":"rgb(140,35,156)","t":209,"n":19},{"x":430,"y":192,"fill":"rgb(88,37,141)","t":210,"n":2},{"x":451,"y":192,"fill":"rgb(88,37,141)","t":211,"n":2},{"x":472,"y":192,"fill":"#16181f"},{"x":493,"y":192,"fill":"rgb(109,40,168)","t":213,"n":7},{"x":514,"y":192,"fill":"rgb(94,38,149)","t":214,"n":3},{"x":535,"y":192,"fill":"rgb(109,40,168)","t":215,"n":7},{"x":52,"y":213,"fill":"rgb(88,37,141)","t":216,"n":2},{"x":73,"y":213,"fill":"rgb(130,37,160)","t":217,"n":14},{"x":94,"y":213,"fill":"rgb(125,38,162)","t":218,"n":12},{"x":115,"y":213,"fill":"#16181f"},{"x":136,"y":213,"fill":"rgb(119,38,164)","t":220,"n":10},{"x":157,"y":213,"fill":"rgb(80,36,130)","t":221,"n":1},{"x":178,"y":213,"fill":"rgb(122,38,163)","t":222,"n":11},{"x":199,"y":213,"fill":"rgb(125,38,162)","t":223,"n":12},{"x":220,"y":213,"fill":"rgb(130,37,160)","t":224,"n":14},{"x":241,"y":213,"fill":"rgb(109,40,168)","t":225,"n":7},{"x":262,"y":213,"fill":"rgb(119,38,164)","t":226,"n":10},{"x":283,"y":213,"fill":"rgb(106,40,164)","t":227,"n":6},{"x":304,"y":213,"fill":"rgb(119,38,164)","t":228,"n":10},{"x":325,"y":213,"fill":"rgb(80,36,130)","t":229,"n":1},{"x":346,"y":213,"fill":"rgb(94,38,149)","t":230,"n":3},{"x":367,"y":213,"fill":"#16181f"},{"x":388,"y":213,"fill":"#16181f"},{"x":409,"y":213,"fill":"rgb(109,40,168)","t":233,"n":7},{"x":430,"y":213,"fill":"rgb(99,39,154)","t":234,"n":4},{"x":451,"y":213,"fill":"#16181f"},{"x":472,"y":213,"fill":"#16181f"},{"x":493,"y":213,"fill":"rgb(80,36,130)","t":237,"n":1},{"x":514,"y":213,"fill":"rgb(80,36,130)","t":238,"n":1},{"x":535,"y":213,"fill":"rgb(80,36,130)","t":239,"n":1},{"x":52,"y":234,"fill":"rgb(80,36,130)","t":240,"n":1},{"x":73,"y":234,"fill":"#16181f"},{"x":94,"y":234,"fill":"#16181f"},{"x":115,"y":234,"fill":"#16181f"},{"x":136,"y":234,"fill":"#16181f"},{"x":157,"y":234,"fill":"#16181f"},{"x":178,"y":234,"fill":"#16181f"},{"x":199,"y":234,"fill":"#16181f"},{"x":220,"y":234,"fill":"#16181f"},{"x":241,"y":234,"fill":"#16181f"},{"x":262,"y":234,"fill":"#16181f"},{"x":283,"y":234,"fill":"#16181f"},{"x":304,"y":234,"fill":"#16181f"},{"x":325,"y":234,"fill":"#16181f"},{"x":346,"y":234,"fill":"#16181f"},{"x":367,"y":234,"fill":"#16181f"},{"x":388,"y":234,"fill":"#16181f"},{"x":409,"y":234,"fill":"#16181f"},{"x":430,"y":234,"fill":"#16181f"},{"x":451,"y":234,"fill":"#16181f"},{"x":472,"y":234,"fill":"#16181f"},{"x":493,"y":234,"fill":"#16181f"},{"x":514,"y":234,"fill":"#16181f"},{"x":535,"y":234,"fill":"#16181f"}];

const DATES = ['May 4','May 5','May 6','May 7','May 8','May 9','May 10','May 11','May 12','May 13','May 14'];

// Single hue navy intensity ramp: few commits = light, many commits = deep navy.
// Computed at render time from the commit count so the baked purple/red/yellow
// fills in CELLS are ignored. Empty cells (no n) fall back to the sunken surface.
function cellFill(n?: number): string {
  if (!n || n <= 0) return 'var(--surface-sunken)';
  // n ranges roughly 1..700, use a log scale to 0..1
  const t = Math.min(1, Math.log10(n + 1) / Math.log10(700));
  // GitHub-style green contribution ramp (light -> deep green)
  const stops = [[214,240,215],[155,233,168],[64,196,99],[48,161,78],[33,110,57]];
  const i = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1)));
  const f = t * (stops.length - 1) - i;
  const c = stops[i].map((a, k) => Math.round(a + (stops[i+1][k]-a)*f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const BunCommitsHeatmap: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cells = Array.from(root.querySelectorAll('rect[data-t]')) as SVGElement[];
    cells.sort((a, b) => +a.dataset.t! - +b.dataset.t!);
    for (const c of cells) {
      c.style.transition = 'fill-opacity 0.45s ease-out';
      c.setAttribute('fill-opacity', '0');
    }

    const counter = root.querySelector('.pc-count') as HTMLElement;
    if (!counter) return;

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5) {
          io.disconnect();
          const SWEEP = 4000;
          const last = +cells[cells.length - 1].dataset.t!;
          let cum = 0;
          const updates: { el: SVGElement; delay: number; cumVal: number }[] = [];
          for (const c of cells) {
            cum += +(c.dataset.n || 0);
            updates.push({ el: c, delay: (+c.dataset.t! / last) * SWEEP, cumVal: cum });
          }
          for (const u of updates) {
            setTimeout(() => {
              u.el.setAttribute('fill-opacity', '1');
              counter.textContent = u.cumVal.toLocaleString('en-US') + ' commits';
            }, u.delay);
          }
          return;
        }
      }
    }, { threshold: [0.1, 0.3, 0.5, 0.75] });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section id="NYyVvNQXXG" ref={rootRef} style={{ overflowAnchor: 'none', overflow: 'hidden', borderColor: 'var(--border)', borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }} className="not-prose -mx-4 my-12 sm:mx-0 sm:rounded-2xl sm:border lg:-mx-8 xl:-mx-24">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px 16px', padding: '20px 28px 4px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)' }}>11 days x 24 hours · PDT</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px 24px', padding: '8px 28px 8px' }}>
        <div className="pc-count" style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--text-strong)' }}>6,502 commits</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          <span>1</span>
          <span style={{ display: 'inline-block', height: 10, width: 96, borderRadius: 2, background: 'linear-gradient(to right, var(--surface-sunken), #9be9a8, #40c463, #30a14e, #216e39)' }}></span>
          <span>695 commits/hour</span>
        </div>
      </div>
      <div style={{ padding: '0 28px 20px' }}>
        <svg viewBox="0 0 556 257" style={{ width: '100%' }} role="img" aria-label="Commits per hour across the 11 days of the rewrite">
          <text x="52" y="15" fontSize="12" fill="var(--text-muted)">12am</text>
          <text x="178" y="15" fontSize="12" fill="var(--text-muted)">6am</text>
          <text x="304" y="15" fontSize="12" fill="var(--text-muted)">12pm</text>
          <text x="430" y="15" fontSize="12" fill="var(--text-muted)">6pm</text>
          {[0,1,2,3,4,5,6,7,8,9,10].map(row => (
            <g key={row}>
              <text x="44" y={38 + row * 21} fontSize="12" textAnchor="end" fill="var(--text-muted)">{DATES[row]}</text>
              {CELLS.filter(c => c.y === 24 + row * 21).map((cell, ci) => (
                <rect key={ci} x={cell.x} y={cell.y} width="19" height="19" rx="4"
                  fill={cellFill(('n' in cell ? cell.n : undefined) as number | undefined)}
                  stroke="var(--border)" strokeWidth="0.5"
                  {...('t' in cell ? { 'data-t': cell.t, 'data-n': cell.n } : {})}>
                  {'t' in cell ? (
                    <title>{(() => {
                      const c = cell as { x: number; y: number; fill: string; t: number; n: number };
                      const dayIdx = Math.floor(c.y / 21);
                      const hour = Math.floor(c.t % 24);
                      const date = DATES[dayIdx] || '';
                      const hourStr = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour-12}pm`;
                      const nextHour = hour === 23 ? '12am' : hourStr;
                      return `${date}, ${hourStr}–${nextHour} PDT — ${c.n} commits`;
                    })()}</title>
                  ) : null}
                </rect>
              ))}
            </g>
          ))}
        </svg>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', padding: '12px 28px', fontSize: 12, lineHeight: 1.625, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        Every commit on the port branch (merges excluded), bucketed by hour. Peak hour: 695 commits.
      </div>
    </section>
  );
};

export default BunCommitsHeatmap;
