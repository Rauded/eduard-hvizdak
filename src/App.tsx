import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


// @ts-ignore
import Header from './components/header/header.tsx';
// @ts-ignore
import Hero from './components/hero/hero.tsx';
// @ts-ignore
import SocialLinks from './components/social_links/social_links.tsx';
// @ts-ignore
import Resume from './components/resume/resume.tsx';
// @ts-ignore
import Projects from './components/projects/projects.tsx';
// @ts-ignore
import About from './components/about/about.tsx';
// @ts-ignore
import Footer from './components/footer/footer.tsx';
// @ts-ignore
// import Techstack from './components/techstack/techstack.tsx';
// @ts-ignore
// import ContributionMap from './components/contribution_map/contribution_map.tsx';
// @ts-ignore
import PortfolioPage from './components/portfolio/PortfolioPage.tsx';

const AppContainer = styled.div`
  background: linear-gradient(135deg, #1e1e1e 0%, #2a1a3d 50%, #1e1e1e 100%);
  background-size: 200% 200%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

const MainContent = styled.div`
`;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AppContainer>
            <Header />
            <MainContent>
              <Hero />
              <About />
              <Resume />
              <Projects />
              <SocialLinks />
            </MainContent>
            <Footer />
          </AppContainer>
        } />
        <Route path="/portfolio" element={
          <AppContainer>
            <Header />
            <PortfolioPage />
            <Footer />
          </AppContainer>
        } />
      </Routes>
    </Router>
  );
}

export default App;
