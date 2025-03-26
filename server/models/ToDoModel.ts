import mongoose from "mongoose"

const ToDoSchema = new mongoose.Schema({
    todo_task: { type: String, required: true},
    todo_status: { type: String, default: "ongoing"},
});

const ToDoModel = mongoose.model("ToDo", ToDoSchema)

const createToDo = async(req, res) => {
    try {
        const { todo_task } = req.body

        if (!todo_task) {
            return res.status(400).json({ message: "Please fill in the required fields." })
        }

        const newTodo = await ToDoModel.create({
            todo_task,
            todo_status : "ongoing"
        });

        res.status(200).json({ message: "Created a to-do list successfully!", newTodo })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getToDos = async (req, res) => {
    try {
        const todos = await ToDoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateToDo = async (req, res) => {
    try {
        const { id } = req.params;
        const { todo_task, todo_status } = req.body;

        const updateData = {
            todo_task,
            todo_status,
        }
        const updatedTodo = await ToDoModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "To-do not found." });
        }

        res.status(200).json({ message: "To-do updated successfully!", updatedTodo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteToDo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await ToDoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "To-do not found." });
        }

        res.status(200).json({ message: "To-do deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { createToDo, getToDos, updateToDo, deleteToDo }