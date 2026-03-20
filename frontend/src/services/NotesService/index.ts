import { client } from '../../api/client';
import type { paths } from '../../api/schema';

export type Note = paths['/notes']['get']['responses']['200']['content']['application/json'][0];
export type NoteDetail = paths['/notes/{id}']['get']['responses']['200']['content']['application/json'];
export type Summary = paths['/notes/{id}/summary']['get']['responses']['200']['content']['application/json'];
export type UploadResponse = paths['/note-file']['post']['responses']['201']['content']['application/json'];

export class NotesService {
  static async getNotes(): Promise<Note[]> {
    const { data, error } = await client.GET('/notes', {});
    if (error) throw new Error(`Failed to fetch notes: ${error}`);
    return data || [];
  }

  static async getNoteById(id: string): Promise<NoteDetail> {
    const { data, error } = await client.GET('/notes/{id}', {
      params: { path: { id } }
    });
    if (error) throw new Error(`Failed to fetch note: ${error}`);
    if (!data) throw new Error('Note not found');
    return data;
  }

  static async getNoteSummary(id: string): Promise<Summary> {
    const { data, error } = await client.GET('/notes/{id}/summary', {
      params: { path: { id } }
    });
    if (error) throw new Error(`Failed to fetch summary: ${error}`);
    if (!data) throw new Error('Summary not found');
    return data;
  }

  static async uploadNoteFile(file: File, title?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    const { data, error } = await client.POST('/note-file', {
      body: formData as any,
    });
    if (error) throw new Error(`Failed to upload file: ${error}`);
    if (!data) throw new Error('Upload failed');
    return data;
  }
}