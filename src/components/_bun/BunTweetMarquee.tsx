import React from 'react';
import './bun-tweet-marquee.scss';

interface TweetCard {
  author: string;
  handle: string;
  text: string;
  date?: string;
}

interface Props {
  rows: TweetCard[][];
  speeds?: number[];  // seconds per full scroll, one per row
}

// Inspired by bun.com's infinite-scrolling tweet marquee. Multiple rows
// of cards scroll at different speeds creating a dynamic backdrop.
const BunTweetMarquee: React.FC<Props> = ({ rows, speeds }) => {
  return (
    <div className="bun-marquee">
      {rows.map((tweets, rowIdx) => (
        <div className="bun-marquee__row" key={rowIdx}>
          <div
            className="bun-marquee__track"
            style={{
              animationDuration: `${speeds?.[rowIdx] ?? 40 + rowIdx * 10}s`,
            }}
          >
            {[...tweets, ...tweets, ...tweets].map((t, i) => (
              <div className="bun-marquee__card" key={`${rowIdx}-${i}`}>
                <div className="bun-marquee__card-header">
                  <div className="bun-marquee__card-avatar">
                    {t.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="bun-marquee__card-meta">
                    <div className="bun-marquee__card-name">{t.author}</div>
                    <div className="bun-marquee__card-handle">{t.handle}</div>
                  </div>
                  {t.date && <div className="bun-marquee__card-date">{t.date}</div>}
                </div>
                <div className="bun-marquee__card-body">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BunTweetMarquee;
