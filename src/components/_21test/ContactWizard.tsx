import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuArrowRight, LuCheck, LuSend } from 'react-icons/lu';
import { useT } from '../../i18n';

// One-question-at-a-time contact wizard. Sits directly on the navy gradient
// contact band (no inner panel) so it reads as a continuation of the card.
// Step 1 is a single easy choice that captures why the visitor is here
// (client work, recruitment, or something else); contact details come last.
//
// Delivery: answers POST to Web3Forms (free, no backend) and land in EMAIL's
// inbox. The access key is safe to ship client-side (it only ever delivers to
// the verified inbox). With no key the wizard fails softly to the direct-email
// line instead of opening the visitor's mail client.
const EMAIL = 'eduardd.hv@gmail.com';
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || '4bf607c2-fd73-49d8-a569-baf93abe5cdd';
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
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // What step 1 offers, and what each input step captures. Driving the render
  // from these keeps the two text steps from being copy-pasted.
  const choices = [t.optAutomate, t.optBuild, t.optRole, t.optOther];
  const questions = [t.q1Label, t.q2Label, t.q3Label];
  const inputSteps = [
    { field: 'email' as const, type: 'email', inputMode: 'email' as const, enterKeyHint: 'next' as const, autoComplete: 'email', placeholder: t.q2Placeholder },
    { field: 'name' as const, type: 'text', inputMode: undefined, enterKeyHint: 'send' as const, autoComplete: 'name', placeholder: t.q3Placeholder },
  ];

  // Move focus to the confirmation when the wizard is replaced by the done view.
  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  // Focus the step's control, but never on first mount (that would scroll the
  // page down to the band on load). Only called from user navigation.
  const focusStep = (s: number) =>
    window.requestAnimationFrame(() => {
      (s === 0 ? firstChoiceRef.current : inputRef.current)?.focus();
    });

  const validate = useCallback(
    (s: number): string | null => {
      if (s === 1 && !EMAIL_RE.test(answers.email.trim())) return t.invalidEmail;
      if (s === 2 && !answers.name.trim()) return t.required;
      return null;
    },
    [answers, t],
  );

  const goTo = (s: number) => {
    setError(null);
    if (status === 'failed') setStatus('idle');
    setStep(s);
    focusStep(s);
  };

  const pickNeed = (need: string) => { set({ need }); goTo(1); };

  const goNext = () => {
    const err = validate(step);
    if (err) { setError(err); return; }
    if (step < TOTAL - 1) goTo(step + 1);
    else void submit();
  };

  const goBack = () => { if (step > 0) goTo(step - 1); };

  const submit = async () => {
    // No delivery endpoint: fail softly to "email me directly" rather than
    // yanking open the visitor's mail client.
    if (!WEB3FORMS_KEY) { setStatus('failed'); return; }
    setStatus('sending');
    const capture = (window as unknown as { posthog?: { capture: (e: string, p?: object) => void } }).posthog;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry from ${answers.name} (${answers.need})`,
          from_name: answers.name,
          email: answers.email,
          name: answers.name,
          message: `Reason: ${answers.need}`,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      // Web3Forms can return 200 with success:false (bad key, spam block).
      if (!res.ok || !data.success) throw new Error('submit rejected');
      // Only the fixed choice label is captured, never free text.
      capture?.capture('contact_wizard_submit', { reason: answers.need });
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // isComposing guards IME users (a mid-composition Enter must not submit).
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); goNext(); }
  };

  if (status === 'done') {
    return (
      <div className="contactg__wizard contactg__wizard--done" role="status" tabIndex={-1} ref={doneRef}>
        <span className="contactg__wizard-check"><LuCheck aria-hidden="true" /></span>
        <p className="contactg__wizard-donetitle">{t.doneTitle}</p>
        <p className="contactg__wizard-donebody">{t.doneBody}</p>
      </div>
    );
  }

  const num = (n: number) => String(n).padStart(2, '0');
  const field = inputSteps[step - 1];

  return (
    <div className="contactg__wizard">
      <p className="contactg__wizard-count" aria-live="polite">
        {num(step + 1)} <span aria-hidden="true">/</span> {num(TOTAL)}
      </p>

      <div className="contactg__wizard-step" key={step}>
        <p className="contactg__wizard-q" id="cw-q">{questions[step]}</p>

        {step === 0 ? (
          <div className="contactg__wizard-choices" role="group" aria-labelledby="cw-q">
            {choices.map((choice, i) => (
              <button
                type="button"
                key={choice}
                ref={i === 0 ? firstChoiceRef : undefined}
                className={'contactg__wizard-choice' + (answers.need === choice ? ' is-selected' : '')}
                onClick={() => pickNeed(choice)}
              >
                {choice}
                <LuArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : (
          <input
            id="cw-input"
            ref={inputRef}
            className="contactg__wizard-input"
            type={field.type}
            inputMode={field.inputMode}
            enterKeyHint={field.enterKeyHint}
            value={answers[field.field]}
            placeholder={field.placeholder}
            aria-labelledby="cw-q"
            autoComplete={field.autoComplete}
            onChange={(e) => { set({ [field.field]: e.target.value } as Partial<Answers>); if (error) setError(null); }}
            onKeyDown={onKeyDown}
          />
        )}

        {(error || status === 'failed') && (
          <p className="contactg__wizard-error" role="alert">
            {error ?? (
              <>{t.errorPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a></>
            )}
          </p>
        )}

        {step > 0 && (
          <div className="contactg__wizard-nav">
            <button type="button" className="contactg__wizard-back" onClick={goBack}>
              <LuArrowLeft aria-hidden="true" /> {t.back}
            </button>
            <button
              type="button"
              className="contactg__btn contactg__btn--primary"
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
        )}
      </div>

      <div className="contactg__wizard-bar" aria-hidden="true">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <span key={i} className={'contactg__wizard-seg' + (i <= step ? ' is-on' : '')} />
        ))}
      </div>
    </div>
  );
};

export default ContactWizard;
