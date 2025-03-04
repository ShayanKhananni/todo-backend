import express from "express";
import {deleteUser, logout, updateProfile} from "../controllers/user-controller.js"
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const userRouter = express.Router();
// userRouter.use(validateAccessToken);
userRouter.delete('/:id',deleteUser);
userRouter.post('/logout',logout)
userRouter.put('/updateProfile',upload.single('image'),updateProfile)

export default userRouter;