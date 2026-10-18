import HTTP_STATUS from '../../constants/httpStatus.js';
import deleteTaskService from '../../services/task/deleteTask.service.js';

const deleteTask = async (req, res) => {
  const task = await deleteTaskService(req.params.id);

  if (!task) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: 'Task not found' });
  }

  return res.status(HTTP_STATUS.NO_CONTENT).end();
};

export default deleteTask;
