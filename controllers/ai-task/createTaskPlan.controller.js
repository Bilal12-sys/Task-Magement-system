import HTTP_STATUS from '../../constants/httpStatus.js';
import createTaskPlanService from '../../services/ai-task/createTaskPlan.service.js';

const createTaskPlan = async (req, res) => {
  const plan = await createTaskPlanService(req.body.description);
  res.status(HTTP_STATUS.OK).json({ success: true, plan });
};

export default createTaskPlan;
