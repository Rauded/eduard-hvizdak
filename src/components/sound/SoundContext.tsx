import React, { createContext, useContext, useEffect, useState } from 'react';

// Opt-in interface sounds via cuelume. Off by default for every visitor; the
// header toggle is the only way to turn them on, and the choice persists in
// localStorage. cuelume ships ENABLED and never touches storage, so we push our
// own state onto it before binding any interactions. Prerender runs in a real
// Chromium (Puppeteer), so window exists there, but Web Audio cannot play
// without a user gesture, which keeps init safe and silent.
// cuelume is fetched on the first pointer or key event (before any click can
// reach the toggle), or straight away when the saved preference is on, so it
// stays out of the entry bundle. Until it loads there is nothing to play.
type Cue = typeof import('cuelume');
let cue: Cue | null = null;
let cuePromise: Promise<Cue> | null = null;
let bound = false;
const loadCue = (): Promise<Cue> =>
  (cuePromise ??= import('cuelume').then((m) => {
    cue = m;
    return m;
  }));

const SOUND_KEY = 'site-sound'; // 'on' | 'off'; a missing key means off.

type SoundContextValue = {
  soundOn: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextValue>({
  soundOn: false,
  toggleSound: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(SOUND_KEY) === 'on';
  });

  // Run once: force our saved state onto cuelume (which defaults to enabled)
  // before delegating any data-cuelume-* interactions. bind() with no argument
  // delegates on document, so React portals (the project modal) and lazily
  // mounted routes are covered without rebinding on navigation.
  useEffect(() => {
    const events = ['pointerdown', 'keydown'];
    const warm = () => {
      events.forEach((e) => window.removeEventListener(e, warm, true));
      loadCue().then((m) => {
        m.setEnabled(window.localStorage.getItem(SOUND_KEY) === 'on');
        if (!bound) { bound = true; m.bind(); }
      });
    };
    events.forEach((e) => window.addEventListener(e, warm, { capture: true, passive: true }));
    if (soundOn) warm();
    return () => events.forEach((e) => window.removeEventListener(e, warm, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    // Apply synchronously inside the click so the enabling gesture itself
    // unlocks Web Audio and the confirmation chime plays right away.
    const apply = (m: Cue) => {
      m.setEnabled(next);
      if (!bound) { bound = true; m.bind(); }
      if (next) m.play('chime');
    };
    if (cue) apply(cue);
    else loadCue().then(apply);
    try {
      window.localStorage.setItem(SOUND_KEY, next ? 'on' : 'off');
    } catch {
      /* private mode: preference just will not persist */
    }
    setSoundOn(next);
  };

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextValue => useContext(SoundContext);
