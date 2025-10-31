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
  formData: FormData
): Promise<{ error?: string; files?: UnpackedFile[] }> {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file uploaded." };
  }

  if (
    !file.name.endsWith(".docx") &&
    file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return { error: "Invalid file type. Please upload a .docx file." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const root: UnpackedFile = {
      name: file.name,
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

      for (let i = 0; i < pathParts.length - 1; i++) {
        const dirPath = pathParts.slice(0, i + 1).join('/');
        let nextDir = directoryCache.get(dirPath);
        if (!nextDir) {
          nextDir = {
            name: pathParts[i],
            path: dirPath,
            type: "directory",
            children: [],
          };
          currentDir.children.push(nextDir);
          directoryCache.set(dirPath, nextDir);
        }
        currentDir = nextDir;
      }
      
      const fileName = pathParts[pathParts.length - 1];
      const mimeType = getMimeType(fileName);
      const isText = mimeType?.includes("xml") || mimeType?.includes("text");

      const fileNode: UnpackedFile = {
        name: fileName,
        path: zipEntry.name,
        type: "file",
        mimeType,
        children: [],
        content: await zipEntry.async(isText ? "string" : "base64"),
      };

      currentDir.children.push(fileNode);
    }
    
    return { files: root.children };
  } catch (e) {
    console.error(e);
    return { error: "Failed to unpack the file. It may be corrupted." };
  }
}
