import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if (existingUser) {
            return res.status(400).json({message: "Email already in use"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword
        });

        //tao customer
        await Customer.create({
            user_id: newUser._id
        });

        
        res.status(201).json({message: "User registered successfully ", userId: newUser._id});
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({message: "Server error"});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body; 
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({message: "Login successful", token, userId: user._id, name: user.name});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message: "Server error"});
    }
};

export {registerUser, loginUser};