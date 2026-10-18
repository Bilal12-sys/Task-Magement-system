import { Task } from '../../models/task.model.js';

const createTask = (taskData) => Task.create(taskData);

export default createTask;
