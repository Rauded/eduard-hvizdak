import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useTheme } from '../theme/ThemeContext';
import { THINGS, Thing } from './thingsData';
import './things.scss';

// A living page: I add to it whenever something earns a permanent spot in my
// setup. Bump this when you meaningfully update the list.
const LAST_UPDATED = 'July 2026';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Group the flat list into category sections, preserving the order each
// category first appears in the data.
function byCategory(items: Thing[]): { category: string; items: Thing[] }[] {
  const order: string[] = [];
  const map = new Map<string, Thing[]>();
  for (const t of items) {
    if (!map.has(t.category)) { map.set(t.category, []); order.push(t.category); }
    map.get(t.category)!.push(t);
  }
  return order.map((category) => ({ category, items: map.get(category)! }));
}

const ThingCard: React.FC<{ t: Thing }> = ({ t }) => {
  const inner = (
    <>
      <span
        className="things-card__visual"
        style={{ '--thing-accent': t.accent } as React.CSSProperties}
      >
        {t.image ? (
          <img src={t.image} alt="" loading="lazy" />
        ) : (
          <span className="things-card__emoji" aria-hidden="true">{t.emoji}</span>
        )}
      </span>

      <span className="things-card__body">
        <span className="things-card__head">
          <span className="things-card__name">{t.name}</span>
          <span
            className="things-card__cat"
            style={{ '--thing-accent': t.accent } as React.CSSProperties}
          >
            {t.category}
          </span>
        </span>
        <span className="things-card__blurb">{t.blurb}</span>
        <span className="things-card__why">{t.why}</span>
        {t.link && (
          <span className="things-card__link">
            Visit <LuArrowUpRight aria-hidden="true" />
          </span>
        )}
      </span>
    </>
  );

  return t.link ? (
    <a
      className="things-card"
      href={t.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--thing-accent': t.accent } as React.CSSProperties}
    >
      {inner}
    </a>
  ) : (
    <div
      className="things-card things-card--static"
      style={{ '--thing-accent': t.accent } as React.CSSProperties}
    >
      {inner}
    </div>
  );
};

const ThingsPage: React.FC = () => {
  const { theme } = useTheme();
  const groups = byCategory(THINGS);

  return (
    <div className="things-page" data-theme={theme}>
      <Seo
        title="Tech I love"
        description="A living list of the tech Eduard Hvizdak loves and uses every day: MacBook Pro M4 Pro, AirPods Pro 3, e-ink readers, AR glasses, Pavlok and more. Updated as the setup evolves."
        path="/things"
      />

      <header className="things-hero">
        <span className="things-hero__kicker">Living list · updated {LAST_UPDATED}</span>
        <h1 className="things-hero__title">Tech I love</h1>
        <p className="things-hero__lead">
          The gear I genuinely love and use every day, the pieces that earn a permanent spot in my
          setup. This one grows over time: I add to it whenever something new sticks. Mostly things
          that help me build, read, focus, or tinker.
        </p>
      </header>

      <nav className="things-index" aria-label="Index">
        <span className="things-index__label">Index</span>
        <ol className="things-index__list">
          {groups.map((g) => (
            <li key={g.category}>
              <a href={`#${slug(g.category)}`}>
                {g.category}
                <span className="things-index__count">{g.items.length}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {groups.map((g) => (
        <section className="things-section" id={slug(g.category)} key={g.category}>
          <h2 className="things-section__title">{g.category}</h2>
          <div className="things-grid">
            {g.items.map((t) => <ThingCard t={t} key={t.id} />)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ThingsPage;
