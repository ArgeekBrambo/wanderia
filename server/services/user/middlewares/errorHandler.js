const errorHandlers = (error, req, res, next) => {
  // by default all error response from backend will have error code 500, unless it is replaced by the error messages listed below
  let code = 500;
  let msg = error.message;
  switch (error.name) {
    // error from libraries (jsonwebtoken, sequelize)
    case "JsonWebTokenError":
      code = 401;
      msg = "Invalid token";
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = error.errors[0].message;
      break;
    case "SequelizeValidationError":
      code = 400;
      msg = error.errors[0].message;
      break;
    // custom error from backend
    case "MissingEmail":
      code = 400;
      msg = "Email is required";
      break;
    case "MissingPassword":
      code = 400;
      msg = "Password is Required";
      break;
    case "MissingOrInvalidJWT":
      (code = 401), (msg = "Invalid token");
      break;
    case "InvalidCredentials":
      console.log("masuk");
      code = 401;
      msg = "Invalid email/password";
      break;
    case "Unauthenticated":
      code = 401;
      msg = "Unauthenticated";
      break;
    case "NotFound":
      code = 404;
      msg = "Not found";
      break;
    default:
      break;
  }

  const errorResponse = {
    code,
    // ...error // this is for debugging
  };

  errorResponse.message = msg;

  res.status(code).json(errorResponse);
};

module.exports = errorHandlers;
