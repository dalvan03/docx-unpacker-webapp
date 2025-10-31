'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '../../../i18n-config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const getCurrentLocale = () => {
    if (!pathName) return i18n.defaultLocale;
    const segments = pathName.split('/');
    const locale = segments[1];
    if (i18n.locales.includes(locale as Locale)) {
      return locale as Locale;
    }
    return i18n.defaultLocale;
  };

  const currentLocale = getCurrentLocale();
  const currentLanguage = new Intl.DisplayNames(['en'], { type: 'language' }).of(currentLocale);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Globe className="mr-2 h-4 w-4" />
          {currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => {
          const languageName = new Intl.DisplayNames(['en'], { type: 'language' }).of(locale) || locale;
          return (
            <DropdownMenuItem
              key={locale}
              onSelect={() => router.push(redirectedPathName(locale))}
              className="cursor-pointer"
            >
              {languageName.charAt(0).toUpperCase() + languageName.slice(1)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
