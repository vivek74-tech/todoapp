import express from "express"
import { createTodo } from "../controller/todo.controller.js";
import { getAllTodo } from "../controller/todo.controller.js";
import { updateTodo } from "../controller/todo.controller.js";
import {deleteTodo} from "../controller/todo.controller.js";
import isAuthenticated from "../db/middleware/isAuthenticated.js";
const router = express.Router();



router.route("/").post(isAuthenticated,createTodo)

router.route("/").get(getAllTodo)

router.route("/:todoId").put(isAuthenticated,updateTodo)

router.route("/:todoId").delete(isAuthenticated,deleteTodo)


export default router