import HTTP_STATUS from '../../constants/httpStatus.js';
import getTaskByIdService from '../../services/task/getTaskById.service.js';

const getTaskById = async (req, res) => {
  const task = await getTaskByIdService(req.params.id);

  if (!task) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: 'Task not found' });
  }

  return res.json(task);
};

export default getTaskById;
