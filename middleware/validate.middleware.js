import HTTP_STATUS from '../constants/httpStatus.js';

export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error)
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Validation failed',
      details: error.details.map(({ message }) => message),
    });

  req.body = value;
  next();
};
