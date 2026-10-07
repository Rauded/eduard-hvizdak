import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// @ts-ignore
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { initAnalytics } from './analytics';
import { stripLocale, getLocaleFromPath } from './config/locale';
import { loadLocale } from './i18n';
import { SHOW_CZS_CASE_STUDY } from './config/czsCaseStudy';

// Pageviews are captured manually on route change (see App.tsx).
initAnalytics();

// Sub-pages are React.lazy chunks (see App.tsx). When hydrating a prerendered
// route, load the matching chunk BEFORE hydrateRoot so the page hydrates in the
// first pass; otherwise the baked markup sits inert until the chunk arrives.
// Warm the chunk for the current path first (webpack de-dupes with App's own
// import()).
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
  if (SHOW_CZS_CASE_STUDY && pathname === '/projects/czs-muni-chatbot') return import('./components/projects/CzsChatbotPage');
  if (pathname === '/projects/inzerpro') return import('./components/projects/InzerproCaseStudyPage');
  if (pathname === '/references') return import('./components/references/ReferencesPage');
  if (pathname === '/share-preview') return import('./components/share/SharePreviewPage');
  if (pathname === '/styleguide') return import('./components/styleguide/StyleguidePage');
  if (pathname === '/') return import('./components/home/Home');
  return import('./components/notfound/NotFound'); // catch-all
}

const rootEl = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// scripts/prerender.mjs bakes the string this returns into each route's HTML,
// so what hydrateRoot meets is React's own first render (Suspense markers and
// text separators included), not a snapshot of the DOM after effects ran. The
// server renderer is its own chunk and no visitor ever fetches it.
(window as any).__renderStatic = () =>
  import('react-dom/server').then(({ renderToString }) => renderToString(app));

if (rootEl.hasChildNodes()) {
  // The case-study modals render through a portal onto <body>, so the prerender
  // snapshot bakes them OUTSIDE #root. React portals never hydrate, they append,
  // which would leave two copies (and duplicate element ids). Drop the baked
  // copies before hydrating so React re-creates a single fresh set.
  document.querySelectorAll('body > .case-modal').forEach((n) => n.remove());
  // The prerender parks below-fold video posters in data-poster, and hydration
  // does not patch attributes, so put them back by hand.
  document.querySelectorAll<HTMLVideoElement>('video[data-poster]').forEach((v) => {
    v.poster = v.dataset.poster as string;
  });
  // Strip the /sk or /cs prefix so localized routes warm the right chunk (a
  // /sk/blog load must preload the blog chunk, not fall through to NotFound).
  Promise.all([
    preloadRouteChunk(stripLocale(window.location.pathname)).catch(() => {}),
    loadLocale(getLocaleFromPath(window.location.pathname)),
  ]).finally(() => {
    ReactDOM.hydrateRoot(rootEl, app);
  });
} else {
  ReactDOM.createRoot(rootEl).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
