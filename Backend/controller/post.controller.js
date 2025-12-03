import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";

// === CREATE POST ===========================================================
export const createPost = async (req, res) => {
    try {
        const { title, description, category, department, image } = req.body;

        if (!image) return res.status(400).json({ message: "Image is required" });

        const uploaded = await cloudinary.uploader.upload(image, {
            folder: "posts",
        });

        const newPost = await Post.create({
            title,
            description,
            category,
            department,
            imageUrl: uploaded.secure_url,
            imagePublicId: uploaded.public_id,
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

// === GET ALL POSTS =========================================================
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error("Get Posts Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// === GET SINGLE POST + INCREASE VIEWS =====================================
export const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.views += 1;
        await post.save();

        res.json(post);
    } catch (error) {
        console.error("Get Single Post Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// === ADD COMMENT ===========================================================
export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push({ text });
        post.commentsCount = post.comments.length;

        await post.save();

        res.json({
            message: "Comment added",
            comments: post.comments,
            commentsCount: post.commentsCount,
        });

    } catch (error) {
        console.error("Add Comment Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// === GET COMMENTS ==========================================================
export const getComments = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id).select("comments commentsCount");
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json({
            comments: post.comments,
            commentsCount: post.commentsCount,
        });

    } catch (error) {
        console.error("Get Comments Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// === LIKE POST =============================================================
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likesCount += 1;
        await post.save();

        res.json({ likesCount: post.likesCount });

    } catch (error) {
        console.error("Like Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// === CHANGE STATUS =========================================================
export const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const valid = ["Pending", "In Progress", "Resolved"];
        if (!valid.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updated = await Post.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Post not found" });

        res.json({
            message: "Status updated",
            post: updated,
        });

    } catch (error) {
        console.error("Change Status Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// === DELETE POST + DELETE CLOUDINARY IMAGE ================================
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // delete image from Cloudinary
        await cloudinary.uploader.destroy(post.imagePublicId);

        await Post.findByIdAndDelete(id);

        res.json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
