const boomErrorHandler = (error, req, res, next) => {
  if ( error.isBoom ) {
    const { output } = error;
    const { statusCode, error: err, message } = output.payload;
    res.status(statusCode).json({
      ok: false,
      errors: [
        {
          value: err,
          statusCode,
          msg: message,
        },
      ],
    });
  } else {
    next(error);
  }
};

const jsonErrorHandler = (error, req, res, next) => {
  if ( error?.type === 'entity.parse.failed' ) {
    res.status(400).json({
      ok: false,
      errors: [
        {
          value: 'Bad Request',
          statusCode: 400,
          msg: 'Unexpected string in JSON',
        },
      ],
    });
  } else {
    next(error);
  }
};

const errorHandler = (error, req, res, next) => {
  console.error({
    error: error.message,
    stack: error.stack
  });
  res.status(500).json({
    ok: false,
    errors: [
      {
        value: 'Internal Server Error',
        msg: 'Talk to the administrator',
        statusCode: 500,
      },
    ],
  });
};

module.exports = {
  boomErrorHandler,
  errorHandler,
  jsonErrorHandler,
};
