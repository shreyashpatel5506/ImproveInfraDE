import { login, signUP } from "../controller/officer.controller";
import express from express;
import Officer from "../models/officer.model";

const router = express.router()

router.use('/officerSignup', signUP)
router.use('/oficerLogin', login)