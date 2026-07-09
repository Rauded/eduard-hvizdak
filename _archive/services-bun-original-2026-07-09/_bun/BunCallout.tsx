import React from 'react';
import './bun-callout.scss';

interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
  title?: string;
}

// Inspired by bun.com callout blocks (dark bordered note sections from
// the blog). Different from the existing .services signals.
const BunCallout: React.FC<Props> = ({ children, variant = 'default', title }) => {
  return (
    <div className={`bun-callout bun-callout--${variant}`}>
      {title && <div className="bun-callout__title">{title}</div>}
      <div className="bun-callout__body">{children}</div>
    </div>
  );
};

export default BunCallout;
