import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

const fetchData = async () => {
    try {
        const response = await API.get("/");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export { fetchData }
