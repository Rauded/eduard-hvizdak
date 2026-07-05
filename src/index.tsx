import React from 'react';
import ReactDOM from 'react-dom/client';
import posthog from 'posthog-js';
import '@fontsource-variable/archivo';
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

// The build prerenders each route to static HTML (scripts/prerender.mjs). If the
// root already has server/prerendered markup, HYDRATE it; otherwise mount fresh.
const rootEl = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
