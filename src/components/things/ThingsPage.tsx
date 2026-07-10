import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useLocale } from '../../i18n/LocaleContext';
import { useTheme } from '../theme/ThemeContext';
import { CHAPTERS, Chapter, Media, localizeChapter } from './thingsData';
import './things.scss';

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

const ChapterSection: React.FC<{ c: Chapter; index: number }> = ({ c: rawC, index }) => {
  const t = useT('things');
  const { locale } = useLocale();
  const c = localizeChapter(rawC, locale);
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
          {t.haveALook} <LuArrowUpRight aria-hidden="true" />
        </a>
      )}
    </section>
  );
};

const ThingsPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('things');

  return (
    <article className="things-page" data-theme={theme}>
      <Seo title={t.seoTitle} description={t.seoDescription} path="/things" />

      <header className="things-hero">
        <span className="things-hero__kicker">{t.updated}</span>
        <h1 className="things-hero__title">{t.heroTitle}</h1>
        <p className="things-hero__lead">{t.heroLead}</p>
      </header>

      <nav className="things-index" aria-label={t.chapters}>
        <span className="things-index__label">{t.chapters}</span>
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
