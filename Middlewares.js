import jwt from "jsonwebtoken";
import { customError } from "./utils/utils.js";

export const validateAccessToken = (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return next(customError(404, "Access Token not provided"));
  }

  jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("access_token");
      return next(customError(401, "Invalid Access Token"));
    }
    next();
  });
};

export const refreshAccessToken = (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    return next(customError(401, "No Refresh Token Provided!"));
  }

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("Invalid Refresh Token");
        res.clearCookie("refresh_token");
        return next(customError(401, "Invalid Refresh Token"));
      }

      const new_access_token = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.cookie("access_token", new_access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
      });

      return res
        .status(200)
        .json({
          message: "Access Token Refreshed!",
          access_token: new_access_token,
        });
    }
  );
};
