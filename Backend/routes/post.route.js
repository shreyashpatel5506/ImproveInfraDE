import express from "express";
import {
    createPost,
    getAllPosts,
    getSinglePost,
    addComment,
    getComments,
    likePost,
    changeStatus,
    deletePost
} from "../controller/post.controller.js";
import { verifyToken } from "../middlewear/verifytoken.js";

const router = express.Router();

// Public
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

// Auth required
router.post("/create", createPost);
router.post("/comment/:id", addComment);
router.get("/comments/:id", getComments);
router.patch("/status/:id", verifyToken, changeStatus);
router.patch("/like/:id", likePost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
