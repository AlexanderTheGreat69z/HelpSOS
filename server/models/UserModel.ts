import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import { Request, Response } from "express";


const UserSchema = new mongoose.Schema({
    user_profile: {
        username    : { type: String, required: true, unique: true},
        email       : { type: String, required: true, unique: true},
        password    : { type: String, required: true},
    },
    verification: {
        OTP_code    : String,
        code_expire : Date,
        isVerified  : { type: Boolean, default: false }
    },
});


const User = mongoose.model("User", UserSchema)

const createAccount = async (req:Request, res:Response) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Please fill in the required fields." })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newAcc = await User.create({ 
            user_profile: {
                username: username,
                email: email,
                password: hashedPass
            }
        })

        res.status(200).json({ message: "Created a to-do list successfully!", newAcc })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { createAccount }
export { User }