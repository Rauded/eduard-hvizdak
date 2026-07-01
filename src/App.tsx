import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { analyticsEnabled } from './analytics';
import { useSiteTheme, SiteTheme } from './components/theme/useSiteTheme';
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
import ThingsPage from './components/things/ThingsPage.tsx';
// @ts-ignore
import SharePreviewPage from './components/share/SharePreviewPage.tsx';

// Page background is theme-driven: on the home route the light/dark preference
// sets `data-theme` on <html>, which flips `--page-bg`. Everywhere else the
// variable is unset, so it falls back to the original dark gradient — sub-pages
// keep their own theming untouched.
const AppContainer = styled.div`
  background: var(--page-bg, linear-gradient(135deg, #1e1e1e 0%, #2a1a3d 50%, #1e1e1e 100%));
  background-size: 200% 200%;
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

type ShellProps = {
  children: React.ReactNode;
  theme?: SiteTheme;
  onToggleTheme?: () => void;
  showThemeToggle?: boolean;
};

const Shell: React.FC<ShellProps> = ({ children, theme, onToggleTheme, showThemeToggle }) => (
  <AppContainer>
    <Header theme={theme} onToggleTheme={onToggleTheme} showThemeToggle={showThemeToggle} />
    {children}
    <Footer />
  </AppContainer>
);

// Owns the site-wide light/dark preference and applies it as `data-theme` on
// <html> — but only on the home route, so the CSS-variable light theme and the
// `[data-theme='light']` overrides never leak onto sub-pages (blog/now/things),
// which run their own independent theme systems.
const ThemedApp: React.FC = () => {
  const [theme, toggleTheme] = useSiteTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const root = document.documentElement;
    if (isHome) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    return () => root.removeAttribute('data-theme');
  }, [isHome, theme]);

  const homeShellProps = { theme, onToggleTheme: toggleTheme, showThemeToggle: true };

  return (
    <>
      <ScrollToTop />
      <PostHogPageview />
      <Routes>
        <Route path="/" element={<Shell {...homeShellProps}><Home /></Shell>} />
        <Route path="/blog" element={<Shell><BlogListingPage /></Shell>} />
        <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
        <Route path="/now" element={<Shell><NowPage /></Shell>} />
        <Route path="/things" element={<Shell><ThingsPage /></Shell>} />
        <Route path="/share-preview" element={<Shell><SharePreviewPage /></Shell>} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ThemedApp />
      </Router>
    </HelmetProvider>
  );
};

export default App;
