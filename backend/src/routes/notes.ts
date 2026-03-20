import express from 'express';
import * as noteController from '../controllers/noteController';
import { upload } from '../lib/multer';

const router = express.Router();

// router.post('/note', noteController.createNote);
// router.get('/notes', noteController.getNotes);
// router.get('/ai-summerize/:noteId', noteController.aiSummarize);
router.post('/note-file', upload.single("file"),noteController.uploadNoteFile);
router.get('/notes', noteController.getNotes);
router.get('/notes/:id', noteController.getNoteContentById);
router.get('/notes/:id/summary', noteController.getNoteSummaryById);
router.get('/notes/{id}/file', noteController.getNoteFileById);

export default router;
