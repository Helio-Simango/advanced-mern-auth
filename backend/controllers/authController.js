import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import { User } from '../model/User.js'
import { generateVerificationToken } from '../utils/generateVerificationToken.js'
import { generateTokenAndSetCoookie } from '../utils/generateTokenAndSetCoookie.js'
import { 
    sendPasswordResetEmail, 
    sendVerificationEmail, 
    sendWelcomeEmail,
    sendResetSuccessEmail 
} from '../mailtrap/emails.js';


export const  signup = async (req, res) =>{
    try {
        const { email, password, name } = req.body

        if(!email || !password || !name){
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({sucess: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = generateVerificationToken()
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24hours
        })

        await user.save();

        //jwt
        generateTokenAndSetCoookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken)

        return res.status(201).json({
            sucess: true,
            message: "User created sucessfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        return res.status(400).json({sucess: false, message: error.message})
    }
};

export const verifyEmail = async (req, res) =>{
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now() }
        })

        if(!user){
            return res.status(400).json({sucess: false, message: "Inavlid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        return res.status(201).json({
            sucess: true,
            message: "Email verified sucessfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
        
    } catch (error) {
        return res.status(400).json({sucess: false, message: error.message})
    }
}

export const login =  async (req, res) =>{
    const { email , password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({sucess: false, message: "Invalid credencials"});
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).json({sucess: false, message: "Invalid credencials"});
        }

        generateTokenAndSetCoookie(res, user._id);

        user.lastlogin = new Date();
        await user.save();

        return res.status(201).json({
            sucess: true,
            message: "logged in sucessfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.log("Error in login", error)
       return res.status(400).json({sucess: false, message: error.message}) 
    } 
}

export const logout = (req, res) =>{
    res.clearCookie("token");
    res.status(200).json({sucess: true, message: "logged out sucessfully"})
}

export const forgotpassword =  async (req, res) =>{
    const { email } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({sucess: false, message: "User not found"})
        }

        //genarate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExperesAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour 

        user.resetPasswordToken = resetToken;
        user.resetPasswordExperesAt = resetPasswordExperesAt;

        await user.save();

        //send email
        await sendPasswordResetEmail(
            user.email,
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`
        );

        return res.status(200).json({sucess: true, message: "Password reset link sent to your email"});
    } catch (error) {
        console.log("Error in forgotPassword", error)
        return res.status(400).json({sucess: false, message: error.message})
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExperesAt: {$gt: Date.now() },
        })

        if(!user){
            return res.status(400).json({sucess: false, message: "Invalid or expired reset token"})
        }

        //update password
        const hasshedPassword = await bcrypt.hash(password, 10);

        user.password = hasshedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExperesAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        return res.status(200).json({sucess: true, message: "Password reset sucessfully"});
    } catch (error) {
        console.log("Error in resetPassword", error)
        return res.status(400).json({sucess: false, message: error.message})
    }
}

export const checkAuth = async (req, res) =>{
    try {
        const user = await User.findById( req.userId );
        if(!user){
            return res.status(400).json({sucess: false, message: "User not found"});
        }

        return res.status(200).json({
            sucess: true,
            user:{
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.log("Error in checkAuth", error);
        return res.status(400).json({sucess: false, message: error.message}); 
    }
}