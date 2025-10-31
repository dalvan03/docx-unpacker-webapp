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
  fileBuffer: ArrayBuffer
): Promise<{ error?: string; files?: UnpackedFile[] }> {
  // This function is kept for potential future use but is no longer called by the component.
  // The logic has been moved to the client-side in docx-unpacker.tsx.
  return { error: "This server action is currently not in use." };
}
