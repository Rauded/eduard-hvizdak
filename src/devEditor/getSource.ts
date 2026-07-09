/**
 * Maps a DOM node back to the source file + line that rendered it, using the
 * debug info React attaches to fibers in development builds. Dev-only.
 *
 * CRA's babel-preset-react-app injects `__source` in development, which React
 * exposes on each fiber as `_debugSource = { fileName, lineNumber, columnNumber }`.
 * We find the fiber for a DOM node via the `__reactFiber$<id>` property React
 * stashes on the element, then climb until we find one carrying `_debugSource`.
 */

export interface SourceLoc {
  fileName: string;
  lineNumber: number;
}

interface Fiber {
  _debugSource?: { fileName: string; lineNumber: number; columnNumber?: number };
  _debugOwner?: Fiber | null;
  return?: Fiber | null;
}

function getFiber(node: Node): Fiber | null {
  const key = Object.keys(node).find(
    (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
  );
  // @ts-expect-error indexing by the discovered internal key
  return key ? (node[key] as Fiber) : null;
}

/**
 * Walk up the fiber tree (and its debug owners) looking for the nearest source
 * location. Returns null when React did not attach debug info (e.g. production).
 */
export function getSourceLoc(node: Node | null): SourceLoc | null {
  if (!node) return null;
  const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element);
  if (!el) return null;

  let fiber = getFiber(el);
  let guard = 0;
  while (fiber && guard < 50) {
    const src = fiber._debugSource;
    if (src && src.fileName) {
      return { fileName: src.fileName, lineNumber: src.lineNumber };
    }
    fiber = fiber._debugOwner || fiber.return || null;
    guard += 1;
  }
  return null;
}

/** True when React is attaching source info, i.e. this is a dev build. */
export function sourceMappingAvailable(): boolean {
  return getSourceLoc(document.body) !== null || process.env.NODE_ENV === 'development';
}
