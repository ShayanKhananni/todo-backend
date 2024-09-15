import express from "express";
import { signin, signup, signinGoogle } from "../controllers/auth-controller.js";

const authRouter = express.Router();



authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.post('/google/signin',signinGoogle)

export default authRouter;

