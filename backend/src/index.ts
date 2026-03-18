import express, { Request, Response } from 'express';
import notesRouter from './routes/notes';
import {prisma} from './lib/prisma-client';
import { initSwagger } from './lib/swagger';
import { healtContoller } from './controllers/healthController';

const app = express();
initSwagger(app);
app.use(express.json());
const port = Number(process.env.PORT ?? 4000);



app.get('/', async (_req: Request, res: Response) => {
  res.json({ message: 'Backend (TypeScript) running' });
});

// mount API routes
app.use('/', notesRouter);

app.get('/health',healtContoller);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
