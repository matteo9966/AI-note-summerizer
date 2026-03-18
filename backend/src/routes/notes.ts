import express from 'express';
import * as noteController from '../controllers/noteController';
import { upload } from '../lib/multer';

const router = express.Router();

// router.post('/note', noteController.createNote);
// router.get('/notes', noteController.getNotes);
// router.get('/ai-summerize/:noteId', noteController.aiSummarize);
router.post('/note-file', upload.single("file"),noteController.uploadNoteFile);
router.get('/notes', noteController.getNotes);

export default router;
