"use server";

import JSZip from "jszip";
import type { UnpackedFile } from "@/lib/types";

function getMimeType(filename: string): string | undefined {
  const extension = filename.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "xml":
    case "rels":
      return "application/xml";
    default:
      return undefined;
  }
}

export async function unpackDocx(
  { fileBuffer, fileName }: { fileBuffer: ArrayBuffer, fileName: string }
): Promise<{ error?: string; files?: UnpackedFile[] }> {

  if (!fileBuffer) {
    return { error: "No file data received." };
  }

  try {
    const zip = await JSZip.loadAsync(fileBuffer);

    const root: UnpackedFile = {
      name: fileName,
      path: "",
      type: "directory",
      children: [],
    };
    
    const directoryCache = new Map<string, UnpackedFile>();
    directoryCache.set('', root);

    const zipEntries = Object.values(zip.files).sort((a,b) => a.name.localeCompare(b.name));

    for (const zipEntry of zipEntries) {
      if (zipEntry.dir) continue;

      const pathParts = zipEntry.name.split("/").filter(p => p);
      let currentDir = root;
      let currentPath = '';

      // Find or create parent directories
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        let nextDir = directoryCache.get(currentPath);
        if (!nextDir) {
            const parentDir = directoryCache.get(parentPath) ?? root;
            nextDir = {
                name: part,
                path: currentPath,
                type: 'directory',
                children: [],
            };
            parentDir.children.push(nextDir);
            directoryCache.set(currentPath, nextDir);
        }
        currentDir = nextDir;
      }
      
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

      currentDir.children.push(fileNode);
    }
    
    return { files: root.children };
  } catch (e: unknown) {
    console.error("Error unpacking docx:", e);
    if (e instanceof Error) {
        return { error: `Failed to unpack the file. It may be corrupted or in an unexpected format. Details: ${e.message}` };
    }
    return { error: "An unknown error occurred while unpacking the file." };
  }
}
