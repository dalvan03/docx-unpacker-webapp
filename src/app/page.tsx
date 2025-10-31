import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { i18n } from '../../i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export default function RootPage() {
  const accept = headers().get('accept-language') ?? '';
  const locales = [...i18n.locales] as string[];
  const languages = new Negotiator({ headers: { 'accept-language': accept } })
    .languages()
    .map((l: string) => l.split('-')[0]);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  redirect(`/${locale}`);
}
