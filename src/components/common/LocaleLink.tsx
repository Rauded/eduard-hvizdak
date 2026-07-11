import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { localizedPath } from '../../config/locale';
import { useLocale } from '../../i18n/LocaleContext';

// Drop-in <Link> that prefixes a locale-less path with the active locale, so a
// Slovak visitor's nav keeps the /sk prefix. Use for every internal link; pass
// the plain English-shaped path (e.g. "/blog") as `to`.
export const LocaleLink: React.FC<LinkProps> = ({ to, ...rest }) => {
  const { locale } = useLocale();
  const target = typeof to === 'string' ? localizedPath(to, locale) : to;
  return <Link to={target} {...rest} />;
};

// Hook form for imperative navigation (navigate(...), <Navigate to=...>).
export function useLocalizedPath(): (path: string) => string {
  const { locale } = useLocale();
  return (path: string) => localizedPath(path, locale);
}

export default LocaleLink;
