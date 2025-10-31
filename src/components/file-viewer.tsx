"use client";

import type { UnpackedFile } from "@/lib/types";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { FileQuestion, Code, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import type { Dictionary } from "@/get-dictionary";

function formatXml(xml: string) {
    const PADDING = ' '.repeat(2);
    let formatted = '';
    let indent = '';

    xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');

    xml.split('\r\n').forEach(node => {
        if (node.match( /^\/\w/ )) indent = indent.substring(PADDING.length);
        formatted += indent + node + '\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += PADDING;
    });

    return formatted.trim();
};


export function FileViewer({ file, dictionary }: { file: UnpackedFile | null, dictionary: Dictionary['docxUnpacker']['fileViewer'] }) {
  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
        <FileQuestion className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">{dictionary.selectFileTitle}</h3>
        <p>{dictionary.selectFileSubtitle}</p>
      </div>
    );
  }

  const isImage = file.mimeType?.startsWith("image/");
  const isXml = file.mimeType?.includes("xml");
  const isPreviewableXml = isXml && file.path.includes("document.xml");

  const formattedXmlContent = isXml && file.content ? formatXml(file.content) : '';

  const renderContent = () => {
    if (isImage) {
      return (
        <Image
          src={`data:${file.mimeType};base64,${file.content}`}
          alt={file.name}
          fill
          className="object-contain"
        />
      );
    }
    
    // Naive XML to text conversion for preview
    const simplePreview = isPreviewableXml
      ? file.content?.match(/<w:t>.*?<\/w:t>/g)?.map(t => t.replace(/<[^>]+>/g, '')).join('')
      : null;
      
    if (isPreviewableXml && simplePreview) {
        return (
            <Tabs defaultValue="preview" className="h-full flex flex-col">
                <div className="px-4 pt-4">
                    <TabsList>
                        <TabsTrigger value="preview"><Eye className="mr-2 h-4 w-4"/>{dictionary.previewTab}</TabsTrigger>
                        <TabsTrigger value="raw"><Code className="mr-2 h-4 w-4"/>{dictionary.rawXmlTab}</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="preview" className="flex-grow overflow-hidden m-0">
                    <ScrollArea className="h-full p-4">
                        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">{simplePreview}</div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="raw" className="flex-grow overflow-hidden m-0">
                    <ScrollArea className="h-full">
                        <pre className="text-xs p-4">
                            <code>{formattedXmlContent}</code>
                        </pre>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        )
    }

    if(isXml) {
        return (
             <ScrollArea className="h-full">
                <pre className="text-xs p-4">
                    <code>{formattedXmlContent}</code>
                </pre>
            </ScrollArea>
        )
    }

    return (
        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
            <FileQuestion className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-semibold">{dictionary.noPreviewTitle}</h3>
            <p>{dictionary.noPreviewSubtitle}</p>
        </div>
    )
  };

  return (
    <div className="h-full w-full bg-white dark:bg-black relative">
      {renderContent()}
    </div>
  );
}
