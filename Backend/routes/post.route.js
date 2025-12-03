import express from "express"
import { createPost } from "../controller/post.controller"

const postRoute = express.Router()

postRoute.post('/createPost', createPost);

export default postRoute;