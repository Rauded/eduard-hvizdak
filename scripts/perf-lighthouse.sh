#!/bin/bash
# Median-of-N Lighthouse (mobile, simulated throttling) against the prerendered
# build. Run it alone: anything else using the CPU skews LCP and TBT.
#   scripts/perf-lighthouse.sh [route] [runs]
set -euo pipefail
ROUTE="${1:-/}"; RUNS="${2:-5}"; PORT=4173
OUT="$(mktemp -d)"
node scripts/perf-measure.mjs --serve "$PORT" &
SERVER=$!
trap 'kill $SERVER 2>/dev/null' EXIT
sleep 1
for i in $(seq "$RUNS"); do
  CHROME_PATH="${PUPPETEER_EXECUTABLE_PATH:-}" npx --yes lighthouse "http://localhost:$PORT$ROUTE" \
    --only-categories=performance --output=json --output-path="$OUT/$i.json" \
    --quiet --chrome-flags="--headless=new --no-sandbox" >/dev/null 2>&1
done
node -e '
const fs=require("fs"),dir=process.argv[1];
const runs=fs.readdirSync(dir).map(f=>JSON.parse(fs.readFileSync(dir+"/"+f)));
const med=a=>a.sort((x,y)=>x-y)[Math.floor(a.length/2)];
const a=id=>Math.round(med(runs.map(r=>r.audits[id].numericValue))*1000)/1000;
console.log(JSON.stringify({route:process.argv[2],runs:runs.length,
  score:med(runs.map(r=>Math.round(r.categories.performance.score*100))),
  fcp:a("first-contentful-paint"),lcp:a("largest-contentful-paint"),
  tbt:a("total-blocking-time"),cls:a("cumulative-layout-shift"),si:a("speed-index"),
  scores:runs.map(r=>Math.round(r.categories.performance.score*100))}));
' "$OUT" "$ROUTE"
