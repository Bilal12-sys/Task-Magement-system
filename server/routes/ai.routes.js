import express from 'express';
import createTaskPlan from '../controllers/ai-task/createTaskPlan.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { taskPlanSchema } from '../validators/ai.validation.js';

const Ai_Router = express.Router();

Ai_Router.post('/plan-task', validateBody(taskPlanSchema), createTaskPlan);

export default Ai_Router;
