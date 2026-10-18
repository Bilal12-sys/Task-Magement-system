import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/database.js';
import taskRouter from './routes/task.routes.js';
import aiTaskRouter from './routes/ai.routes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/error.middleware.js';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRouter);
app.use('/api/ai', aiTaskRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

const isRunningDirectly =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isRunningDirectly) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
  });
}

export default app;
