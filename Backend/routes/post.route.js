import express from "express"
import { createPost, deletePost } from "../controller/post.controller.js"
import { verifyToken } from "../middlewear/verifytoken.js";

const postRoute = express.Router()

postRoute.post('/createPost', createPost);
postRoute.delete("/delete/:id", verifyToken, deletePost);

export default postRoute;