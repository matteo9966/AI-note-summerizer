import express, { Request, Response } from 'express';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import notesRouter from './routes/notes';
import {prisma} from './lib/prisma-client';
const app = express();
app.use(express.json());
const port = Number(process.env.PORT ?? 4000);


const s3 = new S3Client({ region: process.env.AWS_REGION });

app.get('/', async (_req: Request, res: Response) => {
  res.json({ message: 'Backend (TypeScript) running' });
});

// mount API routes
app.use('/', notesRouter);

app.get('/health', (_req, res) => res.send('ok'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
