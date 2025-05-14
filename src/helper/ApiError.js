/*class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
  
    toJSON() {
      return {
        statusCode: this.statusCode,
        message: this.message
      };
    }
  }
  
  module.exports = ApiError;*/
  
  // Example usage:
  // throw new ApiError(404, "Resource not found");
  //throw Error("")