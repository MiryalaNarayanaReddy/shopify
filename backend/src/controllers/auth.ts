import { User } from "../models/User";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req: express.Request, res: express.Response) => {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            role
        });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}


export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        //@ts-ignore
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
            // @ts-ignore
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}