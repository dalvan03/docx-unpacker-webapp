import { MetadataRoute } from 'next';
import { i18n } from '../i18n-config';

// Replace with your actual app URL
const URL = 'https://your-app-url.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the base sitemap entry for the default locale
  sitemapEntries.push({
    url: `${URL}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: i18n.locales.reduce((acc, locale) => {
        acc[locale] = `${URL}/${locale}`;
        return acc;
      }, {} as Record<string, string>),
    },
  });

  // Add sitemap entries for each locale
  i18n.locales.forEach(locale => {
    sitemapEntries.push({
      url: `${URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: i18n.locales.reduce((acc, l) => {
          acc[l] = `${URL}/${l}`;
          return acc;
        }, {} as Record<string, string>),
      },
    });
  });

  return sitemapEntries;
}
