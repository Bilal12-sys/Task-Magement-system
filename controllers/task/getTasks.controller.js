import getTasksService from '../../services/task/getTasks.service.js';

const getTasks = async (req, res) => {
  const tasks = await getTasksService();
  res.json(tasks);
};

export default getTasks;
