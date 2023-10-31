export function errorHandler(statusCode, message) {
  const error = new Error();
  console.log("error-utils: ", error);
  error.statusCode = statusCode;
  error.message = message;
  return error;
}
