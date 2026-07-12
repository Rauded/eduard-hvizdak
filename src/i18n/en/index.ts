// English dictionary: the canonical source of truth. Its shape defines the type
// that Slovak and Czech are checked against (they are DeepPartial of this), and
// every missing sk/cs key falls back to the English value here.
//
// As each translation batch lands, add its namespace file above and register it
// in this object. Keep the keys identical across en/sk/cs.
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
import czsChatbot from './czsChatbot';

export const en = {
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
  czsChatbot,
};

export type Dict = typeof en;
