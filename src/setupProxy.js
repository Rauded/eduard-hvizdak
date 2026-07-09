/**
 * Dev-only backend for the inline text editor (src/devEditor/*).
 *
 * react-scripts auto-loads this file in `npm start` ONLY. It never runs in the
 * production build, so none of this ships to Vercel. It exposes two endpoints on
 * the local webpack dev server:
 *
 *   POST /__edit     { file, line, oldText, newText }  -> replaces one string in a source file
 *   POST /__publish  {}                                -> git add/commit/push the pending edits
 *
 * The edit endpoint only ever replaces the exact string you clicked, scoped to a
 * few lines around where React said it lives, and refuses (409) rather than guess
 * when that string is ambiguous. Files are restricted to this repo's src/ tree.
 */
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const SRC_ROOT = path.join(REPO_ROOT, 'src');

// How many lines on either side of the reported line to search. React's
// _debugSource points at the opening JSX tag; the text can sit a line or two
// below it (multi-line elements), so we give it a small window.
const LINE_WINDOW = 4;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) reject(new Error('body too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

// CSRF guard. The dev server listens on localhost, but any site you visit while
// `npm start` is running could POST here cross-origin and (ab)use /__edit or
// /__publish. Browsers always attach an Origin (and usually Referer) header to
// cross-origin POSTs, so we require the request to come from this same dev
// server: a loopback host that matches host:port exactly. A missing header (no
// legit browser POST lacks one) or any other origin is rejected.
function isTrustedOrigin(req) {
  const host = req.headers.host; // e.g. localhost:3000
  const source = req.headers.origin || req.headers.referer;
  if (!host || !source) return false;
  let u;
  try {
    u = new URL(source);
  } catch (err) {
    return false;
  }
  const loopback = ['localhost', '127.0.0.1', '[::1]', '::1'];
  if (!loopback.includes(u.hostname)) return false;
  return u.host === host; // hostname:port must match the dev server exactly
}

// Resolve a source path from React's _debugSource.fileName (usually absolute)
// down to a real file inside src/. Rejects anything that escapes src/, including
// via a symlink under src/ that points outside it (realpath is re-checked).
function resolveSourceFile(file) {
  if (!file || typeof file !== 'string') return null;
  const abs = path.isAbsolute(file) ? path.resolve(file) : path.resolve(REPO_ROOT, file);
  if (abs !== SRC_ROOT && !abs.startsWith(SRC_ROOT + path.sep)) return null;
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return null;
  // Follow symlinks and re-check: the real target must still be inside src/, so
  // a symlink placed under src/ cannot redirect a write outside the tree.
  let real;
  let realSrc;
  try {
    real = fs.realpathSync(abs);
    realSrc = fs.realpathSync(SRC_ROOT);
  } catch (err) {
    return null;
  }
  if (real !== realSrc && !real.startsWith(realSrc + path.sep)) return null;
  return real;
}

// Count occurrences of a substring across a set of line strings.
function countOccurrences(lines, needle) {
  let total = 0;
  const hits = [];
  lines.forEach((text, i) => {
    let from = 0;
    while (true) {
      const idx = text.indexOf(needle, from);
      if (idx === -1) break;
      total += 1;
      hits.push({ line: i, col: idx });
      from = idx + needle.length;
    }
  });
  return { total, hits };
}

async function handleEdit(req, res) {
  if (!isTrustedOrigin(req)) {
    return sendJson(res, 403, { ok: false, error: 'blocked: cross-origin request' });
  }
  let body;
  try {
    body = await readJsonBody(req);
  } catch (err) {
    return sendJson(res, 400, { ok: false, error: 'invalid JSON body' });
  }

  const { file, line, oldText, newText } = body || {};
  if (typeof oldText !== 'string' || typeof newText !== 'string') {
    return sendJson(res, 400, { ok: false, error: 'oldText and newText are required strings' });
  }
  if (oldText === newText) {
    return sendJson(res, 200, { ok: true, unchanged: true });
  }
  if (!oldText.trim()) {
    return sendJson(res, 400, { ok: false, error: 'oldText is empty' });
  }

  const abs = resolveSourceFile(file);
  if (!abs) {
    return sendJson(res, 400, { ok: false, error: 'file is not inside src/ or does not exist' });
  }

  const source = fs.readFileSync(abs, 'utf8');
  const lines = source.split('\n');

  // Prefer a match inside the window React pointed us at; if the reported line
  // is missing/out of range, fall back to searching the whole file.
  const reported = Number.isInteger(line) ? line - 1 : -1; // _debugSource is 1-based
  let start = 0;
  let end = lines.length;
  if (reported >= 0) {
    start = Math.max(0, reported - LINE_WINDOW);
    end = Math.min(lines.length, reported + LINE_WINDOW + 1);
  }

  let window = lines.slice(start, end);
  let { total, hits } = countOccurrences(window, oldText);

  // Nothing in the window: widen to the whole file before giving up.
  if (total === 0 && (start > 0 || end < lines.length)) {
    start = 0;
    end = lines.length;
    window = lines;
    ({ total, hits } = countOccurrences(window, oldText));
  }

  if (total === 0) {
    return sendJson(res, 409, {
      ok: false,
      reason: 'not-found',
      error: 'could not find the original text in the source file',
    });
  }
  if (total > 1) {
    return sendJson(res, 409, {
      ok: false,
      reason: 'ambiguous',
      count: total,
      error: 'the original text appears multiple times near this spot; edit it in the file',
    });
  }

  // Exactly one occurrence: replace it in place.
  const hit = hits[0];
  const absLine = start + hit.line;
  const target = lines[absLine];
  lines[absLine] = target.slice(0, hit.col) + newText + target.slice(hit.col + oldText.length);

  fs.writeFileSync(abs, lines.join('\n'), 'utf8');
  return sendJson(res, 200, {
    ok: true,
    file: path.relative(REPO_ROOT, abs),
    line: absLine + 1,
  });
}

function handlePublish(req, res) {
  if (!isTrustedOrigin(req)) {
    return sendJson(res, 403, { ok: false, error: 'blocked: cross-origin request' });
  }
  const run = (args) =>
    new Promise((resolve, reject) => {
      execFile('git', args, { cwd: REPO_ROOT }, (err, stdout, stderr) => {
        if (err) reject(Object.assign(err, { stdout, stderr }));
        else resolve({ stdout, stderr });
      });
    });

  (async () => {
    // Only commit if there is something staged/unstaged to commit.
    const status = await run(['status', '--porcelain']);
    if (!status.stdout.trim()) {
      return sendJson(res, 200, { ok: true, nothing: true });
    }
    await run(['add', '-A']);
    await run([
      'commit',
      '-m',
      'content: inline text edits',
      '-m',
      'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>',
    ]);
    const pushed = await run(['push']);
    return sendJson(res, 200, { ok: true, output: pushed.stdout + pushed.stderr });
  })().catch((err) => {
    sendJson(res, 500, {
      ok: false,
      error: err.message,
      stderr: err.stderr || '',
    });
  });
}

module.exports = function (app) {
  app.post('/__edit', handleEdit);
  app.post('/__publish', handlePublish);
};
