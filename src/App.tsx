import React, { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { analyticsEnabled } from './analytics';
import { ThemeProvider } from './components/theme/ThemeContext';
import { LocaleProvider } from './i18n/LocaleContext';
import { applyCanvasPreset } from './config/canvas';
import { applyTypePreset } from './config/typeface';
import { getBackgroundPreset } from './config/background';
// @ts-ignore
import SiteEmbroidery from './components/background/SiteEmbroidery.tsx';
// Type scale (sizes/weights/tracking) loads before the family layer so the
// !important font-family assignments in typography.scss always win.
import './styles/typescale.scss';
import './styles/typography.scss';
import './styles/light.scss';


// Header, Footer and Home are on the homepage critical path, so they stay eager.
// @ts-ignore
import Header from './components/header/header.tsx';
// @ts-ignore
import Footer from './components/footer/footer.tsx';
// @ts-ignore
import Home from './components/home/Home.tsx';

// Every sub-page is route-split so it is not in the homepage bundle. This is the
// main lever against the single ~1MB main chunk the perf audit flagged.
// @ts-ignore
const BlogListingPage = lazy(() => import('./components/blog/BlogListingPage.tsx'));
// @ts-ignore
const BlogPostPage = lazy(() => import('./components/blog/BlogPostPage.tsx'));
// @ts-ignore
const NowPage = lazy(() => import('./components/now/NowPage.tsx'));
// @ts-ignore
const ServicesPage = lazy(() => import('./components/services/ServicesPage.tsx'));
// Unlisted proposal page: reachable only by direct link, noindex, not in nav or prerender.
// @ts-ignore
const AiEmployeePage = lazy(() => import('./components/services/AiEmployeePage.tsx'));
// @ts-ignore
const ThingsPage = lazy(() => import('./components/things/ThingsPage.tsx'));
// @ts-ignore
const SharePreviewPage = lazy(() => import('./components/share/SharePreviewPage.tsx'));
// @ts-ignore
const StyleguidePage = lazy(() => import('./components/styleguide/StyleguidePage.tsx'));
// @ts-ignore
const NotFound = lazy(() => import('./components/notfound/NotFound.tsx'));

// Dev-only inline text editor. The dynamic require + NODE_ENV guard keeps it out
// of the production bundle entirely (see src/devEditor/ and src/setupProxy.js).
const EditOverlay =
  process.env.NODE_ENV === 'development'
    ? (require('./devEditor/EditOverlay').default as React.FC)
    : null;

// The page color itself lives on <body> (see index.css), theme-driven via
// `data-theme` on <html>. The container stays transparent so the fixed
// SiteEmbroidery layer (z-index -1) can sit between the body color and the
// content.
const AppContainer = styled.div`
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

// SPA route changes need a manual PostHog $pageview (init disables auto-capture).
const PostHogPageview: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (analyticsEnabled) {
      posthog.capture('$pageview', { $current_url: window.location.href });
    }
  }, [location]);
  return null;
};

// Reset scroll to the top whenever the path changes, so opening a post (or any
// page) always starts at the top instead of inheriting the previous scroll.
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Honour in-page anchors (e.g. /#projects from a blog link): scroll to the
    // target — retrying briefly while the destination section mounts — instead
    // of jumping to the top.
    if (hash) {
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView();
        else if (tries++ < 25) setTimeout(tick, 40);
      };
      tick();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

// One shell for every route: the shared Header (with the single site-wide theme
// toggle) and Footer wrap the page. Theme is owned by ThemeProvider and read via
// context, so the header, footer, home, and sub-pages all stay in sync.
const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppContainer>
    <a className="skip-link" href="#main-content">Skip to content</a>
    {getBackgroundPreset() === 'embroidery' && <SiteEmbroidery />}
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
  </AppContainer>
);

const App: React.FC = () => {
  // Resolve the ?canvas= and ?type= previews (remembered presets) once on mount.
  useEffect(() => { applyCanvasPreset(); applyTypePreset(); }, []);
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LocaleProvider>
        <Router>
          <ScrollToTop />
          <PostHogPageview />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Shell><Home /></Shell>} />
              <Route path="/blog" element={<Shell><BlogListingPage /></Shell>} />
              <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
              <Route path="/now" element={<Shell><NowPage /></Shell>} />
              <Route path="/services" element={<Shell><ServicesPage /></Shell>} />
              <Route path="/services/ai-employee" element={<Shell><AiEmployeePage /></Shell>} />
              <Route path="/things" element={<Shell><ThingsPage /></Shell>} />
              <Route path="/share-preview" element={<Shell><SharePreviewPage /></Shell>} />
              <Route path="/styleguide" element={<Shell><StyleguidePage /></Shell>} />
              <Route path="*" element={<Shell><NotFound /></Shell>} />
            </Routes>
          </Suspense>
          {EditOverlay && <EditOverlay />}
        </Router>
        </LocaleProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
