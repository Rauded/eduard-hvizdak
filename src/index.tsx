import React from 'react';
import ReactDOM from 'react-dom/client';
import posthog from 'posthog-js';
import './index.css';
// @ts-ignore
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { POSTHOG_KEY, POSTHOG_HOST, analyticsEnabled } from './analytics';

// Pageviews are captured manually on route change (see App.tsx).
if (analyticsEnabled) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    person_profiles: 'identified_only',
  });
}

// Sub-pages are React.lazy chunks (see App.tsx). When hydrating a prerendered
// route, the matching chunk must be loaded BEFORE hydrateRoot, otherwise the
// <Suspense fallback={null}> renders null against the baked HTML and React
// throws a hydration mismatch and tears out the prerendered content. Warm the
// chunk for the current path first (webpack de-dupes with App's own import()).
// NB: no .tsx extension so tsc is happy; webpack resolves these to the exact same
// modules (hence the same chunks) that App.tsx's lazy() imports use, so this only
// warms the cache, it does not create duplicate bundles.
function preloadRouteChunk(pathname: string): Promise<unknown> {
  if (pathname === '/blog') return import('./components/blog/BlogListingPage');
  if (pathname.startsWith('/blog/')) return import('./components/blog/BlogPostPage');
  if (pathname === '/now') return import('./components/now/NowPage');
  if (pathname === '/services') return import('./components/services/ServicesPage');
  if (pathname === '/services/ai-employee') return import('./components/services/AiEmployeePage');
  if (pathname === '/things') return import('./components/things/ThingsPage');
  if (pathname === '/share-preview') return import('./components/share/SharePreviewPage');
  if (pathname === '/styleguide') return import('./components/styleguide/StyleguidePage');
  if (pathname === '/') return Promise.resolve(); // Home is eager
  return import('./components/notfound/NotFound'); // catch-all
}

// The build prerenders each route to static HTML (scripts/prerender.mjs) as a DOM
// snapshot (outerHTML), not React SSR output, so it has no Suspense hydration
// markers. hydrateRoot therefore cannot cleanly hydrate the <Suspense> boundary
// that code-splitting needs: React logs #418/#423 and recovers by client-rendering
// the root. Content and SEO are unaffected (crawlers read the baked HTML; the DOM
// settles to identical markup). We still hydrate rather than createRoot so the
// prerendered paint is reused without a visible teardown. A fully clean hydrate
// would need true streaming SSR in prerender.mjs (tracked in AUDIT_TODO.md).
const rootEl = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (rootEl.hasChildNodes()) {
  // The case-study modals render through a portal onto <body>, so the prerender
  // snapshot bakes them OUTSIDE #root. React portals never hydrate, they append,
  // which would leave two copies (and duplicate element ids). Drop the baked
  // copies before hydrating so React re-creates a single fresh set.
  document.querySelectorAll('body > .case-modal').forEach((n) => n.remove());
  preloadRouteChunk(window.location.pathname).finally(() => {
    ReactDOM.hydrateRoot(rootEl, app);
  });
} else {
  ReactDOM.createRoot(rootEl).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
