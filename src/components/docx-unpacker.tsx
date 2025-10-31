"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Download, RotateCcw, AlertCircle } from "lucide-react";

import type { UnpackedFile } from "@/lib/types";
import { FileUpload } from "@/components/file-upload";
import { FileTree } from "@/components/file-tree";
import { FileViewer } from "@/components/file-viewer";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "./icons";
import type { Dictionary } from "@/get-dictionary";
import { getMimeType } from "@/lib/utils";

async function unpackDocxClient(
    fileBuffer: ArrayBuffer
  ): Promise<{ error?: string; files?: UnpackedFile[] }> {
    if (!fileBuffer) {
      return { error: "No file data received." };
    }
  
    try {
      const zip = await JSZip.loadAsync(fileBuffer);
      const root: UnpackedFile = {
        name: "root", // a temporary root
        path: "",
        type: "directory",
        children: [],
      };
  
      const directoryCache = new Map<string, UnpackedFile>();
      directoryCache.set('', root);
  
      const zipEntries = Object.values(zip.files).sort((a, b) => a.name.localeCompare(b.name));
  
      for (const zipEntry of zipEntries) {
        if (zipEntry.dir) continue;
  
        const pathParts = zipEntry.name.split("/").filter(p => p);
        if (pathParts.length === 0) continue;
        
        let currentPath = '';
        
        for (let i = 0; i < pathParts.length - 1; i++) {
          const part = pathParts[i];
          const parentPath = currentPath;
          currentPath = currentPath ? `${currentPath}/${part}` : part;
          
          if (!directoryCache.has(currentPath)) {
            const parentDir = directoryCache.get(parentPath);
            if(!parentDir) continue; // Should not happen
            const newDir: UnpackedFile = {
              name: part,
              path: currentPath,
              type: 'directory',
              children: [],
            };
            parentDir.children.push(newDir);
            directoryCache.set(currentPath, newDir);
          }
        }
  
        const parentDir = directoryCache.get(currentPath);
        if(!parentDir) continue; // Should not happen
  
        const entryFileName = pathParts[pathParts.length - 1];
        const mimeType = getMimeType(entryFileName);
        const isText = mimeType?.includes("xml") || mimeType?.includes("text") || !mimeType;
  
        const fileNode: UnpackedFile = {
          name: entryFileName,
          path: zipEntry.name,
          type: "file",
          mimeType,
          children: [],
          content: await zipEntry.async(isText ? "string" : "base64"),
        };
  
        parentDir.children.push(fileNode);
      }
  
      return { files: root.children };
    } catch (e: unknown) {
      console.error("Error unpacking docx:", e);
      if (e instanceof Error) {
        return {
          error: `Failed to unpack the file. It may be corrupted or in an unexpected format. Details: ${e.message}`,
        };
      }
      return { error: "An unknown error occurred while unpacking the file." };
    }
}


export default function DocxUnpacker({ dictionary }: { dictionary: Dictionary['docxUnpacker'] }) {
  const [unpackedContent, setUnpackedContent] = useState<UnpackedFile[] | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<UnpackedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setUnpackedContent(null);
    setSelectedFile(null);
    setFileName(file.name);

    try {
        const fileBuffer = await file.arrayBuffer();
        const result = await unpackDocxClient(fileBuffer);

      if (result.error) {
        setError(result.error);
      } else if (result.files) {
        setUnpackedContent(result.files);
      }
    } catch (e: unknown) {
        console.error("Error processing file:", e);
        const errorMessage = e instanceof Error ? e.message : dictionary.unknownError;
        setError(`${dictionary.fileReadError} ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUnpackedContent(null);
    setSelectedFile(null);
    setError(null);
    setFileName("");
  };

  const handleDownload = async () => {
    if (!unpackedContent) return;

    const zip = new JSZip();

    function addFilesToZip(files: UnpackedFile[], currentZipFolder: JSZip) {
        for (const file of files) {
            if (file.type === 'directory') {
                const folder = currentZipFolder.folder(file.name);
                if (folder) {
                    addFilesToZip(file.children, folder);
                }
            } else {
                const content = file.content || '';
                const isBase64 = file.mimeType && file.mimeType.startsWith('image/');
                currentZipFolder.file(file.name, content, { base64: isBase64 });
            }
        }
    }
    
    addFilesToZip(unpackedContent, zip);

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const downloadFileName = fileName.replace('.docx', '_unpacked.zip');
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  };

  if (!unpackedContent && !isLoading && !error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow flex items-center justify-center">
        <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} dictionary={dictionary.fileUpload} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
      {(isLoading || error) && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          {isLoading && !error && (
            <div className="flex flex-col items-center gap-4 p-8 bg-card rounded-lg shadow-2xl">
              <Spinner className="h-12 w-12 text-primary" />
              <p className="text-lg font-medium text-foreground">
                {dictionary.unpackingMessage}
              </p>
            </div>
          )}
          {error && (
             <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{dictionary.errorTitle}</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
                <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">{dictionary.tryAgain}</Button>
            </Alert>
          )}
        </div>
      )}

      {unpackedContent && (
        <>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-semibold truncate" title={fileName}>{dictionary.contentsOf}: <span className="text-primary">{fileName}</span></h2>
            <div className="flex items-center gap-2">
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                {dictionary.startOver}
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                {dictionary.downloadAll}
              </Button>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[60vh]">
            <aside className="md:col-span-1 lg:col-span-1 bg-card p-4 rounded-lg border overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">{dictionary.fileStructure}</h3>
              <FileTree
                files={unpackedContent}
                onSelect={setSelectedFile}
                selectedFile={selectedFile}
              />
            </aside>
            <section className="md:col-span-2 lg:col-span-3 bg-card rounded-lg border overflow-hidden">
              <FileViewer file={selectedFile} dictionary={dictionary.fileViewer} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
