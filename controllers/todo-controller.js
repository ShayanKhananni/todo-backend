import { TodoModel } from "../models/todo-model.js";

export const addTodo = async (req, res, next) => {
  const { user_id, title, description, date, time, priority } = req.body;
  try {
    const todo = new TodoModel({
      user_id,
      title,
      description,
      date,
      time,
      priority,
    });
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    if(err.message.includes('E11000') && err.message.includes('title'))
    {
      res.status(500).json({message:'Todo already exist with same title'})
    }
    next(err);   
  }
};

















export const getTodos = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todos = await TodoModel.find({ user_id: id });

    if (todos === []) {
      res.status(404).json({ message: "No Todos exist" });
    }
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};



export const updateTodo = async (req, res, next) => {
  const { _id, ...updates } = req.body;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      res.status(404).json({ message: "Todo Not Found" });
    }

    res.status(200).json({ message: "Todo Updated Successfully", updatedTodo });
  } catch (err) {
    console.log(err);
    next(err);
  }
};





export const deleteTodo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      res.status(404).json({ message: "Todo Not Found" });
    }

    res.status(200).json({ message: "Todo Deleted Successfully", deletedTodo });
  } catch (err) {
    next(err);
  }
};












