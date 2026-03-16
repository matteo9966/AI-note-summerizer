import { NoteCreate, Note } from '@ai/types';

let notes: Note[] = [];
let nextId = 1;

export const addNote = (payload: NoteCreate): Note => {
  const note: Note = {
    id: nextId++,
    title: payload.title,
    content: payload.content,
    createdAt: new Date().toISOString()
  };
  notes.push(note);
  return note;
};

export const getAllNotes = (): Note[] => notes;
