import { Request, Response } from 'express';
import { ServerError } from '../types/ServerError';
// import { NoteCreateSchema } from '@ai/types';
// import * as noteService from '../services/noteService';

// export const createNote = (req: Request, res: Response) => {
//   const parsed = NoteCreateSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({ error: parsed.error.errors });
//   }

//   const note = noteService.addNote(parsed.data);
//   return res.status(201).json(note);
// };

// export const getNotes = (_req: Request, res: Response) => {
//   const notes = noteService.getAllNotes();
//   return res.json(notes);
// };

// export const aiSummarize = (req: Request, res: Response) => {
//   // TODO: implement AI summarize
//   return res.json({ message: 'TODO: AI summarize endpoint' });
// };
import { uploadNoteFileAndStoreData } from '../services/noteService';
import { validateMimetype } from '../utils/validateMimetype';
/**
 * @swagger
 * /note-file:
 *   post:
 *     summary: Upload a note file
 *     description: Upload a text or markdown file and store its data.
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload (text or markdown).
 *               title:
 *                 type: string
 *                 description: Optional title for the file.
 *     responses:
 *       201:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 s3Key:
 *                   type: string
 *                   description: The S3 key of the uploaded file.
 *       400:
 *         description: Bad request, e.g., no file uploaded or invalid file type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid file type. Only text and markdown files are allowed.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
export const uploadNoteFile = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File| undefined;
    if (!file) {
      throw new ServerError('No file uploaded', 400);
    }

    const fileTitle = req.body.title as string | undefined; 
    const  originalFileName = file?.originalname || fileTitle || 'untitled';
    // const mimeType = file?.mimetype;
    const isValidMimeType = validateMimetype(originalFileName, ['text/plain','	text/markdown']);
  
    if (!isValidMimeType) {
      throw new ServerError('Invalid file type. Only text and markdown files are allowed.', 400);
    } 

    const s3Key = await uploadNoteFileAndStoreData(file,fileTitle);
    return res.status(201).json({ message: 'File uploaded successfully', s3Key });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error instanceof ServerError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}