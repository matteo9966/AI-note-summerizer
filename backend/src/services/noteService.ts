import { NoteCreate, Note } from '@ai/types';
import { getSignedUrlForS3Object, uploadFileToS3 } from '../lib/s3';
import { prisma } from '../lib/prisma-client';




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
}


export const storeNoteData = async (note:{
    s3Key: string;
    title: string;
}): Promise<Note> => {
 return  prisma.note.create({
    data: {
      s3Key:note.s3Key,
      title: note.title
    }
  })
}


export const uploadNoteFileAndStoreData = async (file: Express.Multer.File, title?: string): Promise<Note> => {
  const s3Key = await uploadNoteFile(file);
  const noteData = {  
    s3Key,
    title: title || file.originalname
  }
  return storeNoteData(noteData);
}