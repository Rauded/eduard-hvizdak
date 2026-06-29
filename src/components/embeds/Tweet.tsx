import React, { useEffect, useRef, useState } from 'react';

// Reusable X / Twitter embed. Pass a full tweet URL or a status id.
// Loads the official widgets.js once and renders via twttr.widgets.createTweet.

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        createTweet: (
          id: string,
          el: HTMLElement,
          opts?: Record<string, unknown>
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

let widgetsPromise: Promise<void> | null = null;

function loadWidgets(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve();
  if (widgetsPromise) return widgetsPromise;
  widgetsPromise = new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.src = 'https://platform.twitter.com/widgets.js';
    s.async = true;
    s.charset = 'utf-8';
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
  return widgetsPromise;
}

function tweetId(urlOrId: string): string | null {
  if (/^\d+$/.test(urlOrId)) return urlOrId;
  const m = urlOrId.match(/status(?:es)?\/(\d+)/);
  return m ? m[1] : null;
}

interface TweetProps {
  url: string;
  theme?: 'light' | 'dark';
}

const Tweet: React.FC<TweetProps> = ({ url, theme = 'dark' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const id = tweetId(url);

  useEffect(() => {
    if (!id) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    setFailed(false);
    loadWidgets().then(async () => {
      if (cancelled || !ref.current || !window.twttr?.widgets) return;
      ref.current.innerHTML = '';
      const el = await window.twttr.widgets.createTweet(id, ref.current, {
        theme,
        align: 'center',
        dnt: true,
      });
      if (!cancelled && !el) setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [id, theme]);

  if (failed) {
    return (
      <a className="tweet-embed tweet-embed--fallback" href={url} target="_blank" rel="noopener noreferrer">
        View this post on X →
      </a>
    );
  }

  return <div className="tweet-embed" ref={ref} aria-label="Embedded post on X" />;
};

export default Tweet;
