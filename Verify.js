import jwt from "jsonwebtoken";
export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(ErrorMessage(401, "You are not authenticated!"));
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(ErrorMessage(403, "Token is not valid!"));
      req.user = user;
      next()
    });
  };