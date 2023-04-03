class AppError extends Error {
    constructor(message, statusCode) {
      super(message); // calls the constructor of parent class
      this.statusCode = statusCode;
      this.status = `${this.statusCode}`.startsWith("4") ? "Fail" : "Error";
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  module.exports = AppError;