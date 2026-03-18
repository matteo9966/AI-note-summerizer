import { getMimetype } from './getMimetype';

/**
 * Validates the MIME type of a file against a list of valid MIME types.
 * @param {string} filename - The name of the file to validate.
 * @param {string[]} validMimeTypes - An array of valid MIME types.
 * @returns {boolean} - Returns true if the file's MIME type is valid, otherwise false.
 */
export function validateMimetype(filename: string, validMimeTypes: string[]): boolean {
  const mimetype = getMimetype(filename);
  return validMimeTypes.includes(mimetype);
}