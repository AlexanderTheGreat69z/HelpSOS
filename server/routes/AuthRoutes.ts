import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { createAccount, User } from "../models/UserModel"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { generateOTP, sendOTP } from "../controllers/EmailOTP";

const auth_router = Router()

const isAuthenticated:RequestHandler = (req:Request, res:Response, next:NextFunction) => {
    if (req.session.userId) {
        return next();
    } else {
        return void res.status(401);
    }
}

auth_router.get("/get-data", isAuthenticated, async (req:Request, res:Response) => {
    const user = await User.findById(req.session.userId).lean()
    res.status(200).json(user);
})

auth_router.post("/register", <RequestHandler> createAccount)

auth_router.post("/login", <RequestHandler>(async (req:Request, res:Response) => {
    const { identifier, password } = req.body;
    const user = await User.findOne({
        $or: [
            {"user_profile.username": identifier},
            {"user_profile.email" : identifier}
        ]
    })

    if (!user || !bcrypt.compareSync(password, user.user_profile!.password)) {
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

auth_router.post('/send-otp', <RequestHandler>(async (req:Request, res:Response) => {
    const { email } = req.body;
    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await User.findOneAndUpdate(
        { 
            "user_profile.email" : email
        },
        { 
            $set: { 
                "verification.OTP_code" : otp,
                "verification.code_expire" : expires,
            }
        },
        { 
            new: true 
        }
    );

    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to your email' });
}))

auth_router.post('/verify-otp', <RequestHandler>(async (req:Request, res:Response) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (user && user.verification) {

        if (user.verification.OTP_code !== otp || user.verification.code_expire! < new Date()){
            res.status(400).json({ message: "Code invalid or expired" })
        }
        else {
            
            user.verification.isVerified = true;
            user.verification.OTP_code = undefined;
            user.verification.code_expire = undefined;
            await user.save();

            res.json({ message: 'Email verified successfully' });
        }
    }
    else {
        res.status(500).json({ message: "OTP not set!" })
    }
}))

export default auth_router