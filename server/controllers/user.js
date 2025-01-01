import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import User from "../model/user.js"


export const signin = async (req,res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            return res.status(404).json({ message: "User doesn't exist. "})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials. "})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "1h"})

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    //In google login, make your own token?

}

export const signup = async (req,res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exist. "})
        
        
        if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match. "})

        const hashedPassword = await bcrypt.hash(password, 12)

        console.log(firstName, lastName, email);

        const result = await User.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName})

        const token = jwt.sign({ email: result.email, id: result._id}, "test", {expiresIn: "1h"})

        res.status(200).json({ result, token }); //result: result (the same)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const sign = async (req,res) => {
    const result = req.body;
    const { email, sub } = req.body;
    try {

        const token = jwt.sign({ email: email, id: sub }, "test", {expiresIn: "1h"})

        res.status(200).json({ result, token }); //result: result (the same)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
//E11000 duplicate key error collection: Aero.users index: username_1 dup key: { username: null }"