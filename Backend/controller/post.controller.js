import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";
import Busboy from "busboy";   // built-in by Google + no config needed
import dotenv from "dotenv"

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPost = async (req, res) => {
    try {
        const bb = Busboy({ headers: req.headers });

        let formData = {
            title: "",
            description: "",
            category: "",
            department: "",
        };

        let uploadPromise;

        bb.on("field", (name, value) => {
            formData[name] = value;
        });

        bb.on("file", (name, file, info) => {
            const cloudUpload = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "posts" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                file.pipe(stream);
            });
            uploadPromise = cloudUpload;
        });

        bb.on("finish", async () => {
            if (!uploadPromise)
                return res.status(400).json({ message: "Image missing" });

            const uploaded = await uploadPromise;

            const newPost = await Post.create({
                ...formData,
                imageUrl: uploaded.secure_url,
                imagePublicId: uploaded.public_id,
            });

            res.status(201).json({
                message: "Post created successfully",
                post: newPost,
            });
        });

        req.pipe(bb);
    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const officerId = req.officer.id; // from token

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Only owner can delete
        if (post.createdBy.toString() !== officerId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Delete cloudinary image
        if (post.imagePublicId) {
            await cloudinary.uploader.destroy(post.imagePublicId);
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Delete Post Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
