import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { analyticsEnabled } from './analytics';
import { ThemeProvider } from './components/theme/ThemeContext';
import './styles/typography.scss';
import './styles/buttons.scss';
import './styles/light.scss';


// @ts-ignore
import Header from './components/header/header.tsx';
// @ts-ignore
import Footer from './components/footer/footer.tsx';
// @ts-ignore
import Home from './components/home/Home.tsx';
// @ts-ignore
import BlogListingPage from './components/blog/BlogListingPage.tsx';
// @ts-ignore
import BlogPostPage from './components/blog/BlogPostPage.tsx';
// @ts-ignore
import NowPage from './components/now/NowPage.tsx';
// @ts-ignore
import ServicesPage from './components/services/ServicesPage.tsx';
// @ts-ignore
import ThingsPage from './components/things/ThingsPage.tsx';
// @ts-ignore
import SharePreviewPage from './components/share/SharePreviewPage.tsx';

// Page background is theme-driven: the site-wide light/dark preference sets
// `data-theme` on <html> (see ThemeProvider), which flips `--page-bg`.
const AppContainer = styled.div`
  background: var(--page-bg);
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
    // target (retrying briefly while the destination section mounts) instead
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
    <Header />
    {children}
    <Footer />
  </AppContainer>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <PostHogPageview />
          <Routes>
            <Route path="/" element={<Shell><Home /></Shell>} />
            <Route path="/blog" element={<Shell><BlogListingPage /></Shell>} />
            <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
            <Route path="/now" element={<Shell><NowPage /></Shell>} />
            <Route path="/services" element={<Shell><ServicesPage /></Shell>} />
            <Route path="/things" element={<Shell><ThingsPage /></Shell>} />
            <Route path="/share-preview" element={<Shell><SharePreviewPage /></Shell>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
