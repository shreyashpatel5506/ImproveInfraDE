import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config()

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

// Multer storage (temp file storage)
const storage = multer.diskStorage({});

export const upload = multer({ storage });

// Middleware: upload → cloudinary → attach publicId
export const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "posts",
        });

        // Save public_id for DB
        req.imagePublicId = result.public_id;

        // Delete local temp file
        fs.unlinkSync(req.file.path);

        next();

    } catch (error) {
        console.log("Cloudinary Error:", error);
        return res.status(500).json({ message: "Image upload failed" });
    }
};
