import { extname } from 'path';

/**
 * Returns the MIME type of a file based on its extension.
 * @param {string} filename - The name of the file.
 * @returns {string} - The MIME type of the file.
 */
export function getMimetype(filename: string): string {
  const extension = extname(filename).toLowerCase();

  const mimeTypes: { [key: string]: string } = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.wav': 'audio/wav',
    '.avi': 'video/x-msvideo',
  };

  return mimeTypes[extension] || 'application/octet-stream';
}