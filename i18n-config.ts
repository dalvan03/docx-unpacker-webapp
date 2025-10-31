export const i18n = {
  defaultLocale: 'en',
  locales: [
    'en',
    'pt',
    'es',
    'zh',
    'ru',
    'ar',
    'fr',
    'de',
    'nl',
    'hi',
    'bn',
    'ur',
    'id',
    'ja',
    'pcm',
    'arz',
    'ta',
    'yue',
    'tr',
    'te',
    'vi',
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];
