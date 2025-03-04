import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user-router.js";
import authRouter from "./routers/auth-router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRouter from "./routers/todo-router.js";
import {v2 as cloudinary} from "cloudinary";


dotenv.config();

const app = express();


app.use(
  cors({
    origin: "https://my-todo-app-72.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello Wolrd" });
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
