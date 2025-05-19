import axios from "axios";

const URL = "http://localhost:5000/service/todo"
export type Status = "ongoing" | "completed" | "dismissed"

const getToDo = async () => {
    try {
        const res = await axios.get(URL + "/get_todo");
        return res.data;
    } catch (err) {
        console.error("Error fetching data:", err);
        return null;
    }
}

const addToDo = async (todo_task: string) => {
    try {
        const res = await axios.post(URL + "/add_todo", { todo_task });
        return res.data;
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

const deleteToDo = async (id: string) => {
    try {
        await axios.delete(`${URL}/delete_todo/${id}`);
        console.log("ToDo deleted successfully");
    } catch (error) {
        console.error("Error deleting ToDo:", error);
    }
}

export { getToDo, addToDo, deleteToDo }
