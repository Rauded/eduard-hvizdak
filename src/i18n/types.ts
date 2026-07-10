// Shared i18n types. DeepPartial lets the sk/cs dictionaries fill in only the
// keys that are actually translated; anything omitted falls back to English at
// lookup time (see useT in ./index.ts).
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
