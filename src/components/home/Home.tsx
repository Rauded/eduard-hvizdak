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
import { useT } from '../../i18n';

const Home: React.FC = () => {
  const t = useT('home');
  const seo = useT('seo');
  return (
  <>
    <Seo
      title="Eduard Hvizdak"
      description={seo.homeDescription}
      path="/"
    />
    <Hero />
    {/* TEST: 21st.dev tech marquee */}
    <TechMarquee />
    <SectionMarker index="01" label={t.sections.about} />
    <About />
    <SectionMarker index="02" label={t.sections.experience} />
    <Resume />
    <SectionMarker index="03" label={t.sections.projects} />
    <Projects />
    <SectionMarker index="04" label={t.sections.contact} />
    {/* TEST: Contact combined with the animated gradient band */}
    <ContactGradient />
    <TileWordmark />
  </>
  );
};

export default Home;
