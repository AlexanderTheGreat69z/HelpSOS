import axios from "axios";

const URL = "http://localhost:5000/auth"

const registerUser = async (username:string, email:string, password:string) => {
    try {
        const res = await axios.post(URL + "/register", { username, email, password }, { withCredentials: true })
        return { success: true, data: res.data };
    } catch (err) {
        console.error("Oops, There was a problem signing you in ", err);
        return { success: false, data: err };
    }
}

const userLogin = async (identifier:string, password:string) => {
    try {
        const res = await axios.post(URL + "/login", { identifier, password }, { withCredentials: true })
        return { success: true, data: res.data };
    } catch (err) {
        console.error("Login ERROR", err);
        return { success: false, data: err };
    }
}

const userLogout = async () => {
    try {
        const res = await axios.post(URL + "/logout", { withCredentials: true })
        return { success: true, data: res.data };
    } catch (err) {
        console.error("Logout ERROR", err);
        return { success: false, data: err };
    }
}

const getUserData = async () => {
    try {
        const res = await axios.get(URL + "/get_data", { withCredentials: true });
        return res.data
    } catch (err) {
        console.error("Error fetching data:", err);
        return null
    }
}

export { registerUser, userLogin, userLogout, getUserData }