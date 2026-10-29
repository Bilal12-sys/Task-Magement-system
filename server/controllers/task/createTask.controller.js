import HTTP_STATUS from '../../constants/httpStatus.js';
import createTaskService from '../../services/task/createTask.service.js';

const createTask = async (req, res) => {
  const task = await createTaskService(req.body);
  res.status(HTTP_STATUS.CREATED).json(task);
};

export default createTask;
