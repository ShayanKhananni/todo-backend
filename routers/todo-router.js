import express from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo-controller.js"; 
import { validateAccessToken } from "../Middlewares.js";
const todoRouter = express.Router()
todoRouter.use(validateAccessToken);
todoRouter.post('/add-todo',addTodo);
todoRouter.get('/get-todo/:id',getTodos);
todoRouter.put('/update-todo',updateTodo);
todoRouter.delete('/delete-todo/:id',deleteTodo);

export default todoRouter;