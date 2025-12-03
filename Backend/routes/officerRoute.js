import { login, signUP } from "../controller/officer.controller.js";
import express from 'express';

const authrouter = express.Router();

authrouter.use('/officerSignup', signUP)
authrouter.use('/oficerLogin', login)

export default authrouter;