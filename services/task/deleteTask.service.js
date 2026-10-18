import mongoose from 'mongoose';
import HTTP_STATUS from '../../constants/httpStatus.js';
import { Task } from '../../models/task.model.js';

const deleteTask = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid task ID');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  return Task.findByIdAndDelete(id);
};

export default deleteTask;
