import HTTP_STATUS from '../../constants/httpStatus.js';
import updateTaskService from '../../services/task/updateTask.service.js';

const updateTask = async (req, res) => {
  const task = await updateTaskService(req.params.id, req.body);

  if (!task) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: 'Task not found' });
  }

  return res.json(task);
};

export default updateTask;
