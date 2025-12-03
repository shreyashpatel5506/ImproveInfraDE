import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!req.imagePublicId) {
            return res.status(400).json({ message: "Image not uploaded" });
        }

        const newPost = await Post.create({
            title,
            description,
            category,
            imagePublicId: req.imagePublicId,
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });

    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
