"use client";

import type { UnpackedFile } from "@/lib/types";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { FileQuestion, Code, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

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


export function FileViewer({ file }: { file: UnpackedFile | null }) {
  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
        <FileQuestion className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">Select a file</h3>
        <p>Click on a file in the structure to view its contents.</p>
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
                        <TabsTrigger value="preview"><Eye className="mr-2 h-4 w-4"/>Preview</TabsTrigger>
                        <TabsTrigger value="raw"><Code className="mr-2 h-4 w-4"/>Raw XML</TabsTrigger>
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
            <h3 className="text-xl font-semibold">No preview available</h3>
            <p>Cannot display a preview for this file type.</p>
        </div>
    )
  };

  return (
    <div className="h-full w-full bg-white dark:bg-black relative">
      {renderContent()}
    </div>
  );
}
