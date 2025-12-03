import { login, signUP } from "../controller/officer.controller.js";
import express from 'express';

const authrouter = express.Router();

authrouter.use('/officerSignup', signUP)
authrouter.use('/officerLogin', login)

export default authrouter;