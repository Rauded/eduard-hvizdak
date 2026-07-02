import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useTheme } from '../theme/ThemeContext';
import { THINGS } from './thingsData';
import './things.scss';

const ThingsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="things-page" data-theme={theme}>
      <Seo
        title="Tech I'm obsessed with"
        description="The tech Eduard Hvizdak is obsessed with and uses every day: MacBook Pro M4 Pro, AirPods Pro 3, e-ink readers, AR glasses, Pavlok and more."
        path="/things"
      />

      <header className="things-hero">
        <span className="things-hero__kicker">/things</span>
        <h1 className="things-hero__title">Tech I'm obsessed with</h1>
        <p className="things-hero__lead">
          The gear I genuinely love and use every day, the pieces that earn a permanent spot
          in my setup. Mostly things that help me build, read, focus, or tinker.
        </p>
      </header>

      <div className="things-grid">
        {THINGS.map((t) => {
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
              key={t.id}
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
              key={t.id}
              className="things-card things-card--static"
              style={{ '--thing-accent': t.accent } as React.CSSProperties}
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThingsPage;
