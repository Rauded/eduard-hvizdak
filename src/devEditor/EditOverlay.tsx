/**
 * Inline text editor overlay. DEV ONLY (mounted behind a NODE_ENV check in App).
 *
 * Flip "Edit mode" on, click any text, and a small floating box lets you rewrite
 * just that run of text. Saving POSTs to /__edit (see src/setupProxy.js), which
 * writes the change straight into the source file; Fast Refresh then reloads it.
 *
 * We deliberately target a single DOM text node (via caretRangeFromPoint) so each
 * edit maps to exactly one string literal in the source, and we send the trimmed
 * text so surrounding JSX whitespace/indentation is preserved on write.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getSourceLoc } from './getSource';
import './EditOverlay.scss';

interface EditingState {
  node: Text;
  file: string;
  line: number;
  original: string; // trimmed text sent to the server as oldText
  rect: DOMRect;
}

interface Toast {
  kind: 'ok' | 'warn' | 'err';
  msg: string;
}

const STORAGE_KEY = 'devEditor.on';

function textNodeAtPoint(x: number, y: number): Text | null {
  // Safari/Chrome: caretRangeFromPoint. Firefox: caretPositionFromPoint.
  const anyDoc = document as unknown as {
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
  };
  if (anyDoc.caretRangeFromPoint) {
    const range = anyDoc.caretRangeFromPoint(x, y);
    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
      return range.startContainer as Text;
    }
  } else if (anyDoc.caretPositionFromPoint) {
    const pos = anyDoc.caretPositionFromPoint(x, y);
    if (pos && pos.offsetNode.nodeType === Node.TEXT_NODE) {
      return pos.offsetNode as Text;
    }
  }
  return null;
}

function insideOwnUi(node: Node | null): boolean {
  let el = node instanceof Element ? node : node?.parentElement || null;
  while (el) {
    if (el.hasAttribute && el.hasAttribute('data-dev-editor')) return true;
    el = el.parentElement;
  }
  return false;
}

const EditOverlay: React.FC = () => {
  const [on, setOn] = useState<boolean>(() => localStorage.getItem(STORAGE_KEY) === '1');
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      if (!next) {
        setHoverRect(null);
        setEditing(null);
      }
      return next;
    });
  }, []);

  const flash = useCallback((t: Toast) => {
    setToast(t);
    window.setTimeout(() => setToast((cur) => (cur === t ? null : cur)), 3200);
  }, []);

  // Hover highlight: outline the element whose text sits under the pointer.
  useEffect(() => {
    if (!on || editing) {
      setHoverRect(null);
      return;
    }
    const onMove = (e: MouseEvent) => {
      if (insideOwnUi(e.target as Node)) {
        setHoverRect(null);
        return;
      }
      const tn = textNodeAtPoint(e.clientX, e.clientY);
      const parent = tn?.parentElement;
      if (tn && parent && (tn.nodeValue || '').trim()) {
        setHoverRect(parent.getBoundingClientRect());
      } else {
        setHoverRect(null);
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, [on, editing]);

  // Click to start editing the text run under the pointer.
  useEffect(() => {
    if (!on) return;
    const onClick = (e: MouseEvent) => {
      if (insideOwnUi(e.target as Node)) return;
      const tn = textNodeAtPoint(e.clientX, e.clientY);
      const raw = tn?.nodeValue || '';
      if (!tn || !raw.trim()) return;

      const loc = getSourceLoc(tn);
      if (!loc) {
        flash({ kind: 'warn', msg: "Couldn't locate this text's source. Edit it in the file." });
        return;
      }
      // We're taking over this click.
      e.preventDefault();
      e.stopPropagation();

      const original = raw.trim();
      setEditing({
        node: tn,
        file: loc.fileName,
        line: loc.lineNumber,
        original,
        rect: (tn.parentElement || document.body).getBoundingClientRect(),
      });
      setValue(original);
      setHoverRect(null);
    };
    // Capture phase so we beat the app's own click handlers (links, buttons).
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [on, flash]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editing]);

  const cancel = useCallback(() => {
    setEditing(null);
    setValue('');
  }, []);

  const save = useCallback(async () => {
    if (!editing) return;
    const next = value.trim();
    if (next === editing.original) {
      cancel();
      return;
    }
    if (!next) {
      flash({ kind: 'warn', msg: 'Empty text is not saved. Use Cancel to keep the original.' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/__edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: editing.file,
          line: editing.line,
          oldText: editing.original,
          newText: next,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        editing.node.nodeValue = value; // optimistic; Fast Refresh will confirm
        flash({ kind: 'ok', msg: 'Saved to source.' });
        cancel();
      } else if (data.reason === 'ambiguous') {
        flash({ kind: 'warn', msg: `This text appears ${data.count}x nearby. Edit it in the file.` });
      } else if (data.reason === 'not-found') {
        flash({ kind: 'warn', msg: "Couldn't match the original in the file. Edit it manually." });
      } else {
        flash({ kind: 'err', msg: data.error || 'Save failed.' });
      }
    } catch (err) {
      flash({ kind: 'err', msg: 'Dev server unreachable. Is npm start running?' });
    } finally {
      setSaving(false);
    }
  }, [editing, value, cancel, flash]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      save();
    }
  };

  const publish = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch('/__publish', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        flash({ kind: 'ok', msg: data.nothing ? 'Nothing to publish.' : 'Published. Vercel is deploying.' });
      } else {
        flash({ kind: 'err', msg: data.error || 'Publish failed.' });
      }
    } catch (err) {
      flash({ kind: 'err', msg: 'Dev server unreachable.' });
    } finally {
      setSaving(false);
    }
  }, [flash]);

  const editorTop = editing ? Math.min(editing.rect.bottom + 8, window.innerHeight - 180) : 0;
  const editorLeft = editing ? Math.min(editing.rect.left, window.innerWidth - 380) : 0;

  return (
    <div data-dev-editor="">
      {on && hoverRect && (
        <div
          className="dev-editor__hover"
          style={{
            top: hoverRect.top - 2,
            left: hoverRect.left - 2,
            width: hoverRect.width + 4,
            height: hoverRect.height + 4,
          }}
        />
      )}

      {editing && (
        <div className="dev-editor__panel" style={{ top: editorTop, left: Math.max(8, editorLeft) }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={Math.min(8, Math.max(2, value.split('\n').length))}
          />
          <div className="dev-editor__panel-row">
            <span className="dev-editor__hint">Cmd+Enter to save, Esc to cancel</span>
            <div className="dev-editor__panel-actions">
              <button type="button" onClick={cancel} disabled={saving}>
                Cancel
              </button>
              <button type="button" className="dev-editor__save" onClick={save} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dev-editor__bar">
        {on && (
          <button type="button" className="dev-editor__publish" onClick={publish} disabled={saving}>
            Publish
          </button>
        )}
        <button
          type="button"
          className={`dev-editor__toggle${on ? ' is-on' : ''}`}
          onClick={toggle}
        >
          {on ? 'Edit mode: ON' : 'Edit text'}
        </button>
      </div>

      {toast && <div className={`dev-editor__toast dev-editor__toast--${toast.kind}`}>{toast.msg}</div>}
    </div>
  );
};

export default EditOverlay;
