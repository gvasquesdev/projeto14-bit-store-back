import express from "express"
import { signIn, signUp } from "../controllers/authController.js"
import {signInMiddleware, signUpMiddleware} from '../middlewares/authMiddleware.js';

const userRouter = express.Router()

userRouter.post("/signIn", signInMiddleware, signIn)
userRouter.post("/signUp", signUpMiddleware, signUp)

export default userRouter