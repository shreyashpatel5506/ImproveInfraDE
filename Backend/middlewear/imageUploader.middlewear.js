import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary config
cloudinary.config({
    cloud_name: "dj9l2gzor",
    api_key: "496374971342376",
    api_secret: "1VJw73m7TWprJQzXsHMCSCQ1ddc",
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
