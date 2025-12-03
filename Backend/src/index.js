import dotenv from "dotenv";
// CRITICAL FIX: dotenv.config() MUST run first to load MONGODB_URI
dotenv.config();

import express from "express";
import connectMongo from "../db.js";
import authrouter from "../routes/officerRoute.js";

const app = express();
const port = 8080;

// Middleware setup
// FIX: express.json needs to be called as a function
app.use(express.json());

// Start the database connection immediately
connectMongo();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Backend');
});
//authroutes
app.use('/v1/auth', authrouter)
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});