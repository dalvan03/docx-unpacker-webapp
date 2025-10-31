import DocxUnpacker from "@/components/docx-unpacker";
import { PackageOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <PackageOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Docx Unpacker
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <DocxUnpacker />
      </main>
      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js and Tailwind CSS. Unpack .docx files with ease.</p>
        </div>
      </footer>
    </div>
  );
}
