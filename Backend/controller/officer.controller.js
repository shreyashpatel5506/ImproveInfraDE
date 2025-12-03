import express from express;
import Officer from "../models/officer.model";

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
            message: "Officer created created",
            success: true,
            Officer: newOfficer,
        });
    } catch (error) {
        return res.status(500).json({ message: err.message });
        console.log("error fetching and officer not created ")
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const officer = await officer.findOne({ email })

        if (!officer) return res.status(400).json({ message: "User does not exist" });

        const validPassword = await bcrypt.compare(password, officer.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });

        generateToken(officer._id, res);
        return res.status(200).json({ message: "Login successful", success: true, officer });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}