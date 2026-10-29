import express from 'express';

import createTask from '../controllers/task/createTask.controller.js';
import deleteTask from '../controllers/task/deleteTask.controller.js';
import getTaskById from '../controllers/task/getTaskById.controller.js';
import getTasks from '../controllers/task/getTasks.controller.js';
import updateTask from '../controllers/task/updateTask.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import {createTaskSchema,updateTaskSchema,} from '../validators/task.validation.js'

const Task_Router = express.Router()

Task_Router.get('/tasks', getTasks);
Task_Router.post('/tasks', validateBody(createTaskSchema), createTask);
Task_Router.get('/task/:id', getTaskById);
Task_Router.put('/task/:id', validateBody(updateTaskSchema), updateTask);
Task_Router.patch('/task/:id', validateBody(updateTaskSchema), updateTask);
Task_Router.delete('/task/:id', deleteTask);

// Keep the original singular routes for existing consumers while supporting the
// conventional plural resource URL used by the frontend and API test suite.
Task_Router.get('/tasks/:id', getTaskById);
Task_Router.put('/tasks/:id', validateBody(updateTaskSchema), updateTask);
Task_Router.patch('/tasks/:id', validateBody(updateTaskSchema), updateTask);
Task_Router.delete('/tasks/:id', deleteTask);

export default Task_Router
