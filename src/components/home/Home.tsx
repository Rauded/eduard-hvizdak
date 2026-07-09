import React from 'react';
import Seo from '../../seo/Seo';
import SectionMarker from '../common/SectionMarker';
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
      description="AI engineer and indie founder. I build production AI systems (RAG pipelines, multi-agent tooling) and run real SaaS products: InzerPro, NasadClaw, KouzelníkNaAkci."
      path="/"
    />
    <Hero />
    <SectionMarker index="01" label="About" />
    <About />
    <SectionMarker index="02" label="Experience" />
    <Resume />
    <SectionMarker index="03" label="Projects" />
    <Projects />
    <SectionMarker index="04" label="Contact" />
    <Contact />
  </>
);

export default Home;
