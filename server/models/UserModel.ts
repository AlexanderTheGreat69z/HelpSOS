import mongoose, {Document, Schema} from "mongoose"
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

interface UserType extends Document {
    username:string
    email:string
    password:string
} 

const UserSchema:Schema<UserType> = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email   : { type: String, required: true, unique: true},
    password: { type: String, required: true},
});


const User = mongoose.model<UserType>("User", UserSchema)

const createAccount = async (req:Request, res:Response) => {
    try {
        const { username, email, password } = req.body

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Please fill in the required fields." })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newAcc = await User.create({ 
            username: username, 
            email: email,
            password: hashedPass
        })

        res.status(200).json({ message: "Created a to-do list successfully!", newAcc })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { createAccount }
export { User, UserType }