class HttpErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let {
    statusCode,
    message,
  } = err;

  message = process.env.NODE_ENV === 'development' ? message : {};
  statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = {
  HttpErrorHandler,
  handleError,
};
