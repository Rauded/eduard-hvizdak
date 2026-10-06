// Namespaces only used by lazy route chunks. Kept out of ./index so they stay
// out of the entry bundle; ../heavy.ts registers them when a page imports it.
import aiEmployee from './aiEmployee';
import services from './services';
import czsChatbot from './czsChatbot';
import inzerproCaseStudy from './inzerproCaseStudy';

export const enHeavy = { aiEmployee, services, czsChatbot, inzerproCaseStudy };
