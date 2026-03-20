import { NoteCreate, Note } from "@ai/types";
import { getSignedUrlForS3Object, s3Client, uploadFileToS3 } from "../lib/s3";
import { prisma } from "../lib/prisma-client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSummaryFromDeepseek } from "./deepseekService";

/**
 * This function accepts the file uploaded, it uploads it to the S3 bucket and returns the s3 key.
 * @param file
 */
export const uploadNoteFile = (file: Express.Multer.File): Promise<string> => {
  return uploadFileToS3(file);
};

/**
 *
 * @param note
 * @returns
 */
export const getNoteSignedUrl = async (note: Note): Promise<string> => {
  return getSignedUrlForS3Object(note.s3Key);
};

export const storeNoteData = async (note: {
  s3Key: string;
  title: string;
}): Promise<Note> => {
  return prisma.note.create({
    data: {
      s3Key: note.s3Key,
      title: note.title,
    },
  });
};

export const uploadNoteFileAndStoreData = async (
  file: Express.Multer.File,
  title?: string,
): Promise<Note> => {
  const s3Key = await uploadNoteFile(file);
  const noteData = {
    s3Key,
    title: title || file.originalname,
  };
  return storeNoteData(noteData);
};

export const getNoteFileContentBys3Key = async (s3Key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: s3Key,
  });
  const object = await s3Client.send(command);
  const string = await object.Body?.transformToString("utf-8");
  return string;
};

export const getNoteSummary = async (id: string): Promise<string> => {
  //  check if note exists in backend, if not return error
  const note = await prisma.note.findFirst({
    where: {
      id: +id,
    },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  const content = await getNoteFileContentBys3Key(note.s3Key);
  if (!content) {
    throw new Error("Note content not found");
  }
  if (note.summary) {
    return note.summary;
  }
  const summary = await getSummaryFromDeepseek(content);
  if (!summary) {
    throw new Error("Failed to generate AI summary");
  }
  await prisma.note.update({
    where: {
      id: +id,
    },
    data: {
      summary: summary,
    },
  });
  return summary;
};


export const getSignedUrlForNoteById = async (id: string): Promise<string> => {
  const note = await prisma.note.findFirst({
    where: {
      id: +id,
    },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  return getSignedUrlForS3Object(note.s3Key);
};