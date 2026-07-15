import React, { createContext, useContext, useEffect, useState } from 'react';
import { bind, play, setEnabled } from 'cuelume';

// Opt-in interface sounds via cuelume. Off by default for every visitor; the
// header toggle is the only way to turn them on, and the choice persists in
// localStorage. cuelume ships ENABLED and never touches storage, so we push our
// own state onto it before binding any interactions. Prerender runs in a real
// Chromium (Puppeteer), so window exists there, but Web Audio cannot play
// without a user gesture, which keeps init safe and silent.
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
    setEnabled(soundOn);
    bind();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    // Apply synchronously inside the click so the enabling gesture itself
    // unlocks Web Audio and the confirmation chime plays right away.
    setEnabled(next);
    if (next) play('chime');
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
