// Slovak dictionary. Typed as DeepPartial of the English Dict, so a namespace or
// individual key may be omitted and it falls back to English. Register each
// translated namespace here as batches land.
import { Dict } from '../en';
import { DeepPartial } from '../types';
import header from './header';
import common from './common';
import seo from './seo';

export const sk: DeepPartial<Dict> = {
  header,
  common,
  seo,
};
