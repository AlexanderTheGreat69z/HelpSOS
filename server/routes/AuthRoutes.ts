import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { createAccount, User, UserType } from "../models/UserModel"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const auth_router = Router()

const isAuthenticated:RequestHandler = (req:Request, res:Response, next:NextFunction) => {
    if (req.session.userId) {
        return next();
    } else {
        return void res.status(401);
    }
}

auth_router.get("/get_data", isAuthenticated, async (req:Request, res:Response) => {
    const user = await User.findById(req.session.userId).lean()
    res.status(200).json(user);
})

auth_router.post("/login", <RequestHandler>(async (req:Request, res:Response) => {
    const { identifier, password } = req.body;
    const user = await User.findOne({ username: identifier }) ?? await User.findOne({ email: identifier });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.userId = (user._id as mongoose.Types.ObjectId).toString()
    req.session.save(err => {
        if (err) return res.status(500).json({ message: "Session save failed" });
        res.json({ message: "Logged in!" });
        console.log(req.session)
    });
}))
    

auth_router.post("/logout", (req:Request, res:Response) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid')
        res.json({ message: 'Logged out' })
    });
    console.log(req.session)
})

auth_router.post("/register", <RequestHandler> createAccount)

export default auth_router