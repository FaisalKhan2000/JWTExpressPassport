import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  // status code
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // message
  const message = error.message || "something went wrong, try again later";

  res.status(statusCode).json({ msg: message });
};
