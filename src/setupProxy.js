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

// Text-bearing source files we're willing to search/edit. Data-driven copy lives
// in .ts/.tsx/.json (blog.ts, projectsData.tsx, thingsData.ts, resume.json).
const TEXT_EXT = new Set(['.tsx', '.ts', '.jsx', '.js', '.json', '.md', '.mdx', '.html', '.txt']);
const SKIP_DIRS = new Set(['node_modules', '.git']);

// Recursively list every text-bearing file under a directory.
function walkSrc(dir, out) {
  let names;
  try {
    names = fs.readdirSync(dir);
  } catch (err) {
    return out;
  }
  for (const name of names) {
    if (name.startsWith('.') || SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    let stat;
    try {
      stat = fs.statSync(full);
    } catch (err) {
      continue;
    }
    if (stat.isDirectory()) walkSrc(full, out);
    else if (TEXT_EXT.has(path.extname(name))) out.push(full);
  }
  return out;
}

// All occurrences of `needle` in one file. Returns [{ abs, line, col }] (0-based line).
function occurrencesInFile(abs, needle) {
  let lines;
  try {
    lines = fs.readFileSync(abs, 'utf8').split('\n');
  } catch (err) {
    return [];
  }
  const { hits } = countOccurrences(lines, needle);
  return hits.map((h) => ({ abs, line: h.line, col: h.col }));
}

// Make `text` safe to drop into the source at a spot preceded by `charBefore`.
// A text node in the DOM maps to source that sits either right after a string
// delimiter (', ", `) or right after a tag/JSX `>`. We escape accordingly so a
// newline, quote, or angle bracket the user types can never break the file.
function escapeForContext(charBefore, text) {
  const clean = text.replace(/\r/g, '');
  if (charBefore === "'" || charBefore === '"' || charBefore === '`') {
    // Inside a string / template / JSX attribute literal delimited by charBefore.
    let out = clean.replace(/\\/g, '\\\\');
    if (charBefore === '`') {
      out = out.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      // Raw newlines are legal inside template literals, leave them.
    } else {
      out = out.split(charBefore).join('\\' + charBefore).replace(/\n/g, '\\n');
    }
    return out;
  }
  // JSX / HTML text content: escape markup-significant characters to entities,
  // which render as the literal character in both JSX and injected HTML.
  return clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

// Replace oldText at abs:line(0-based):col with newText. Re-reads so the write
// is applied to the current file bytes, and escapes newText for the surrounding
// source context (quoted string vs JSX/HTML text) so edits stay syntactically
// valid no matter what the user typed.
function applyReplacement(abs, line, col, oldText, newText) {
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  const target = lines[line];
  // Last non-space char before the match tells us the surrounding context.
  const before = lines.slice(0, line).join('\n') + '\n' + target.slice(0, col);
  const m = before.match(/(\S)[ \t]*$/);
  const charBefore = m ? m[1] : '';
  const safe = escapeForContext(charBefore, newText);
  lines[line] = target.slice(0, col) + safe + target.slice(col + oldText.length);
  fs.writeFileSync(abs, lines.join('\n'), 'utf8');
}

function replyOk(res, abs, line) {
  return sendJson(res, 200, { ok: true, file: path.relative(REPO_ROOT, abs), line: line + 1 });
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

  // `file` is React's _debugSource hint. It may be null (no hint) or point at the
  // component that *rendered* the text rather than the file the string lives in:
  // most blog/project/things/resume copy comes from data files (blog.ts,
  // projectsData.tsx, thingsData.ts, resume.json) and blog bodies are injected as
  // raw HTML, so React credits the component, not the data. We use the hint to
  // pin the exact spot when it works, and fall back to a whole-tree search when
  // it doesn't.
  const abs = resolveSourceFile(file);
  const reportedLine = Number.isInteger(line) ? line - 1 : null; // _debugSource is 1-based

  // 1) Hint file actually contains the text: pin it there.
  if (abs) {
    const occ = occurrencesInFile(abs, oldText);
    if (occ.length === 1) {
      applyReplacement(abs, occ[0].line, occ[0].col, oldText, newText);
      return replyOk(res, abs, occ[0].line);
    }
    if (occ.length > 1 && reportedLine != null) {
      // Multiple copies in the file; the reported line disambiguates.
      const near = occ.filter((o) => Math.abs(o.line - reportedLine) <= LINE_WINDOW);
      if (near.length === 1) {
        applyReplacement(near[0].abs, near[0].line, near[0].col, oldText, newText);
        return replyOk(res, near[0].abs, near[0].line);
      }
    }
    // Not (uniquely) here: fall through to the whole-tree search.
  }

  // 2) Whole src/ tree search: find where the string uniquely lives.
  const files = walkSrc(SRC_ROOT, []);
  const all = [];
  for (const f of files) {
    for (const o of occurrencesInFile(f, oldText)) all.push(o);
    if (all.length > 12) break; // enough to know it's ambiguous
  }

  if (all.length === 0) {
    return sendJson(res, 409, {
      ok: false,
      reason: 'not-found',
      error: 'could not find this exact text in any source file',
    });
  }
  if (all.length === 1) {
    applyReplacement(all[0].abs, all[0].line, all[0].col, oldText, newText);
    return replyOk(res, all[0].abs, all[0].line);
  }
  const whichFiles = [...new Set(all.map((o) => path.relative(REPO_ROOT, o.abs)))];
  return sendJson(res, 409, {
    ok: false,
    reason: 'ambiguous',
    count: all.length,
    files: whichFiles.slice(0, 5),
    error: 'this exact text appears in more than one place; edit it in the file',
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
