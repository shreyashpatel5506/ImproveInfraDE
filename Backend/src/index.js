import dotenv from "dotenv";
// CRITICAL FIX: dotenv.config() MUST run first to load MONGODB_URI
dotenv.config();

import express from "express";
import connectMongo from "../db.js";
import authrouter from "../routes/officerRoute.js";
import postRoute from "../routes/post.route.js";


const app = express();
const port = 8080;
app.use(express.json({ limit: "50mb" }));   // important for base64 images
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Middleware setup
// FIX: express.json needs to be called as a function

// Start the database connection immediately
connectMongo();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Backend');
});
//authroutes
app.use('/v1/auth', authrouter)
//post route 
app.use('/v1/post', postRoute);
// Start the server


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});