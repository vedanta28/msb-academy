import errorlog from '../utils/errorLog';
const AppError = require("../utils/appError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicatedFields = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid Token. Please Login Again", 401);

const handleJWTExpireError = (err) =>
  new AppError("Your Token has Expired. Please Login Again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // These are Operational Errors
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // These are Programming Errors
    errorlog(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.name = err.name || "Error";
    error.message = err.message || "Unexpected Error";

    if (error.name === "CastError") error = handleCastError(error);

    if (error.code === 11000) error = handleDuplicatedFields(error);

    if (error.name === "ValidationError") error = handleValidationError(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError(error);

    if (error.name === "TokenExpiredError") error = handleJWTExpireError(error);

    sendErrorProd(error, res);
  }
};