// Side-effect import for pages that use the heavy namespaces (see en/heavy.ts).
// The sk and cs halves are loaded with the locale (see loadLocale).
import { enHeavy } from './en/heavy';
import { registerNamespaces } from './index';

registerNamespaces(enHeavy);
