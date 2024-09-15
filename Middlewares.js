import jwt from "jsonwebtoken";
import { customError } from "./utils/error.js";

export const authMiddleWare = (req,res,next) =>
{
  const token = req.cookies.auth_token;
  if(!token)
  {
    next(customError(404,'Access Denied no token Provided'));
  }
  jwt.verify(token,process.env.JWT_SECRET,(err)=>
  {
    if(err)
    {
    next(customError(401,'Un-Authorize Access'));
    }
  })
  next();
}