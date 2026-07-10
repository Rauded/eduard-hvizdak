// English dictionary: the canonical source of truth. Its shape defines the type
// that Slovak and Czech are checked against (they are DeepPartial of this), and
// every missing sk/cs key falls back to the English value here.
//
// As each translation batch lands, add its namespace file above and register it
// in this object. Keep the keys identical across en/sk/cs.
import header from './header';
import common from './common';
import seo from './seo';

export const en = {
  header,
  common,
  seo,
};

export type Dict = typeof en;
