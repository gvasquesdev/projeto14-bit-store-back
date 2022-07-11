import express from "express"
import authRouter from "./authRouter.js"
import saleRouter from "./saleRouter.js"
import productRouter from "./productRouter.js"

const router = express.Router()

router.use(authRouter)
router.use(saleRouter)
router.use(productRouter)

export default router;