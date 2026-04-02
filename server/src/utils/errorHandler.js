/**
 * Error Response Handler
 */

export const handleError = (res, error, statusCode = 500) => {
  console.error("Error:", error.message);
  res.status(statusCode).json({
    success: false,
    message: error.message || "An error occurred",
    error: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export const handleSuccess = (
  res,
  data,
  message = "Success",
  statusCode = 200,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
