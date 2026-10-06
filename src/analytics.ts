// PostHog config. Default key = the "Eduard Hvizdak Personal / Portfolio"
// project's *public* project key (phc_…, safe to ship in frontend).
// Override with REACT_APP_POSTHOG_KEY (+ optional REACT_APP_POSTHOG_HOST) in Vercel.
export const POSTHOG_KEY =
  process.env.REACT_APP_POSTHOG_KEY || 'phc_oMcKBZbEtqgd2Xjn8wbvmyArGM8Cqj5GSDvY237j6BT8';
export const POSTHOG_HOST =
  process.env.REACT_APP_POSTHOG_HOST || 'https://eu.i.posthog.com';
export const analyticsEnabled = Boolean(POSTHOG_KEY);

// posthog-js (~50KB brotli) is loaded on first user interaction, or after a
// 4s timer for visitors who only read. Captures made before it loads queue on
// the same promise, so no pageview is lost.
let ready: Promise<typeof import('posthog-js').default> | null = null;
const load = () =>
  (ready ??= import('posthog-js').then(({ default: posthog }) => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
      person_profiles: 'identified_only',
      // Marketing site does not use session replay; keeps the recorder out.
      disable_session_recording: true,
    });
    return posthog;
  }));

let open!: () => void;
const gate = new Promise<void>((r) => (open = r));

export function initAnalytics() {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  const evts = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
  const go = () => {
    evts.forEach((e) => window.removeEventListener(e, go));
    clearTimeout(t);
    open();
  };
  const t = window.setTimeout(go, 4000);
  evts.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
}

export function capturePageview() {
  if (analyticsEnabled) gate.then(load).then((ph) => ph.capture('$pageview', { $current_url: window.location.href }));
}
