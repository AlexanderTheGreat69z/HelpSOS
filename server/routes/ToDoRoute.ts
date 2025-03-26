import express from "express";
import { createToDo, getToDos, updateToDo, deleteToDo } from "../models/ToDoModel";

const todo_router = express.Router()
todo_router.get("/get_todo", getToDos)
todo_router.post("/add_todo", createToDo)
todo_router.patch("/edit_todo/:id", updateToDo)
todo_router.delete("/delete_todo/:id", deleteToDo)

export default todo_router