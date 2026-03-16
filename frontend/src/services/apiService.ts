import axios from 'axios';
import type { Note, NoteCreate } from '@ai/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new note
export const createNote = async (noteData: NoteCreate): Promise<Note> => {
  const response = await apiClient.post<Note>('/note', noteData);
  return response.data;
};

// Get all notes
export const getNotes = async (): Promise<Note[]> => {
  const response = await apiClient.get<Note[]>('/notes');
  return response.data;
};

// Summarize a note using AI
export const aiSummarize = async (noteId: string): Promise<{ id: number; summary: string }> => {
  const response = await apiClient.get<{ id: number; summary: string }>(`/ai-summerize/${noteId}`);
  return response.data;
};