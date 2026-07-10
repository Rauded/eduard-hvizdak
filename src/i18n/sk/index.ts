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

export const sk: DeepPartial<Dict> = {
  header,
  common,
  seo,
  footer,
  contact,
  hero,
  home,
  about,
};
