import express from "express"
import authRouter from "./authRouter.js"
import saleRouter from "./saleRouter.js"

const router = express.Router()

router.use(authRouter)
router.use(saleRouter)

export default router