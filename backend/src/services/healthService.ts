import { prisma } from "../lib/prisma-client";
import { listS3Buckets } from "../lib/s3";

export const checkHealthS3 = async (): Promise<boolean> => {
  try {
    // Attempt to list S3 buckets to check connectivity
    await listS3Buckets();
    return true;
  } catch (error) {
    console.error('S3 Health Check Failed:', error);
    return false;
  }
};

export const checkHealthDatabase = async (): Promise<boolean> => {  
    try {
        // Attempt to query the database to check connectivity
        await prisma.$queryRaw`SELECT 1`;
        return true;
    } catch (error) {
        console.error('Database Health Check Failed:', error);
        return false;
    }
};

