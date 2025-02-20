import express from "express";
import {deleteAll, deleteUser, getAllUsers, home, logout} from "../controllers/user-controller.js"
// import { validator } from "../Middlewares.js";

const router = express.Router();
router.get('/home',home)
router.get('/',getAllUsers)
router.delete('/:id',deleteUser);
router.delete('/',deleteAll);
router.post('/logout',logout)

export default router;