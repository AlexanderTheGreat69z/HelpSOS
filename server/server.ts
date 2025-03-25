import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI

app.use(express.json());
app.use(cors());

mongoose
    .connect(URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
