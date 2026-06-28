// PostHog config. Default key = the "Eduard Hvizdak Personal / Portfolio"
// project's *public* project key (phc_…, safe to ship in frontend).
// Override with REACT_APP_POSTHOG_KEY (+ optional REACT_APP_POSTHOG_HOST) in Vercel.
export const POSTHOG_KEY =
  process.env.REACT_APP_POSTHOG_KEY || 'phc_oMcKBZbEtqgd2Xjn8wbvmyArGM8Cqj5GSDvY237j6BT8';
export const POSTHOG_HOST =
  process.env.REACT_APP_POSTHOG_HOST || 'https://eu.i.posthog.com';
export const analyticsEnabled = Boolean(POSTHOG_KEY);
