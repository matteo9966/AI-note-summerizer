# Backend (TypeScript + Node)

This workspace is a minimal TypeScript Node project using:

- Express
- Prisma (SQLite)
- AWS S3 SDK (@aws-sdk/client-s3)

Quick commands (run from repository root):

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Environment variables are read from `.env` in the backend folder.

Packaging notes:

- This project is configured to be shipped together with `node_modules` instead of producing a bundled single file.
- To deploy, copy the project folder and its `node_modules/` directory to the target machine, or create an archive including `node_modules`.
- Example packaging (from repository root):

```bash
cd backend
npm install --production
cd ..
tar -czf backend-with-node-modules.tar.gz backend
```

If you'd like, I can add a small script to produce that archive automatically.
