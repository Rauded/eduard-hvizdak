import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// True while React renders the markup the build bakes into each page: the
// string render in scripts/prerender.mjs and the hydration pass that adopts it.
// False on every later render. Lets a component bake its settled look (a
// revealed section, a finished count-up, the default preference) and still
// match on hydration.
export const useHydrating = (): boolean =>
  useSyncExternalStore(subscribe, () => false, () => true);
