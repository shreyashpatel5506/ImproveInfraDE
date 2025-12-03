import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPost = async (req, res) => {
    try {
        const { title, description, category, department, image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        // 🔥 Cloudinary direct Base64 upload
        const uploaded = await cloudinary.uploader.upload(image, {
            folder: "posts",
        });

        // save in DB
        const newPost = await Post.create({
            title,
            description,
            category,
            department,
            imageUrl: uploaded.secure_url,
            imagePublicId: uploaded.public_id,
        });

        return res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });

    } catch (error) {
        console.error("Create Post Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
