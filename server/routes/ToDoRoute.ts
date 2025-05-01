import express from "express";
import { createToDo, getToDos, updateToDo, deleteToDo } from "../models/ToDoModel";

const todo_router = express.Router()
todo_router.get("/get_todo", <express.RequestHandler>getToDos)
todo_router.post("/add_todo", <express.RequestHandler>createToDo)
todo_router.patch("/edit_todo/:id", <express.RequestHandler>updateToDo)
todo_router.delete("/delete_todo/:id", <express.RequestHandler>deleteToDo)

export default todo_router