export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'pt', 'es', 'zh', 'ru', 'ar', 'fr', 'de', 'nl'],
} as const;

export type Locale = (typeof i18n)