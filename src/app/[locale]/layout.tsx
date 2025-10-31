import type { Metadata, ResolvingMetadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { i18n, type Locale } from '../../../i18n-config';
import { getDictionary } from '@/get-dictionary';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: { locale: Locale } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const metadata = dictionary.metadata;

  const parentKeywords = (await parent).keywords || [];
  const newKeywords = Array.isArray(parentKeywords) ? [...metadata.keywords, ...parentKeywords] : metadata.keywords;


  return {
    title: metadata.title,
    description: metadata.description,
    keywords: newKeywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      url: metadata.url,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: metadata.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${metadata.url}/${params.locale}`,
      languages: i18n.locales.reduce((acc, locale) => {
        acc[locale] = `${metadata.url}/${locale}`;
        return acc;
      }, {} as Record<string, string>),
    },
  };
}


export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const isRtl = params.locale === 'ar';
  return (
    <html lang={params.locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-body antialiased ${isRtl ? 'font-arabic' : ''}`}>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
