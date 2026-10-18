import { Router } from 'express';
import createTask from '../controllers/task/createTask.controller.js';
import deleteTask from '../controllers/task/deleteTask.controller.js';
import getTaskById from '../controllers/task/getTaskById.controller.js';
import getTasks from '../controllers/task/getTasks.controller.js';
import updateTask from '../controllers/task/updateTask.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validators/task.validation.js';

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', validateBody(createTaskSchema), createTask);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', validateBody(updateTaskSchema), updateTask);
taskRouter.patch('/:id', validateBody(updateTaskSchema), updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;
