import Joi from 'joi';

const taskFields = {
  title: Joi.string().trim().min(1),
  description: Joi.string().trim(),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
  dueDate: Joi.date().iso(),
};

export const createTaskSchema = Joi.object({
  ...taskFields,
  title: taskFields.title.required(),
});

export const updateTaskSchema = Joi.object(taskFields).min(1);
