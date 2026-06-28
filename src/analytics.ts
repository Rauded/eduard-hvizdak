// PostHog config. The default key is the InzerPro project's *public* project
// key (phc_…, safe to ship in frontend) — so portfolio traffic currently lands
// in that same PostHog project. To split them later, set REACT_APP_POSTHOG_KEY
// (and optionally REACT_APP_POSTHOG_HOST) in Vercel and it overrides this.
export const POSTHOG_KEY =
  process.env.REACT_APP_POSTHOG_KEY || 'phc_T3kr4gpksr26D0m7RzECUTmXzHdlCWIbSUj5MklqR4S';
export const POSTHOG_HOST =
  process.env.REACT_APP_POSTHOG_HOST || 'https://eu.i.posthog.com';
export const analyticsEnabled = Boolean(POSTHOG_KEY);
