import React, { useCallback, useRef, useState } from 'react';
import { LuArrowLeft, LuArrowRight, LuCheck, LuSend } from 'react-icons/lu';
import { useT } from '../../i18n';

// One-question-at-a-time contact wizard. Lives inside the navy gradient contact
// band. Reduces the friction of a long form by asking a single question per step.
//
// Delivery: if REACT_APP_WEB3FORMS_KEY is set, the answers POST to Web3Forms
// (free, no backend, lands in the inbox). Without a key it falls back to opening
// a prefilled email to EMAIL, so the wizard always works.
const EMAIL = 'eduardd.hv@gmail.com';
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOTAL = 3;

type Answers = { need: string; email: string; name: string };

const ContactWizard: React.FC = () => {
  const t = useT('contactBand').wizard;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ need: '', email: '', name: '' });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const focusInput = () => window.requestAnimationFrame(() => inputRef.current?.focus());

  const validate = useCallback(
    (s: number): string | null => {
      if (s === 0 && !answers.need.trim()) return t.required;
      if (s === 1 && !EMAIL_RE.test(answers.email.trim())) return t.invalidEmail;
      if (s === 2 && !answers.name.trim()) return t.required;
      return null;
    },
    [answers, t],
  );

  const goNext = () => {
    const err = validate(step);
    if (err) { setError(err); return; }
    setError(null);
    if (step < TOTAL - 1) { setStep(step + 1); focusInput(); }
    else void submit();
  };

  const goBack = () => {
    setError(null);
    if (step > 0) { setStep(step - 1); focusInput(); }
  };

  const submit = async () => {
    setStatus('sending');
    const capture = (window as unknown as { posthog?: { capture: (e: string, p?: object) => void } }).posthog;
    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New inquiry from ${answers.name}`,
            from_name: answers.name,
            email: answers.email,
            name: answers.name,
            message: answers.need,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        const subject = encodeURIComponent(`New inquiry from ${answers.name}`);
        const body = encodeURIComponent(
          `${answers.need}\n\nReply to: ${answers.email}\nFrom: ${answers.name}`,
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      }
      capture?.capture('contact_wizard_submit', { need: answers.need });
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); goNext(); }
  };

  if (status === 'done') {
    return (
      <div className="contactg__wizard contactg__wizard--done" role="status">
        <span className="contactg__wizard-check"><LuCheck aria-hidden="true" /></span>
        <p className="contactg__wizard-donetitle">{t.doneTitle}</p>
        <p className="contactg__wizard-donebody">{t.doneBody}</p>
      </div>
    );
  }

  const labels = [t.q1Label, t.q2Label, t.q3Label];

  return (
    <div className="contactg__wizard">
      <div className="contactg__wizard-head">
        <span className="contactg__wizard-count">{t.step} {step + 1} {t.of} {TOTAL}</span>
        <span className="contactg__wizard-dots" aria-hidden="true">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className={
                'contactg__wizard-dot' +
                (i === step ? ' is-active' : i < step ? ' is-done' : '')
              }
            />
          ))}
        </span>
      </div>

      <label className="contactg__wizard-q" htmlFor="cw-input">{labels[step]}</label>

      {step === 0 && (
        <>
          <input
            id="cw-input"
            ref={inputRef}
            className="contactg__wizard-input"
            type="text"
            value={answers.need}
            placeholder={t.q1Placeholder}
            onChange={(e) => set({ need: e.target.value })}
            onKeyDown={onKeyDown}
            autoComplete="off"
          />
          <div className="contactg__wizard-chips">
            {[t.chipAi, t.chipWeb, t.chipOther].map((chip) => (
              <button
                type="button"
                key={chip}
                className="contactg__wizard-chip"
                onClick={() => { set({ need: chip }); setError(null); }}
              >
                {chip}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <input
          id="cw-input"
          ref={inputRef}
          className="contactg__wizard-input"
          type="email"
          inputMode="email"
          value={answers.email}
          placeholder={t.q2Placeholder}
          onChange={(e) => set({ email: e.target.value })}
          onKeyDown={onKeyDown}
          autoComplete="email"
        />
      )}

      {step === 2 && (
        <input
          id="cw-input"
          ref={inputRef}
          className="contactg__wizard-input"
          type="text"
          value={answers.name}
          placeholder={t.q3Placeholder}
          onChange={(e) => set({ name: e.target.value })}
          onKeyDown={onKeyDown}
          autoComplete="name"
        />
      )}

      {error && <p className="contactg__wizard-error">{error}</p>}
      {status === 'failed' && (
        <p className="contactg__wizard-error">
          {t.errorPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      )}

      <div className="contactg__wizard-nav">
        {step > 0 ? (
          <button type="button" className="contactg__wizard-back" onClick={goBack}>
            <LuArrowLeft aria-hidden="true" /> {t.back}
          </button>
        ) : <span />}
        <button
          type="button"
          className="contactg__btn contactg__btn--primary contactg__wizard-advance"
          onClick={goNext}
          disabled={status === 'sending'}
        >
          {step < TOTAL - 1 ? (
            <>{t.next} <LuArrowRight className="contactg__btn-arrow" aria-hidden="true" /></>
          ) : (
            <>{status === 'sending' ? t.sending : t.send} <LuSend aria-hidden="true" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactWizard;
