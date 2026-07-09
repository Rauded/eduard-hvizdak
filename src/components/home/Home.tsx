import React from 'react';
import Seo from '../../seo/Seo';
import SectionMarker from '../common/SectionMarker';
import TileWordmark from '../../effects/tile-field/TileField';
// @ts-ignore
import Hero from '../hero/hero.tsx';
// @ts-ignore
import About from '../about/about.tsx';
// @ts-ignore
import Resume from '../resume/resume.tsx';
// @ts-ignore
import Projects from '../projects/projects.tsx';
// TEST: 21st.dev component ports (delete this block + restore <Contact/> to revert)
import TechMarquee from '../_21test/TechMarquee';
import ContactGradient from '../_21test/ContactGradient';

const Home: React.FC = () => (
  <>
    <Seo
      title="Eduard Hvizdak"
      description="AI engineer and indie founder. I build production AI systems (RAG pipelines, multi-agent tooling) and run real SaaS products: InzerPro, NasadClaw, KouzelnikNaAkci."
      path="/"
    />
    <Hero />
    {/* TEST: 21st.dev tech marquee */}
    <TechMarquee />
    <SectionMarker index="01" label="About" />
    <About />
    <SectionMarker index="02" label="Experience" />
    <Resume />
    <SectionMarker index="03" label="Projects" />
    <Projects />
    <SectionMarker index="04" label="Contact" />
    {/* TEST: Contact combined with the animated gradient band */}
    <ContactGradient />
    <TileWordmark />
  </>
);

export default Home;
