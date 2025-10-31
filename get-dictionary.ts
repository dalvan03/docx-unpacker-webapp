import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  zh: () => import('./dictionaries/zh.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
  hi: () => import('./dictionaries/hi.json').then((module) => module.default),
  bn: () => import('./dictionaries/bn.json').then((module) => module.default),
  ur: () => import('./dictionaries/ur.json').then((module) => module.default),
  id: () => import('./dictionaries/id.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  pcm: () => import('./dictionaries/pcm.json').then((module) => module.default),
  arz: () => import('./dictionaries/arz.json').then((module) => module.default),
  ta: () => import('./dictionaries/ta.json').then((module) => module.default),
  yue: () => import('./dictionaries/yue.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
  te: () => import('./dictionaries/te.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries['en']>>;

export const getDictionary = async (locale: Locale) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.en;
  return dictionaryLoader();
};
