import React from 'react';
import './bun-section-heading.scss';

interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  accent?: string;
  subtitle?: string;
}

// Inspired by bun.com's drop-shadow section headings (the pink "Learn
// more" / "Developers love Bun" treatment).
const BunSectionHeading: React.FC<Props> = ({
  as: Tag = 'h2',
  children,
  accent = 'var(--accent)',
  subtitle,
}) => {
  return (
    <div className="bun-section-heading">
      <Tag
        className="bun-section-heading__text"
        style={{ '--bun-accent': accent } as React.CSSProperties}
      >
        {children}
      </Tag>
      {subtitle && <p className="bun-section-heading__sub">{subtitle}</p>}
    </div>
  );
};

export default BunSectionHeading;
