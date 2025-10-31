import 'server-only';
import type { Locale } from '../i18n-config';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
  zh: () => import('../dictionaries/zh.json').then((module) => module.default),
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
  ar: () => import('../dictionaries/ar.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
  nl: () => import('../dictionaries/nl.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries['en']>>;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
