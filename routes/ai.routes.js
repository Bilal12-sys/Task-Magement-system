import { Router } from 'express';
import createTaskPlan from '../controllers/ai-task/createTaskPlan.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { taskPlanSchema } from '../validators/ai.validation.js';

const aiTaskRouter = Router();

aiTaskRouter.post('/plan-task', validateBody(taskPlanSchema), createTaskPlan);

export default aiTaskRouter;
