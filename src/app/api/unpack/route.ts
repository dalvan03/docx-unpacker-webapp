import { NextResponse } from 'next/server';
import JSZip from 'jszip';
import type { UnpackedFile } from '@/lib/types';

function getMimeType(filename: string): string | undefined {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'xml':
    case 'rels':
      return 'application/xml';
    default:
      return undefined;
  }
}

async function unpack(
  fileBuffer: ArrayBuffer,
  fileName: string
): Promise<UnpackedFile[]> {
  const zip = await JSZip.loadAsync(fileBuffer);
  const root: UnpackedFile = {
    name: fileName,
    path: '',
    type: 'directory',
    children: [],
  };

  const directoryCache = new Map<string, UnpackedFile>();
  directoryCache.set('', root);
  
  const zipEntries = Object.values(zip.files).sort((a,b) => a.name.localeCompare(b.name));

  for (const zipEntry of zipEntries) {
    if (zipEntry.dir) continue;
    
    const pathParts = zipEntry.name.split('/').filter(p => p);
    let currentDir = root;
    let currentPath = '';

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
    const isText =
      mimeType?.includes('xml') ||
      mimeType?.includes('text') ||
      !mimeType;

    const fileNode: UnpackedFile = {
      name: entryFileName,
      path: zipEntry.name,
      type: 'file',
      mimeType,
      children: [],
      content: await zipEntry.async(isText ? 'string' : 'base64'),
    };
    currentDir.children.push(fileNode);
  }

  return root.children;
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
        return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const fileName = file.name;
    const fileBuffer = await file.arrayBuffer();
    
    const unpackedFiles = await unpack(fileBuffer, fileName);

    return NextResponse.json({ files: unpackedFiles });
  } catch (e: unknown) {
    console.error('Error unpacking docx:', e);
    const message = e instanceof Error ? e.message : 'An unknown error occurred.';
    return NextResponse.json({ error: `Failed to unpack file. ${message}` }, { status: 500 });
  }
}

// Increase body size limit for this route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
