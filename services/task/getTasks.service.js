import { Task } from '../../models/task.model.js';

const getTasks = () => Task.find().sort({ createdAt: -1 });

export default getTasks;
