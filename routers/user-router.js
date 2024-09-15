import express from "express";
import { checkSession, deleteAll, deleteUser, getAllUsers, logout, refreshSession} from "../controllers/user-controller.js"
import { authMiddleWare } from "../Middlewares.js";


const router = express.Router();
router.use(authMiddleWare);
router.get('/',getAllUsers)
router.delete('/:id',deleteUser);
router.delete('/',deleteAll);
router.post('/logout',logout)
router.post('/check-session',checkSession);
router.post('/refresh-session',refreshSession);

export default router;