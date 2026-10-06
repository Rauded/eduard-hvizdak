// Side-effect import for pages that use the heavy namespaces (see en/heavy.ts).
import { enHeavy } from './en/heavy';
import { skHeavy } from './sk/heavy';
import { csHeavy } from './cs/heavy';
import { registerNamespaces } from './index';

registerNamespaces(enHeavy, { sk: skHeavy, cs: csHeavy });
