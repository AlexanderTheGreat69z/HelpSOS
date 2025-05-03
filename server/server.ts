import express, {Request, Response, NextFunction, RequestHandler} from "express"
import session from "express-session"
import mongoose from "mongoose"

import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import todo_router from "./routes/ToDoRoute"
import auth_router from "./routes/AuthRoutes"

dotenv.config()

//-----------------------------------------------------------//

const app = express()
const PORT = process.env.PORT
const URI = process.env.MONGO_URI
const SECRET = process.env.SESSION_SECRET
//-----------------------------------------------------------//
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure  : false,
        sameSite: "lax",
        maxAge  : 100 * 60 * 60
    }
}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/service/todo", todo_router)
app.use("/auth", auth_router)

//-----------------------------------------------------------//

mongoose.set("strictQuery", true)
mongoose
    .connect(URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err))

//-----------------------------------------------------------//

app.get("/", (req, res) => {
    res.send("API is running...")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.path });
});