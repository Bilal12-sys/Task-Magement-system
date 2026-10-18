import mongoose from 'mongoose';
import HTTP_STATUS from '../../constants/httpStatus.js';
import { Task } from '../../models/task.model.js';

const updateTask = (id, taskData) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid task ID');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  return Task.findByIdAndUpdate(id, taskData, {
    new: true,
    runValidators: true,
  });
};

export default updateTask;
