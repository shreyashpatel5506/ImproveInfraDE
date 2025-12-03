import { login, signUP } from "../controller/officer.controller";
import express from express;
import Officer from "../models/officer.model";

const authrouter = express.router()

authrouter.use('/officerSignup', signUP)
authrouter.use('/oficerLogin', login)

export default authrouter;