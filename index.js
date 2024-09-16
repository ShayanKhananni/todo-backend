import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user-router.js";
import authRouter from "./routers/auth-router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRouter from "./routers/todo-router.js";
import testRouter from "./routers/testrouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/test", testRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server Started on port 3000");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

