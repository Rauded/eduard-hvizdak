// Slovak dictionary. Typed as DeepPartial of the English Dict, so a namespace or
// individual key may be omitted and it falls back to English. Register each
// translated namespace here as batches land.
import { Dict } from '../en';
import { DeepPartial } from '../types';
import header from './header';
import common from './common';
import seo from './seo';
import footer from './footer';
import contact from './contact';
import hero from './hero';
import home from './home';
import about from './about';
import resume from './resume';
import now from './now';
import things from './things';
import aiEmployee from './aiEmployee';
import services from './services';
import showcase from './showcase';
import agentPipeline from './agentPipeline';
import contactBand from './contactBand';
import orbitStack from './orbitStack';
import projects from './projects';
import blog from './blog';
import notfound from './notfound';

export const sk: DeepPartial<Dict> = {
  header,
  common,
  seo,
  footer,
  contact,
  hero,
  home,
  about,
  resume,
  now,
  things,
  aiEmployee,
  services,
  showcase,
  agentPipeline,
  contactBand,
  orbitStack,
  projects,
  blog,
  notfound,
};
