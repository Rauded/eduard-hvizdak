import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useTheme } from '../theme/ThemeContext';
import { CHAPTERS, Chapter, Media } from './thingsData';
import './things.scss';

// A living page: I add to it whenever something earns a permanent spot in my
// setup. Bump this when you meaningfully update the list.
const LAST_UPDATED = 'July 2026';

const Figure: React.FC<{ m: Media }> = ({ m }) => (
  <figure className="chapter-figure">
    {m.type === 'video' ? (
      <video controls playsInline preload="metadata" poster={m.poster}>
        <source src={m.src} />
      </video>
    ) : (
      <img src={m.src} alt={m.caption || ''} loading="lazy" />
    )}
    {m.caption && <figcaption>{m.caption}</figcaption>}
  </figure>
);

const ChapterSection: React.FC<{ c: Chapter; index: number }> = ({ c, index }) => {
  const style = { '--accent': c.accent } as React.CSSProperties;
  return (
    <section className="chapter" id={c.id} style={style}>
      <div className="chapter__head">
        <span className="chapter__num">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <span className="chapter__cat">{c.category}</span>
          <h2 className="chapter__title">{c.title}</h2>
          <p className="chapter__lead">{c.lead}</p>
        </div>
      </div>

      {c.media.length > 0 && <Figure m={c.media[0]} />}

      <div className="chapter__body">
        {c.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {c.media.length > 1 && (
        <div className="chapter__gallery">
          {c.media.slice(1).map((m, i) => <Figure m={m} key={i} />)}
        </div>
      )}

      {c.link && (
        <a className="chapter__link" href={c.link} target="_blank" rel="noopener noreferrer">
          Have a look <LuArrowUpRight aria-hidden="true" />
        </a>
      )}
    </section>
  );
};

const ThingsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <article className="things-page" data-theme={theme}>
      <Seo
        title="Tech I love"
        description="A living, chaptered write-up of the tech Eduard Hvizdak loves and uses every day: MacBook Pro M4 Pro, Even Realities G1 AR glasses, Kindle, e-ink readers, AirPods Pro 3, Pavlok and more."
        path="/things"
      />

      <header className="things-hero">
        <span className="things-hero__kicker">Updated {LAST_UPDATED}</span>
        <h1 className="things-hero__title">Tech I love</h1>
        <p className="things-hero__lead">
          The gear I actually use every day, one piece at a time. What it is like to live with, what
          I like and what I do not, and why it earns a permanent spot in my setup. With photos and
          clips to go with it.
        </p>
      </header>

      <nav className="things-index" aria-label="Chapters">
        <span className="things-index__label">Chapters</span>
        <ol className="things-index__list">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`}>
                <span className="things-index__num">{String(i + 1).padStart(2, '0')}</span>
                {c.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="chapters">
        {CHAPTERS.map((c, i) => <ChapterSection c={c} index={i} key={c.id} />)}
      </div>
    </article>
  );
};

export default ThingsPage;
