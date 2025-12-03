import express from 'express';
import Officer from "../models/officer.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const env = "development"
const jwtSecret = "ImproveInfra"

const generateToken = (officerId, res) => {
    const token = jwt.sign({ officerId }, jwtSecret, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: env !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export const signUP = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingOfiicer = await Officer.findOne({ email });
        if (existingOfiicer) return res.status(400).json({ message: "Officer  already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const newOfficer = new Officer({ email, password: hashPassword });
        await newOfficer.save();
        generateToken(newOfficer._id, res);

        return res.status(201).json({
            message: "Officer created ",
            success: true,
            Officer: newOfficer,
        });
    } catch (error) {
        console.log("error fetching and officer not created ")
        return res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use the Officer model
        const officerData = await Officer.findOne({ email });

        if (!officerData) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(password, officerData.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token
        generateToken(officerData._id, res);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            officer: officerData
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
