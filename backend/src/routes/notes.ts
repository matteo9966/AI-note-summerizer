import express from 'express';
import * as noteController from '../controllers/noteController';

const router = express.Router();

router.post('/note', noteController.createNote);
router.get('/notes', noteController.getNotes);
router.get('/ai-summerize/:noteId', noteController.aiSummarize);
router.post('/note-file', noteController.updateNote);

export default router;
