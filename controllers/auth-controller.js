import User from "../models/user-model.js";
import bycrypt from "bcryptjs";
import { customError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bycrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const saved = await newUser.save();
    if (!saved) return res.status(409).json({ message: "user already exist" });
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      if (err.message.includes("email")) {
        next(customError(409, "Email already exist"));
      } else {
        next(customError(409, "Username already exist"));
      }
    }
    return next(customError(500, "Internal server error"));
  }
};

export const signinGoogle = async (req, res, next) => {
  const { displayName, email, photoURL } = req.body;
  const validUser = await User.findOne({ email });
  try {
    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password, createdAt, updatedAt, ...user } = validUser._doc;

      res
        .cookie("auth_token", token, {
          // httpOnly: true,
          // sameSite: "None",
          // secure: true,
          // expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRY)),
          expires: 500000,
        })
        .status(200)
        .json(user, token);
    } else {
      const password = bycrypt.hashSync(
        Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8)
      );
      const username =
        displayName.split(" ").join("_").toLowerCase() +
        Math.floor(Math.random() * 10000 + 1);
      const newUser = new User({ username, email, password, photoURL });
      await newUser.save();
      const {
        password: hashedPassword,
        createdAt,
        updatedAt,
        ...user
      } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res
        .cookie("auth_token", token, {
          // httpOnly: true,
          // sameSite: "None",
          // secure: true,
          expires: 500000,
        })
        .status(200)
        .json(user);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(customError(404, "User not Found"));
    const validPassword = bycrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(customError(404, "wrong creadentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const {
      password: hashedPassword,
      createdAt,
      updatedAt,
      ...user
    } = validUser._doc;
    res
      .cookie("auth_token", token, {
        // httpOnly: true,
        // sameSite: "None",
        // secure: true,
        // expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRY)),
        expires: 500000,
      })
      .json(user, token);
  } catch (err) {
    next(err);
  }
};
