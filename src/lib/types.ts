export interface UnpackedFile {
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string; // base64 for images, text for others
  mimeType?: string;
  children: UnpackedFile[];
}
