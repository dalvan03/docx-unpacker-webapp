import DocxUnpacker from "@/components/docx-unpacker";
import Faq from "@/components/faq";
import { PackageOpen } from "lucide-react";
import { getDictionary } from '@/get-dictionary'
import { Locale } from '../../../i18n-config';
import { Separator } from "@/components/ui/separator";
import LanguageSwitcher from "@/components/language-switcher";

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <PackageOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                {dictionary.page.title}
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <DocxUnpacker dictionary={dictionary.docxUnpacker} />
        <Separator className="my-8" />
        <Faq dictionary={dictionary} />
      </main>
      <footer className="py-4 border-t mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{dictionary.page.footer}</p>
          <LanguageSwitcher />
        </div>
      </footer>
    </div>
  );
}
