// All importes
import { configDotenv } from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/database.js';
import Task_Router from "./routes/task.routes.js"
import Ai_Router from "./routes/ai.routes.js"
import {errorHandler, notFoundHandler,} from './middleware/error.middleware.js';
// Connect env
configDotenv({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') });
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/" , (req , res) => {
 res.status(201).send({status: 201 , message: "Ai Task management System Backend" , success: true})
})


// All Routers
app.use('/api/', Task_Router);
app.use('/api/ai', Ai_Router);

app.use(errorHandler);
app.use(notFoundHandler);



const startServer = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  startServer();
}

export default app;
