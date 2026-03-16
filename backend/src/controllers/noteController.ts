import { Request, Response } from 'express';
import { NoteCreateSchema } from '@ai/types';
import * as noteService from '../services/noteService';

export const createNote = (req: Request, res: Response) => {
  const parsed = NoteCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const note = noteService.addNote(parsed.data);
  return res.status(201).json(note);
};

export const getNotes = (_req: Request, res: Response) => {
  const notes = noteService.getAllNotes();
  return res.json(notes);
};

export const aiSummarize = (req: Request, res: Response) => {
  // TODO: implement AI summarize
  return res.json({ message: 'TODO: AI summarize endpoint' });
};
