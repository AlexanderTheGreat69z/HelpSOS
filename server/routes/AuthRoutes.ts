import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { createAccount, User, UserType } from "../models/UserModel"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const auth_router = Router()

const isAuthenticated:RequestHandler = (req:Request, res:Response, next:NextFunction) => {
    if (req.session.userId) return next();
    return void res.status(401).json({ message: 'Unauthorized' });
};7

auth_router.get("/dashboard", isAuthenticated, async (req:Request, res:Response) => {
    const user = await User.findById(req.session.userId).lean()
    res.json({ message: `Welcome, ${user?.username}` });
})

auth_router.post("/login", <RequestHandler>(async (req:Request, res:Response) => {
    const { identifier, password } = req.body;
    const user = await User.findOne({ username: identifier }) ?? await User.findOne({ email: identifier });
    console.log(user)
    if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.userId = (user._id as mongoose.Types.ObjectId).toString()
    res.json({ message: 'Logged in!' });
}))

auth_router.post("/logout", (req:Request, res:Response) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.json({ message: 'Logged out' });
    });
})

auth_router.post("/register", <RequestHandler> createAccount)

export default auth_router