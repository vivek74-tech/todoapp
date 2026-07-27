import { Todo } from "../models/todo.model.js";
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !description) {
      return (
        res.status(403).json({
          success: false,
          message: "All fields are required"
        })
      )
    }
    const todo = await Todo.create({
      title,
      description
    });

    if (todo) {
      return res.status(201).json({
        success: true,
        message: `todo created ${todo.title}`
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const getAllTodo = async (req, res) => {
  try {

    const todo = await Todo.find();

    console.log(todo)

    if (todo) {
      return (res.status(200).json({
        success: true,
        todo: todo.length == 0 ? [] : todo
      }))
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateTodo = async (req, res) => {
  try {
    //  console.log(req);
    const todoId = req.params.todoId;
    const { title } = req.body
    const todo = await Todo.findOneAndUpdate(todoId, { title }, { new: true });
    // await todo.save();
    console.log(todo)
    if (todo) {
      return (res.status(200).json({
        success: true,
        todo,
        message: "update title"

      }))

    }


  } catch (error) {
    console.log(error)
  }
}

export const deleteTodo = async (req, res) => {

  try {

    const todoId = req.params.todoId;

    const todo = await Todo.findOneAndDelete(todoId);
    return (res.status(200).json({
      success: true,
      message: "deleted by id",
      todo

    }))
    console.log(todo);
  } catch (error) {
    console.log(error);
  }


}