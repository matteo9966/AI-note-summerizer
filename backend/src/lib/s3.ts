import { ListBucketsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
dotenv.config();

// Initialize the S3 client using environment variables
export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_S3_ENDPOINT, // Optional: for custom S3-compatible services
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    
  },

  forcePathStyle: true, // Required for some S3-compatible services like LocalStack
});

// Utility function to generate a signed URL for an S3 object
export async function getSignedUrlForS3Object(key: string, expiresIn: number = 3600): Promise<string> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return signedUrl;
}

export async function uploadFileToS3(file: Express.Multer.File): Promise<string> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;
  const key = `notes/${Date.now()}_${file.originalname}`;
    const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
  });
  
    const result =  await s3Client.send(command)
    return key
  
}


export async function listS3Buckets(): Promise<string[]> {
  const buckets = await s3Client.send(new ListBucketsCommand({}));
  return buckets.Buckets?.map(bucket => bucket.Name!) || [];
}