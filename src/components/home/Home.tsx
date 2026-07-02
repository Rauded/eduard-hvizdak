import React from 'react';
import Seo from '../../seo/Seo';
// @ts-ignore
import Hero from '../hero/hero.tsx';
// @ts-ignore
import About from '../about/about.tsx';
// @ts-ignore
import Resume from '../resume/resume.tsx';
// @ts-ignore
import Projects from '../projects/projects.tsx';
// @ts-ignore
import Contact from '../contact/contact.tsx';

const Home: React.FC = () => (
  <>
    <Seo
      title="Eduard Hvizdak"
      description="AI engineer and indie founder. I build production AI systems — RAG pipelines, multi-agent tooling — and run real SaaS products (InzerPro, NasadClaw, KouzelníkNaAkci)."
      path="/"
    />
    <Hero />
    <About />
    <Resume />
    <Projects />
    <Contact />
  </>
);

export default Home;
