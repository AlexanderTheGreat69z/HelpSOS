import axios from "axios";

const URL = "http://localhost:5000"
export type Status = "ongoing" | "completed" | "dismissed"

const getToDo = async () => {
    try {
        const res = await axios.get(URL + "/service/todo/get_todo");
        return res.data;
    } catch (err) {
        console.error("Error fetching data:", err);
        return null;
    }
}

const addToDo = async (todo_task: string) => {
    try {
        const res = await axios.post(URL + "/service/todo/add_todo", { todo_task });
        return res.data;
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

const deleteToDo = async (id: string) => {
    try {
        await axios.delete(`${URL}/service/todo/delete_todo/${id}`);
        console.log("ToDo deleted successfully");
    } catch (error) {
        console.error("Error deleting ToDo:", error);
    }
}

const registerUser = async (username:string, email:string, password:string) => {
    try {
        const res = await axios.post(URL + "/auth/register", { username, email, password })
        return res.data;
    } catch (err) {
        console.error("Oops, There was a problem signing you in ", err);
    }
}

const userLogin = async (identifier:string, password:string) => {
    try {
        const res = await axios.post(URL + "/auth/login", { identifier, password })
        return res.data;
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

export { registerUser, userLogin }
export { getToDo, addToDo, deleteToDo }
