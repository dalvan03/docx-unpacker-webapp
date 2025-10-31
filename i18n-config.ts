export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'pt', 'es', 'zh', 'ru', 'ar'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
