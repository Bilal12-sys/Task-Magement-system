import HTTP_STATUS from '../constants/httpStatus.js';

export const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Route not found' });
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode =
    error.statusCode ||
    error.status ||
    (error.name === 'ValidationError' || error.name === 'CastError'
      ? HTTP_STATUS.BAD_REQUEST
      : HTTP_STATUS.INTERNAL_SERVER_ERROR);

  if (statusCode >= HTTP_STATUS.BAD_REQUEST && statusCode < 500) {
    return res.status(statusCode).json({ message: error.message });
  }

  if (
    statusCode === HTTP_STATUS.BAD_GATEWAY ||
    statusCode === HTTP_STATUS.SERVICE_UNAVAILABLE
  ) {
    return res.status(statusCode).json({ message: error.message });
  }

  console.error(error);
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};
