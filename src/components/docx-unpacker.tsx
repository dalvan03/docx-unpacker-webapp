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

export default function DocxUnpacker() {
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
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/unpack', {
          method: 'POST',
          body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      if (result.error) {
        setError(result.error);
      } else if (result.files) {
        setUnpackedContent(result.files);
      }
    } catch (e: unknown) {
        console.error("Error processing file:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(`Failed to read or process the file. ${errorMessage}`);
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
        <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
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
                Unpacking your document...
              </p>
            </div>
          )}
          {error && (
             <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>An Error Occurred</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
                <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">Try Again</Button>
            </Alert>
          )}
        </div>
      )}

      {unpackedContent && (
        <>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-semibold truncate" title={fileName}>Contents of: <span className="text-primary">{fileName}</span></h2>
            <div className="flex items-center gap-2">
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download All (.zip)
              </Button>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[60vh]">
            <aside className="md:col-span-1 lg:col-span-1 bg-card p-4 rounded-lg border overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">File Structure</h3>
              <FileTree
                files={unpackedContent}
                onSelect={setSelectedFile}
                selectedFile={selectedFile}
              />
            </aside>
            <section className="md:col-span-2 lg:col-span-3 bg-card rounded-lg border overflow-hidden">
              <FileViewer file={selectedFile} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
