import React from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';
import { BlogTheme } from './useBlogTheme';

// Single reusable light/dark toggle used on the feed and on article pages.
const ThemeToggle: React.FC<{ theme: BlogTheme; onToggle: () => void }> = ({ theme, onToggle }) => (
  <button
    type="button"
    className="blog-theme-toggle"
    onClick={onToggle}
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {theme === 'dark' ? <LuSun /> : <LuMoon />}
  </button>
);

export default ThemeToggle;
