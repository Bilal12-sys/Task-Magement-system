import Joi from 'joi';

export const taskPlanSchema = Joi.object({
  description: Joi.string().trim().min(1).required(),
});
