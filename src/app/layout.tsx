import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { i18n } from '../../i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'Docx Unpacker | Free Online Tool to View & Extract .docx Files',
  description: 'Instantly unpack, view, and download the contents of your .docx files. Explore the raw XML and media files within any Word document right in your browser. No software installation required.',
  keywords: ['docx unpacker', 'docx viewer', 'extract docx', 'open docx online', 'docx to xml', 'view word document contents', 'free docx tool'],
  openGraph: {
    title: 'Docx Unpacker | Free Online Tool to View & Extract .docx Files',
    description: 'Instantly unpack, view, and download the contents of your .docx files. Explore the raw XML and media files within any Word document right in your browser.',
    type: 'website',
    url: 'https://your-app-url.com', // TODO: Replace with your actual URL
    images: [
      {
        url: '/og-image.png', // It's a good practice to add an image for social sharing
        width: 1200,
        height: 630,
        alt: 'Docx Unpacker Tool Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docx Unpacker | Free Online Tool to View & Extract .docx Files',
    description: 'Instantly unpack, view, and download the contents of your .docx files. Explore raw XML and media right in your browser.',
    images: ['/og-image.png'], // TODO: Replace with your actual URL for the image
  },
};


export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        {
          i18n.locales.map((locale) => (
            <link
              key={locale}
              rel="alternate"
              href={`https://your-app-url.com/${locale}`} // TODO: Replace with your actual URL
              hrefLang={locale}
            />
          ))
        }
      </head>
      <body className="font-body antialiased">{children}<Toaster /></body>
    </html>
  );
}
