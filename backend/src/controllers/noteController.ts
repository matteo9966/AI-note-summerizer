import { Request, RequestHandler, Response } from "express";
import { ServerError } from "../types/ServerError";
import { validateMimetype } from "../utils/validateMimetype";
import {
  getNoteFileContentBys3Key,
  getSignedUrlForNoteById,
  uploadNoteFileAndStoreData,
} from "../services/noteService";
import { prisma } from "../lib/prisma-client";
import { getNoteSummary } from "../services/noteService";
// Wrapper function to handle errors
const handleErrors = (fn: (req: Request, res: Response) => Promise<any>) => {
  return async (req: Request, res: Response) => {
    try {
      return await fn(req, res);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof ServerError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

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
export const uploadNoteFile = handleErrors(
  async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
      throw new ServerError("No file uploaded", 400);
    }

    const fileTitle = req.body.title as string | undefined;
    const originalFileName = file?.originalname || fileTitle || "untitled";
    const isValidMimeType = validateMimetype(originalFileName, [
      "text/plain",
      "text/markdown",
    ]);

    if (!isValidMimeType) {
      throw new ServerError(
        "Invalid file type. Only text and markdown files are allowed.",
        400,
      );
    }

    const s3Key = await uploadNoteFileAndStoreData(file, fileTitle);
    return res
      .status(201)
      .json({ message: "File uploaded successfully", s3Key });
  },
);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retrieve all notes
 *     description: Fetches all notes from the database.
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: A list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the note.
 *                   title:
 *                     type: string
 *                     description: The title of the note.
 *                   content:
 *                     type: string
 *                     description: The content of the note.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the note.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The last update timestamp of the note.
 */
/**
 * Retrieves all notes from the database.
 *
 * @async
 * @function getNotes
 * @param {Request} _req - The Express request object (not used in this function).
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} A JSON response containing all notes.
 */
export const getNotes = handleErrors(async (_req: Request, res: Response) => {
  const response = await prisma.note.findMany();

  return res.json(response);
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retrieve a note by ID
 *     description: Fetches a specific note by its ID and includes its content.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the note.
 *     responses:
 *       200:
 *         description: The requested note with its content.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the note.
 *                 title:
 *                   type: string
 *                   description: The title of the note.
 *                 content:
 *                   type: string
 *                   description: The content of the note.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the note.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the note.
 *       400:
 *         description: Bad request, e.g., invalid or missing note ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Note ID is required and should be a string!
 *       404:
 *         description: Note not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Note not found.
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
export const getNoteContentById = handleErrors(
  async (req: Request, res: Response) => {
    const noteId = req.params.id;
    if (!noteId && typeof noteId !== "string") {
      throw new ServerError("Note ID is required and should be a string!", 400);
    }
    const note = await prisma.note.findUnique({
      where: { id: +noteId },
    });
    if (!note) {
      throw new ServerError("Note not found", 404);
    }
    const content = await getNoteFileContentBys3Key(note.s3Key);
    return res.json({ ...note, content });
  },
);

export const getNoteSummaryById = handleErrors(
  async (req: Request, res: Response) => {
    const noteId = req.params.id;
    if (!noteId && typeof noteId !== "string") {
      throw new ServerError("Note ID is required and should be a string!", 400);
    }
    const summary = await getNoteSummary(noteId);
    return res.json({ summary });
  },
);

/**
 * @swagger
 * /notes/{id}/summary:
 *   get:
 *     summary: Retrieve a generated summary for a note
 *     description: Returns the AI-generated summary for the specified note. If a cached summary exists it will be returned; otherwise a new summary will be generated and stored.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the note to summarize.
 *     responses:
 *       200:
 *         description: The generated summary for the note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *                   description: The AI-generated summary text.
 *       400:
 *         description: Bad request, e.g., missing or invalid note ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Note ID is required and should be a string!
 *       404:
 *         description: Note not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Note not found.
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

/**
 * @swagger
 * /notes/{id}/file:
 *   get:
 *     summary: Download a note file by ID
 *     description: Fetches the file content of a specific note by its ID and returns it as a downloadable file.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the note.
 *     responses:
 *       200:
 *         description: The requested note file content.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request, e.g., missing or invalid note ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Note ID is required and should be a string!
 *       404:
 *         description: Note not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Note not found.
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

export const getNoteFileById = handleErrors(
  async (req: Request, res: Response) => {
    const noteId = req.params.id;
    if (!noteId) {
      throw new ServerError("Note ID is required and should be a string!", 400);
    }
    const note = await prisma.note.findUnique({
      where: { id: +noteId },
    });
    if (!note) {
      throw new ServerError("Note not found", 404);
    }
    const fileContent = await getSignedUrlForNoteById(note.id.toString());
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.title || "note.txt"}"`,
    );
    res.setHeader("Content-Type", "text/plain");
    return res.send(fileContent);
  },
);
