import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { analyticsEnabled } from './analytics';


// @ts-ignore
import Header from './components/header/header.tsx';
// @ts-ignore
import Footer from './components/footer/footer.tsx';
// @ts-ignore
import Home from './components/home/Home.tsx';
// @ts-ignore
import PortfolioPage from './components/portfolio/PortfolioPage.tsx';
// @ts-ignore
import BlogListingPage from './components/blog/BlogListingPage.tsx';
// @ts-ignore
import BlogPostPage from './components/blog/BlogPostPage.tsx';
// @ts-ignore
import NowPage from './components/now/NowPage.tsx';
// @ts-ignore
import SharePreviewPage from './components/share/SharePreviewPage.tsx';
// @ts-ignore
import ElsewherePage from './components/elsewhere/ElsewherePage.tsx';

const AppContainer = styled.div`
  background: linear-gradient(135deg, #1e1e1e 0%, #2a1a3d 50%, #1e1e1e 100%);
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
      <Router>
        <PostHogPageview />
        <Routes>
          <Route path="/" element={<Shell><Home /></Shell>} />
          <Route path="/portfolio" element={<Shell><PortfolioPage /></Shell>} />
          <Route path="/blog" element={<Shell><BlogListingPage /></Shell>} />
          <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
          <Route path="/now" element={<Shell><NowPage /></Shell>} />
          <Route path="/share-preview" element={<Shell><SharePreviewPage /></Shell>} />
          <Route path="/elsewhere" element={<Shell><ElsewherePage /></Shell>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
