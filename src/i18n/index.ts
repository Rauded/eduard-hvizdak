// i18n lookup machinery.
//
// Usage in a component:
//   const t = useT('header');
//   ...  {t.nav.home}
//
// useT returns the fully-resolved dictionary object for one namespace in the
// active locale. English is the base; the active locale's partial is deep-merged
// over it, so any missing key (and all of Czech, for now) falls back to English.
// Because the return type is the English namespace type, every key is
// autocompleted and a typo is a compile error, not a runtime blank.
import { useLocale } from './LocaleContext';
import { Locale } from '../config/locale';
import { en, Dict } from './en';
import { DeepPartial } from './types';

// sk and cs live in their own chunks and are filled in by loadLocale() (called
// before first render for /sk and /cs URLs, and when the language is switched).
// Until then a non-English locale falls back to English.
const OVERRIDES: Record<Locale, DeepPartial<Dict>> = { en: {}, sk: {}, cs: {} };

const LOADERS: Record<Locale, () => Promise<object[]>> = {
  en: () => Promise.resolve([]),
  sk: () => Promise.all([import('./sk').then((m) => m.sk), import('./sk/heavy').then((m) => m.skHeavy)]),
  cs: () => Promise.all([import('./cs').then((m) => m.cs), import('./cs/heavy').then((m) => m.csHeavy)]),
};
const pending: Partial<Record<Locale, Promise<void>>> = {};
export function loadLocale(locale: Locale): Promise<void> {
  return (pending[locale] ??= LOADERS[locale]().then((parts) => {
    Object.assign(OVERRIDES[locale], ...parts);
  }));
}

// Namespaces from ./heavy.ts join the base dictionaries when a lazy page loads.
const BASE: Record<string, unknown> = { ...en };
export function registerNamespaces(base: object) {
  Object.assign(BASE, base);
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

// Deep-merge an override onto a base, returning a new object shaped like base.
// Arrays and primitives from the override replace the base value wholesale;
// nested plain objects merge key by key.
function deepMerge<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (over === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(over)) {
    return (over as unknown as T) ?? base;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(over)) {
    const o = (over as Record<string, unknown>)[key];
    if (o === undefined) continue;
    out[key] = deepMerge((base as Record<string, unknown>)[key], o as never);
  }
  return out as T;
}

// Resolve one namespace for an explicit locale (non-hook, for data helpers and
// prerender-time code).
export function getDict<K extends keyof Dict>(ns: K, locale: Locale): Dict[K] {
  const base = BASE[ns as string] as Dict[K];
  if (locale === 'en') return base;
  const over = OVERRIDES[locale][ns] as DeepPartial<Dict[K]> | undefined;
  return deepMerge(base, over);
}

// Hook form: resolves the namespace for the active locale and re-renders on
// switch.
export function useT<K extends keyof Dict>(ns: K): Dict[K] {
  const { locale } = useLocale();
  return getDict(ns, locale);
}

// Pick a localized variant field off a data object, e.g. pickField(post,
// 'title', locale) returns post.title_sk when locale is 'sk' and it exists,
// otherwise post.title. Czech falls back to English for now (no _cs fields yet).
export function pickField<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: Locale,
): unknown {
  if (locale === 'en') return obj[field];
  const variant = obj[`${field}_${locale}`];
  if (variant !== undefined && variant !== null && variant !== '') return variant;
  return obj[field];
}
